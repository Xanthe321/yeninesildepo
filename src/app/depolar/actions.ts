'use server'

import { createClient } from '../../../utils/supabase/server'

export async function getAvailableWarehouses() {
  const supabase = await createClient()

  // Fetch only available (not rented) warehouses
  const { data: warehouses, error } = await supabase
    .from('warehouses')
    .select('*')
    .eq('is_rented', false)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error('Failed to fetch warehouses')
  }

  return warehouses
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

  // Fetch a specific warehouse by ID
  const { data: warehouse, error } = await supabase
    .from('warehouses')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error('Failed to fetch warehouse')
  }

  return warehouse
}