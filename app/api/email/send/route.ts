import { type NextRequest, NextResponse } from "next/server"
import { sendWelcomeEmail, sendPriceAlert, sendAbandonedBookingEmail } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const { type, recipient, data } = await request.json()

    let result

    switch (type) {
      case "welcome":
        result = await sendWelcomeEmail(recipient)
        break

      case "price_alert":
        result = await sendPriceAlert(recipient, data.destination, data.price, data.originalPrice)
        break

      case "abandoned_booking":
        result = await sendAbandonedBookingEmail(recipient, data.destination, data.price)
        break

      default:
        return NextResponse.json({ success: false, error: "Invalid email type" }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
