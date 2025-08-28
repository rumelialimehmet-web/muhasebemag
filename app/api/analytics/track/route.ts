import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { event, data, sessionId, userId } = await request.json()

    const supabase = createClient()

    // Store analytics event in database
    const { error } = await supabase.from("analytics_events").insert({
      event_name: event,
      event_data: data,
      session_id: sessionId,
      user_id: userId,
      ip_address: request.ip,
      user_agent: request.headers.get("user-agent"),
      referrer: request.headers.get("referer"),
      timestamp: new Date().toISOString(),
    })

    if (error) {
      console.error("Error storing analytics event:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics tracking error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
