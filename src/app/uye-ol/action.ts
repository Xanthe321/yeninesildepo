'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../../utils/supabase/server'
import { signupSchema, parseFormData } from '@/lib/validations'

type ActionResult = {
  success: boolean
  message?: string
  redirectTo?: string
  validationErrors?: Record<string, string>
}

export async function signUp(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    // Validate input with Zod
    const validation = parseFormData(formData, signupSchema)

    if (!validation.success) {
      return {
        success: false,
        message: 'Girilen bilgilerde hata var',
        validationErrors: validation.error.flatten().fieldErrors as Record<string, string>
      }
    }

    const { email, password, fullName } = validation.data

    // Attempt sign up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (authError) {
      await supabase.auth.signOut()
      if (authError.message.includes('already registered')) {
        return {
          success: false,
          message: 'Bu e-posta adresi zaten kayıtlı'
        }
      } else if (authError.message.includes('Password should be')) {
        return {
          success: false,
          message: 'Şifre çok zayıf. Lütfen daha güçlü bir şifre seçin'
        }
      } else {
        return {
          success: false,
          message: 'Üye olma işlemi başarısız. Lütfen tekrar deneyin'
        }
      }
    }

    if (!authData.user) {
      return {
        success: false,
        message: 'Üye olma işlemi başarısız. Lütfen tekrar deneyin'
      }
    }

    // Create user role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert([{ user_id: authData.user.id, role: 'user' }])

    // If email confirmation is required
    if (!authData.session) {
      return {
        success: true,
        message: 'Üye olma işlemi başarılı! E-posta adresinizi kontrol ederek hesabınızı doğrulayın'
      }
    }

    // If user is immediately signed in
    revalidatePath('/', 'layout')
    return {
      success: true,
      message: 'Üye olma işlemi başarılı! Hoş geldiniz',
      redirectTo: '/depolar?welcome=true'
    }

  } catch (error) {
    return {
      success: false,
      message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin'
    }
  }
}