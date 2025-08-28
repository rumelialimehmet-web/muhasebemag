import { type NextRequest, NextResponse } from "next/server"
import { sendWeeklyDealsEmail } from "@/lib/email-service"
import { createClient } from "@/lib/supabase/server"
import { getFlightDeals } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    // Verify this is a scheduled request (you can add authentication here)
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = createClient()

    // Get active newsletter subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from("email_subscriptions")
      .select("email, preferences")
      .eq("subscription_type", "newsletter")
      .eq("is_active", true)

    if (subscribersError) {
      throw new Error(`Failed to fetch subscribers: ${subscribersError.message}`)
    }

    // Get featured deals for the weekly digest
    const deals = await getFlightDeals(undefined, 6)

    if (!deals || deals.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No deals available for weekly digest",
      })
    }

    // Send weekly digest to all subscribers
    const recipients = subscribers.map((sub) => ({ email: sub.email }))
    const result = await sendWeeklyDealsEmail(recipients, deals)

    // Log the campaign
    await supabase.from("email_campaigns").insert({
      name: "Weekly Deals Digest",
      subject: "Deze week: Vliegdeals vanaf €45! ✈️",
      template_type: "weekly_deals",
      content: { deals: deals.map((d) => d.id) },
      sent_count: result.sent || 0,
      sent_at: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      sent: result.sent,
      failed: result.failed,
      total_subscribers: subscribers.length,
    })
  } catch (error) {
    console.error("Weekly digest error:", error)
    return NextResponse.json({ success: false, error: "Failed to send weekly digest" }, { status: 500 })
  }
}
