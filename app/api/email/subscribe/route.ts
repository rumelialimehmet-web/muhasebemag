import { type NextRequest, NextResponse } from "next/server"
import { subscribeToNewsletter } from "@/lib/database"
import { sendWelcomeEmail } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const { email, preferences = {} } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Valid email address is required" }, { status: 400 })
    }

    // Subscribe to newsletter
    const subscriptionResult = await subscribeToNewsletter(email, preferences)

    if (!subscriptionResult.success) {
      return NextResponse.json(subscriptionResult, { status: 400 })
    }

    // Send welcome email
    const emailResult = await sendWelcomeEmail({ email })

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      emailSent: emailResult.success,
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
