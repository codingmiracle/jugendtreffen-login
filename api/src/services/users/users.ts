import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || '' // Öffentlicher Anon Key für normale Abfragen
)

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '' // Service Role Key für Admin-Zugriff
)

export const getUserEmails: () => Promise<
  { uid: string; email: string }[]
> = async () => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers()
    if (error) {
      throw new Error(`Fehler beim Abrufen der Benutzer: ${error.message}`)
    }
    return data.users.map((user) => ({
      uid: user.id,
      email: user.email,
    }))
  } catch (error) {
    throw new Error(`Fehler: ${error.message}`)
  }
}
