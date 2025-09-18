import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { cache } from "react"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

export const SUPABASE_MISSING_MESSAGE =
  "Supabase is niet geconfigureerd. Stel NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY in om databasefuncties te gebruiken."

const createStubQueryBuilder = () => {
  const builder: any = {
    select: () => Promise.resolve({ data: [], error: { message: SUPABASE_MISSING_MESSAGE } }),
    eq: () => builder,
    order: () => builder,
    limit: () => builder,
    single: () => Promise.resolve({ data: null, error: { message: SUPABASE_MISSING_MESSAGE } }),
    insert: () => builder,
    upsert: () => builder,
  }

  return builder
}

const createStubSupabaseClient = (): SupabaseClient<any> => {
  console.warn(SUPABASE_MISSING_MESSAGE)

  return {
    from: () => createStubQueryBuilder(),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
  } as unknown as SupabaseClient<any>
}

// Create a cached version of the Supabase client for Server Components
export const createClient = cache(() => {
  const cookieStore = cookies()

  if (!isSupabaseConfigured) {
    return createStubSupabaseClient()
  }

  return createServerComponentClient({ cookies: () => cookieStore })
})
