'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import { warehouseSchema, parseFormData, formatZodError } from '@/lib/validations'
import { optimizeImageFull, getOptimizedExtension } from '@/lib/image-optimization'

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

  // First, fetch warehouses
  const { data: warehouses, error: warehousesError } = await supabase
    .from('warehouses')
    .select('*')
    .order('created_at', { ascending: false })

  if (warehousesError) {
    throw new Error('Failed to fetch warehouses')
  }

  if (!warehouses || warehouses.length === 0) {
    return []
  }

  // Then, fetch images for all warehouses
  const warehouseIds = warehouses.map(w => w.id)
  const { data: images, error: imagesError } = await supabase
    .from('warehouses_images')
    .select('warehouse_id, image_path, id')
    .in('warehouse_id', warehouseIds)

  if (imagesError) {
    console.error('Error fetching warehouse images:', imagesError)
    // Return warehouses without images if image fetch fails
    return warehouses
  }

  // Combine warehouses with their images
  const warehousesWithImages = warehouses.map(warehouse => {
    const warehouseImages = images?.filter(img => img.warehouse_id === warehouse.id) || []
    return {
      ...warehouse,
      warehouses_images: warehouseImages
    }
  })

  return warehousesWithImages
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

export async function getWarehouseById(warehouseId: string) {
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

  // Fetch warehouse
  const { data: warehouse, error: warehouseError } = await supabase
    .from('warehouses')
    .select('*')
    .eq('id', warehouseId)
    .single()

  if (warehouseError || !warehouse) {
    return null
  }

  // Fetch images for the warehouse
  const { data: images, error: imagesError } = await supabase
    .from('warehouses_images')
    .select('warehouse_id, image_path, id')
    .eq('warehouse_id', warehouseId)

  if (imagesError) {
    console.error('Error fetching warehouse images:', imagesError)
    // Return warehouse without images if image fetch fails
    return warehouse
  }

  // Combine warehouse with its images
  return {
    ...warehouse,
    warehouses_images: images || []
  }
}

