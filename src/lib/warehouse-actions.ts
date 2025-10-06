'use server'

import { createClient } from '../../utils/supabase/server'

export interface Warehouse {
  id: string
  title: string
  location: string
  size: string
  price: number
  image_url?: string
  description?: string
  created_at: string
  warehouses_images?: Array<{
    id: string
    warehouse_id: string
    image_path: string
  }>
}

export async function getLatestWarehouses(): Promise<Warehouse[]> {
  try {
    const supabase = await createClient()

    // First, fetch warehouses
    const { data: warehouses, error } = await supabase
      .from('warehouses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) {
      console.error('Error fetching warehouses:', error)
      return []
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
  } catch (error) {
    console.error('Error in getLatestWarehouses:', error)
    return []
  }
}