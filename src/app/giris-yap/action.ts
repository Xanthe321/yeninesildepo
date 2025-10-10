'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../../utils/supabase/server'
import { loginSchema, parseFormData } from '@/lib/validations'

type ActionResult = {
  success: boolean
  message?: string
  redirectTo?: string
  validationErrors?: Record<string, string>
}

export async function login(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    // Validate input with Zod
    const validation = parseFormData(formData, loginSchema)

    if (!validation.success) {
      return {
        success: false,
        message: 'Girilen bilgilerde hata var',
        validationErrors: validation.error.flatten().fieldErrors as Record<string, string>
      }
    }

    const { email, password } = validation.data

    // Attempt login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      // Handle specific auth errors
      if (authError.message.includes('Invalid login credentials')) {
        return {
          success: false,
          message: 'E-posta veya şifre hatalı'
        }
      } else if (authError.message.includes('Email not confirmed')) {
        return {
          success: false,
          message: 'E-posta adresinizi doğrulamanız gerekiyor'
        }
      } else if (authError.message.includes('Too many requests')) {
        return {
          success: false,
          message: 'Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyin'
        }
      } else {
        return {
          success: false,
          message: 'Giriş yapılamadı. Lütfen tekrar deneyin'
        }
      }
    }

    if (!authData.user) {
      return {
        success: false,
        message: 'Giriş yapılamadı. Lütfen tekrar deneyin'
      }
    }

    const { data: userRole, error: userRolesError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', authData.user.id)
      .single()

    if (userRole && userRole.role === 'admin') {

      await supabase.auth.signOut()

      return {
        success: false,
        message: 'Giriş yapılamadı. Lütfen admın girişi sayfasını kullanın'
      }
    }


    // Revalidate the layout to update auth state
    revalidatePath('/', 'layout')

    // Return success with redirect URL based on role
    return {
      success: true,
      message: 'Giriş başarılı',
      redirectTo: '/depolar'
    }

  } catch (error) {
    return {
      success: false,
      message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin'
    }
  }
}
