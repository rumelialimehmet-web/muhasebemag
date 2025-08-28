import { type NextRequest, NextResponse } from "next/server"
import { createCheckoutSession, STRIPE_PRICE_IDS } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { planType, userId } = await request.json()

    if (!planType || !userId) {
      return NextResponse.json({ error: "Plan type and user ID are required" }, { status: 400 })
    }

    const priceId = planType === "yearly" ? STRIPE_PRICE_IDS.premium_yearly : STRIPE_PRICE_IDS.premium_monthly

    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 })
    }

    const supabase = createClient()

    // Get or create user profile
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (profileError && profileError.code !== "PGRST116") {
      console.error("Error fetching user profile:", profileError)
      return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
    }

    // Create checkout session
    const { sessionId, url } = await createCheckoutSession(
      priceId,
      profile?.stripe_customer_id,
      `${process.env.NEXT_PUBLIC_SITE_URL}/premium/success`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/premium`,
    )

    return NextResponse.json({ sessionId, url })
  } catch (error) {
    console.error("Checkout session creation error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
