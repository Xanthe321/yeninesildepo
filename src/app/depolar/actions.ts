'use server'

import { createClient } from '../../../utils/supabase/server'

export async function getAvailableWarehouses() {
  const supabase = await createClient()

  // First, fetch available warehouses
  const { data: warehouses, error } = await supabase
    .from('warehouses')
    .select('*')
    .eq('is_rented', false)
    .order('created_at', { ascending: false })

  if (error) {
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

export async function getAllWarehouses() {
  const supabase = await createClient()

  // Fetch all warehouses (both available and rented)
  const { data: warehouses, error } = await supabase
    .from('warehouses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error('Failed to fetch warehouses')
  }

  return warehouses
}

export async function getWarehouseById(id: string) {
  const supabase = await createClient()

  // First, fetch the specific warehouse by ID
  const { data: warehouse, error } = await supabase
    .from('warehouses')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error('Failed to fetch warehouse')
  }

  if (!warehouse) {
    return null
  }

  // Then, fetch images for this warehouse
  const { data: images, error: imagesError } = await supabase
    .from('warehouses_images')
    .select('warehouse_id, image_path, id')
    .eq('warehouse_id', id)

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