"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Warehouse {
  id: string
  title: string
  location: string
  size: string
  price: number
  image_url?: string
  description?: string
  created_at: string
}

export default function Storage() {
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch warehouses from API
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await fetch('/api/warehouses/latest');
                if (response.ok) {
                    const data = await response.json();
                    setWarehouses(data.warehouses || []);
                }
            } catch (error) {
                console.error('Error fetching warehouses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWarehouses();
    }, []);

    // Fallback data if no warehouses in database
    const defaultWarehouses = [
        {
            id: '1',
            title: 'Küçük Boy Depo',
            description: 'Birkaç koli, valiz veya küçük mobilyalar için idealdir.',
            price: 500,
            image_url: '/',
            size: '5m²'
        },
        {
            id: '2',
            title: 'Orta Boy Depo',
            description: '1+1 veya 2+1 daire eşyaları için uygundur.',
            price: 800,
            image_url: '/',
            size: '10m²'
        },
        {
            id: '3',
            title: 'Büyük Boy Depo',
            description: '3+1 daire eşyası veya ofis malzemeleri için geniş alan.',
            price: 1200,
            image_url: '/',
            size: '20m²'
        }
    ];

    const displayWarehouses = loading ? defaultWarehouses : (warehouses.length > 0 ? warehouses.slice(0, 3) : defaultWarehouses);

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
            {displayWarehouses.map((warehouse, index) => (
              <Card key={warehouse.id} className="rounded-xl shadow-lg transition-transform transform hover:scale-105">
                <CardHeader>
                  <div className="relative h-48 w-full rounded-t-xl overflow-hidden">
                    <Image
                      width={800}
                      height={800}
                      src={warehouse.image_url || "/"}
                      alt={`${warehouse.title} görseli`}
                      className="w-full h-full object-cover"
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
            ))}
          </div>
        </div>
      </section>
    )
}