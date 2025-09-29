'use server'

import { createClient } from '../../utils/supabase/server'

export interface UserData {
  id: string
  email: string
  role?: string
}

export async function getCurrentUser(): Promise<UserData | null> {
  try {
    const supabase = await createClient()

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return null
    }

    // Get user role
    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    return {
      id: user.id,
      email: user.email || '',
      role: userRole?.role || 'user'
    }
  } catch (error) {
    return null
  }
}

export async function signOut() {
  'use server'

  const { revalidatePath } = await import('next/cache')
  const { redirect } = await import('next/navigation')

  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/')
}