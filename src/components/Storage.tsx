import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { createClient } from "../../utils/supabase/server";
import { getLatestWarehouses } from "@/lib/warehouse-actions";
import { Package } from "lucide-react";

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
		<section className="relative py-20 sm:py-24 bg-blue-50 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-40 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Package className="w-4 h-4" />
            <span>Popüler Depolarımız</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Depo Çeşitlerimiz
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            İhtiyaçlarınıza uygun depo boyutunu seçin ve hemen kiralama işlemine başlayın.
          </p>
          <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {warehouses.length === 0 ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">Henüz depo bulunamadı.</p>
              </div>
            ) : (
              warehouses.map((warehouse, index) => {
                // Get first image from warehouses_images or fallback to image_url
                const firstImage = warehouse.warehouses_images?.[0]?.image_path || warehouse.image_url || "/"

                return (
              <Card key={warehouse.id} className="group rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 overflow-hidden bg-white pb-6 px-0 py-0 gap-0">
                <CardHeader className="p-0">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      width={800}
                      height={800}
                      src={firstImage}
                      alt={`${warehouse.title} görseli`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-left flex flex-col justify-between h-full">
                  <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900">{warehouse.title}</CardTitle>
                  <p className="mt-3 text-gray-600 line-clamp-2 leading-relaxed">
                    {warehouse.description || 'Depo açıklaması mevcut değil.'}
                  </p>
                  <div className="mt-5 flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">₺{warehouse.price}</p>
                      <p className="text-sm text-gray-500">/ Ay</p>
                    </div>
                    {warehouse.size && (
                      <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-medium">
                        {warehouse.size} m² 
                      </span>
                    )}
                  </div>
                  <Link href={`/depolar/${warehouse.id}`}>
                    <Button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all cursor-pointer">
                      Detaylı İncele
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
