'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import { warehouseSchema, parseFormData, formatZodError } from '@/lib/validations'

type ActionResult = {
  success: boolean
  message?: string
  validationErrors?: Record<string, string>
}

export async function getWareHouses() {
  const supabase = await createClient()

  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/error')
  }

  // Check if user has admin role
  const { data: userRole, error: userRoleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (userRoleError || !userRole || userRole.role !== 'admin') {
    redirect('/error')
  }

  // Fetch warehouses
  const { data: warehouses, error: warehousesError } = await supabase
    .from('warehouses')
    .select('*')
    .order('created_at', { ascending: false })

  if (warehousesError) {
    throw new Error('Failed to fetch warehouses')
  }

  return warehouses
}

export async function deleteWarehouse(warehouseId: string) {
  const supabase = await createClient()

  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/error')
  }

  // Check if user has admin role
  const { data: userRole, error: userRoleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (userRoleError || !userRole || userRole.role !== 'admin') {
    redirect('/error')
  }

  // Delete the warehouse
  const { error: deleteError } = await supabase
    .from('warehouses')
    .delete()
    .eq('id', warehouseId)

  if (deleteError) {
    throw new Error('Failed to delete warehouse')
  }

  revalidatePath('/yonetim-paneli')
  return { success: true }
}

export async function addWarehouse(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return {
        success: false,
        message: 'Oturum açmanız gerekiyor'
      }
    }

    // Check if user has admin role
    const { data: userRole, error: userRoleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (userRoleError || !userRole || userRole.role !== 'admin') {
      return {
        success: false,
        message: 'Bu işlem için yetkiniz bulunmuyor'
      }
    }

    // Validate input with Zod
    const validation = parseFormData(formData, warehouseSchema)

    if (!validation.success) {
      return {
        success: false,
        message: 'Girilen bilgilerde hata var',
        validationErrors: validation.error.flatten().fieldErrors as Record<string, string>
      }
    }

    const { title, location, size, price, description } = validation.data

    // Extract image files
    const imageFiles = formData.getAll('images') as File[]

    // TODO: In a real implementation, upload images to Supabase Storage
    // For now, we'll store placeholder image URLs
    const imageUrls: string[] = []

    if (imageFiles.length > 0) {
      // Simulate image upload - in production, upload to Supabase Storage
      imageFiles.forEach((file, index) => {
        // Placeholder URL - replace with actual uploaded image URL
        imageUrls.push(`https://placehold.co/600x400/E2E8F0/94A3B8?text=Depo+Görseli+${index + 1}`)
      })
    }

    // Insert the new warehouse
    const { error: insertError } = await supabase
      .from('warehouses')
      .insert([{
        title,
        location,
        size,
        price,
        description,
      }])

    if (insertError) {
      return {
        success: false,
        message: 'Depo eklenirken bir hata oluştu'
      }
    }

    revalidatePath('/yonetim-paneli')
    return {
      success: true,
      message: 'Depo başarıyla eklendi'
    }

  } catch (error) {
    return {
      success: false,
      message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin'
    }
  }
}
