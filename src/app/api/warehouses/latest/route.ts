import { NextResponse } from 'next/server'
import { getLatestWarehouses } from '@/lib/warehouse-actions'

export async function GET() {
  try {
    const warehouses = await getLatestWarehouses()

    return NextResponse.json({
      success: true,
      warehouses
    })
  } catch (error) {
    console.error('Error fetching latest warehouses:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch warehouses',
        warehouses: []
      },
      { status: 500 }
    )
  }
}