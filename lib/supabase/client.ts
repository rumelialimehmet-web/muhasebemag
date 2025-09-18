import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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

const createStubSupabaseClient = () => {
  console.warn(SUPABASE_MISSING_MESSAGE)

  return {
    from: () => createStubQueryBuilder(),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
        error: null,
      }),
      signOut: () => Promise.resolve({ error: null }),
    },
  } as ReturnType<typeof createClientComponentClient>
}

// Create a singleton instance of the Supabase client for Client Components when configured, otherwise fall back to a stub
export const supabase = isSupabaseConfigured
  ? createClientComponentClient()
  : createStubSupabaseClient()
