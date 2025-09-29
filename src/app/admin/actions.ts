'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'

export async function adminLogin(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('adminEmail') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  const { data: userRole, error: userRolesError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', authData.user.id)
    .single()

  if (userRolesError || !userRole || !userRole.role || userRole.role !== 'admin') {
    await supabase.auth.signOut()
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/yonetim-paneli')
}
