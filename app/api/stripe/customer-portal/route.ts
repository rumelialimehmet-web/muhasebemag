import { type NextRequest, NextResponse } from "next/server"
import { createCustomerPortalSession } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const supabase = createClient()

    // Get user profile with Stripe customer ID
    const { data: profile, error } = await supabase
      .from("user_profiles")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single()

    if (error || !profile?.stripe_customer_id) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 404 })
    }

    // Create customer portal session
    const { url } = await createCustomerPortalSession(profile.stripe_customer_id)

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Customer portal session creation error:", error)
    return NextResponse.json({ error: "Failed to create customer portal session" }, { status: 500 })
  }
}