export async function updateWarehouse(formData: FormData): Promise<ActionResult> {
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

    const warehouseId = formData.get('id') as string
    const title = formData.get('title') as string
    const location = formData.get('location') as string
    const size = formData.get('size') as string
    const price = parseFloat(formData.get('price') as string)
    const description = formData.get('description') as string
    const featuresJson = formData.get('features') as string
    const features = featuresJson ? JSON.parse(featuresJson) : null

    // Validate input with Zod
    const validation = warehouseSchema.safeParse({
      title,
      location,
      size,
      price,
      description
    })

    if (!validation.success) {
      return {
        success: false,
        message: 'Girilen bilgilerde hata var',
        validationErrors: validation.error.flatten().fieldErrors as Record<string, string>
      }
    }

    // Update the warehouse
    const {error: updateError } = await supabase
      .from('warehouses')
      .update({
        title,
        location,
        size,
        price,
        description,
        features,
      })
      .eq('id', warehouseId)

    if (updateError) {
      return {
        success: false,
        message: 'Depo güncellenirken bir hata oluştu'
      }
    }

    // Get the list of images that should be kept
    const existingImages = formData.getAll('existingImages') as string[]
    const existingImageIds = existingImages.length > 0
      ? existingImages.map(img => JSON.parse(img).id)
      : []


    // Handle existing images - get all current images for this warehouse
    const { data: currentImages, error: fetchError } = await supabase
      .from('warehouses_images')
      .select('id, image_path')
      .eq('warehouse_id', warehouseId)

    if (fetchError) {
      console.error('Error fetching current images:', fetchError)
    }


    // Delete images that were removed from the warehouses_images table
    if (currentImages && currentImages.length > 0) {
      const imagesToDelete = currentImages.filter(img => !existingImageIds.includes(img.id))

      if (imagesToDelete.length > 0) {
        // First, delete from warehouses_images table
        const deleteIds = imagesToDelete.map(img => img.id)

        const { error: deleteError } = await supabase
          .from('warehouses_images')
          .delete()
          .in('id', deleteIds)

        if (deleteError) {
          console.error('Error deleting from warehouses_images table:', deleteError)
        } else {
        }

        // Then, delete the actual files from storage
        for (const img of imagesToDelete) {
          try {
            // Extract the file path from the public URL
            // URL format: https://...supabase.co/storage/v1/object/public/warehoueses_images/path/to/file.jpg
            let filePath = ''

            if (img.image_path.includes('/warehoueses_images/')) {
              filePath = img.image_path.split('/warehoueses_images/')[1]
            } else if (img.image_path.includes('/warehoueses/')) {
              filePath = img.image_path.split('/warehoueses/')[1]
            }

            if (filePath) {

              const { error: storageError } = await supabase.storage
                .from('warehoueses_images')
                .remove([filePath])

              if (storageError) {
                console.error('Storage deletion error:', storageError)
              } else {
              }
            } else {
              console.error('Could not extract file path from:', img.image_path)
            }
          } catch (error) {
            console.error('Error deleting image from storage:', error)
          }
        }
      }
    }

    // Handle new image uploads
    const imageFiles = formData.getAll('images') as File[]

    if (imageFiles.length > 0) {
      const uploadedUrls: string[] = []

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i]

        // Skip if not a valid image file
        if (!file.type.startsWith('image/')) {
          continue
        }

        try {
          // Convert File to Buffer for optimization
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)

          // Optimize image
          const optimizedBuffer = await optimizeImageFull(buffer)

          // Generate unique filename with optimized extension
          const timestamp = Date.now()
          const random = Math.random().toString(36).substring(2, 15)
          const optimizedName = getOptimizedExtension(file.name, 'webp')
          const fileName = `${warehouseId}_${timestamp}_${random}_${i + 1}_${optimizedName}`
          const filePath = `warehoueses_images/${fileName}`

          // Upload optimized file to Supabase Storage
          const { data, error } = await supabase.storage
            .from('warehoueses_images')
            .upload(filePath, optimizedBuffer, {
              cacheControl: '3600',
              upsert: false,
              contentType: 'image/webp'
            })

          if (error) {
            continue
          }

          // Get public URL for the uploaded image
          const { data: { publicUrl } } = supabase.storage
            .from('warehoueses_images')
            .getPublicUrl(filePath)

          uploadedUrls.push(publicUrl)
        } catch (error) {
          continue
        }
      }

      // Save new image URLs to warehouses_images table
      if (uploadedUrls.length > 0) {
        const imageRecords = uploadedUrls.map((imageUrl, index) => ({
          warehouse_id: warehouseId,
          image_path: imageUrl,
        }))

        const { error: imageInsertError } = await supabase
          .from('warehouses_images')
          .insert(imageRecords)

        if (imageInsertError) {
          return {
            success: false,
            message: 'Depo güncellendi ancak yeni görseller kaydedilemedi'
          }
        }
      }
    }

    revalidatePath('/yonetim-paneli')
    return {
      success: true,
      message: 'Depo başarıyla güncellendi'
    }

  } catch (error) {
    return {
      success: false,
      message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin'
    }
  }
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

    // Extract features from formData
    const featuresJson = formData.get('features') as string
    const features = featuresJson ? JSON.parse(featuresJson) : null

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
        features,
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

        try {
          // Convert File to Buffer for optimization
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)

          // Optimize image
          const optimizedBuffer = await optimizeImageFull(buffer)

          // Generate unique filename with optimized extension
          const timestamp = Date.now()
          const random = Math.random().toString(36).substring(2, 15)
          const optimizedName = getOptimizedExtension(file.name, 'webp')
          const fileName = `${warehouseId}_${timestamp}_${random}_${i + 1}_${optimizedName}`
          const filePath = `warehoueses_images/${fileName}`

          // Upload optimized file to Supabase Storage
          const { data, error } = await supabase.storage
            .from('warehoueses_images')
            .upload(filePath, optimizedBuffer, {
              cacheControl: '3600',
              upsert: false,
              contentType: 'image/webp'
            })

          if (error) {
            continue
          }

          // Get public URL for the uploaded image
          const { data: { publicUrl } } = supabase.storage
            .from('warehoueses_images')
            .getPublicUrl(filePath)

          uploadedUrls.push(publicUrl)
        } catch (error) {
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
          return {
            success: false,
            message: 'Depo eklendi ancak görseller kaydedilemedi'
          }
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
