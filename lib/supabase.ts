import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Export a placeholder if keys are missing to prevent the app from crashing during build/preview
export const supabase = (supabaseUrl && supabaseUrl.startsWith('http'))
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (null as any);

if (!supabase) {
    if (typeof window !== 'undefined') {
        console.warn('Supabase URL is missing or invalid. Check your .env file.')
    }
}
