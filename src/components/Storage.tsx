import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { createClient } from "../../utils/supabase/server";
import { getLatestWarehouses } from "@/lib/warehouse-actions";

interface Warehouse {
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

export interface StoragePrompt {
  warehouses?: Warehouse[]
}

export default async function Storage() {

    const warehouses = await getLatestWarehouses()

    return (
			<section className="py-20 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Depo Çeşitlerimiz
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            İhtiyaçlarınıza uygun depo boyutunu seçin ve hemen kiralama işlemine başlayın.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {warehouses.length === 0 ? (
              <div className="col-span-1 md:col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">Henüz depo bulunamadı.</p>
              </div>
            ) : (
              warehouses.map((warehouse, index) => {
                // Get first image from warehouses_images or fallback to image_url
                const firstImage = warehouse.warehouses_images?.[0]?.image_path || warehouse.image_url || "/"

                return (
              <Card key={warehouse.id} className="rounded-xl shadow-lg transition-transform transform hover:scale-105">
                <CardHeader>
                  <div className="relative h-48 w-full rounded-t-xl overflow-hidden">
                    <Image
                      width={800}
                      height={800}
                      src={firstImage}
                      alt={`${warehouse.title} görseli`}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-left">
                  <CardTitle className="text-2xl font-bold">{warehouse.title}</CardTitle>
                  <p className="mt-2 text-gray-600">
                    {warehouse.description || 'Depo açıklaması mevcut değil.'}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-xl font-bold text-blue-600">₺{warehouse.price} / Ay</p>
                    {warehouse.size && (
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {warehouse.size}
                      </span>
                    )}
                  </div>
                  <Link href={`/depolar/${warehouse.id}`}>
                    <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
                      İncele
                    </Button>
                  </Link>
                </CardContent>
              </Card>
                )
              })
            )}
          </div>
        </div>
      </section>
    )
}