import { type NextRequest, NextResponse } from "next/server"
import { EmailAutomationService } from "@/lib/email-automation"

const emailService = new EmailAutomationService(process.env.EMAIL_API_KEY || "demo-key")

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json()

    switch (action) {
      case "welcome_series":
        await emailService.sendWelcomeSeries(data.subscriber)
        return NextResponse.json({ success: true, message: "Welcome series initiated" })

      case "weekly_digest":
        await emailService.sendWeeklyDigest(data.subscribers, data.deals)
        return NextResponse.json({ success: true, message: "Weekly digest sent" })

      case "price_alert":
        await emailService.sendPriceAlert(data.subscriber, data.alert, data.newPrice, data.deal)
        return NextResponse.json({ success: true, message: "Price alert sent" })

      case "abandoned_booking":
        await emailService.sendAbandonedBookingEmail(data.email, data.deal, new Date(data.abandonedAt))
        return NextResponse.json({ success: true, message: "Abandoned booking email sent" })

      default:
        return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Email automation error:", error)
    return NextResponse.json({ success: false, message: "Email automation failed" }, { status: 500 })
  }
}
