import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import { sendWelcomeEmail } from "@/lib/email-service"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: any

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const supabase = createClient()

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const customerId = session.customer
        const subscriptionId = session.subscription

        // Get customer details
        const customer = await stripe.customers.retrieve(customerId)
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)

        if (customer.deleted) {
          console.error("Customer was deleted")
          break
        }

        // Update or create user profile
        const { error: upsertError } = await supabase.from("user_profiles").upsert({
          email: customer.email,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          is_premium: true,
          subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (upsertError) {
          console.error("Error updating user profile:", upsertError)
        }

        // Send welcome email for premium subscription
        if (customer.email) {
          await sendWelcomeEmail({ email: customer.email, name: customer.name || undefined })
        }

        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object
        const customerId = subscription.customer

        // Update subscription status
        const { error } = await supabase
          .from("user_profiles")
          .update({
            is_premium: subscription.status === "active",
            subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId)

        if (error) {
          console.error("Error updating subscription:", error)
        }

        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object
        const customerId = subscription.customer

        // Mark subscription as cancelled
        const { error } = await supabase
          .from("user_profiles")
          .update({
            is_premium: false,
            subscription_expires_at: null,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId)

        if (error) {
          console.error("Error cancelling subscription:", error)
        }

        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object
        const customerId = invoice.customer

        // Handle failed payment - could send email notification
        console.log(`Payment failed for customer: ${customerId}`)

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
