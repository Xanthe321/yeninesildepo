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

    // Insert the new warehouse first to get the ID
    const { data: warehouseData, error: insertError } = await supabase
      .from('warehouses')
      .insert([{
        title,
        location,
        size,
        price,
        description,
      }])
      .select('id')
      .single()

    if (insertError || !warehouseData) {
      return {
        success: false,
        message: 'Depo eklenirken bir hata oluştu'
      }
    }

    const warehouseId = warehouseData.id

    // Upload images to Supabase Storage if any
    if (imageFiles.length > 0) {
      const uploadedUrls: string[] = []

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i]

        // Skip if not a valid image file
        if (!file.type.startsWith('image/')) {
          continue
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${warehouseId}_${Date.now()}_${i + 1}.${fileExt}`
        const filePath = `warehoueses/${fileName}`

        try {
          // Upload file to Supabase Storage
          const { data, error } = await supabase.storage
            .from('warehoueses_images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            })

            console.log(data)

          if (error) {
            console.error('Error uploading image:', error)
            continue
          }

          // Get public URL for the uploaded image
          const { data: { publicUrl } } = supabase.storage
            .from('warehouses_images')
            .getPublicUrl(filePath)

          uploadedUrls.push(publicUrl)
        } catch (error) {
          console.error('Error uploading image:', error)
          continue
        }
      }

      // Save image URLs to warehouses_images table
      if (uploadedUrls.length > 0) {
        const imageRecords = uploadedUrls.map((imageUrl, index) => ({
          warehouse_id: warehouseId,
          image_path: imageUrl,
        }))

        const { error: imageInsertError } = await supabase
          .from('warehouses_images')
          .insert(imageRecords)

        if (imageInsertError) {
          console.error('Error inserting image records:', imageInsertError)
          // Continue without failing the whole operation
        }
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
