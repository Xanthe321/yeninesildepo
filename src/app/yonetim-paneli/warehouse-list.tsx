"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Edit, Trash2, PlusCircle, CheckCircle, XCircle } from "lucide-react";
import { deleteWarehouse } from './actions';
import Image from "next/image";

interface WarehouseImage {
  id: string;
  warehouse_id: string;
  image_path: string;
}

interface Warehouse {
  id: string;
  title: string;
  location?: string;
  size?: string;
  price: number;
  is_rented: boolean;
  warehouses_images?: WarehouseImage[];
}

interface WarehouseListProps {
  warehouses: Warehouse[];
}

export default function WarehouseList({ warehouses }: WarehouseListProps) {
  const handleDelete = async (warehouseId: string) => {
    if (confirm('Bu depoyu silmek istediğinizden emin misiniz?')) {
      try {
        await deleteWarehouse(warehouseId);
        window.location.reload();
      } catch (error) {
        alert('Depo silinirken bir hata oluştu');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {warehouses.map(warehouse => (
        <Card key={warehouse.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0 pb-6">
          {warehouse.warehouses_images &&
            <Image
              src={warehouse.warehouses_images[0]?.image_path || '/'}
              alt={warehouse.title}
              width={1200}
              height={800}
              className="w-full h-48 object-cover"
          />
          }
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-bold">{warehouse.title}</CardTitle>
              <div className="flex items-center text-sm">
                {warehouse.is_rented ? (
                  <div className="flex items-center text-red-500">
                    <XCircle className="h-4 w-4 mr-1" />
                    <span>Kirada</span>
                  </div>
                ) : (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Müsait</span>
                  </div>
                )}
              </div>
            </div>
            <p className="flex items-center text-gray-600 mt-2">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              {warehouse.location || 'Konum belirtilmemiş'}
            </p>
            <div className="mt-2 text-sm text-gray-500">
                <p>
                    <strong>Boyut:</strong> {warehouse.size || 'Boyut belirtilmemiş'}
                </p>
                <p className="mt-1">
                    <strong>Fiyat:</strong> ₺{warehouse.price} / Ay
                </p>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex justify-end space-x-2 border-t">
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Edit className="h-4 w-4 mr-1" />
              Düzenle
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(warehouse.id)} className="cursor-pointer">
              <Trash2 className="h-4 w-4 mr-1" />
              Sil
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}