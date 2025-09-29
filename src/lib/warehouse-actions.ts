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
}

export async function getLatestWarehouses(): Promise<Warehouse[]> {
  try {
    const supabase = await createClient()

    const { data: warehouses, error } = await supabase
      .from('warehouses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) {
      console.error('Error fetching warehouses:', error)
      return []
    }

    return warehouses || []
  } catch (error) {
    console.error('Error in getLatestWarehouses:', error)
    return []
  }
}