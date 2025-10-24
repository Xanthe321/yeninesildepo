import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Package, Clock, FileText, ArrowRight } from "lucide-react";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";

// Fake data for now
const fakeRentedWarehouses = [
  {
    id: "1",
    warehouse: {
      id: "w1",
      title: "İstanbul Merkez Depo A",
      location: "Kadıköy, İstanbul",
      size: "150m²",
      price: 8500,
      image: "/placeholder-warehouse.jpg"
    },
    rentalStartDate: "2024-01-15",
    rentalEndDate: "2024-07-15",
    monthlyPrice: 8500,
    status: "active", // active, ending_soon, expired
    contractNumber: "KNT-2024-001",
    daysRemaining: 45
  },
  {
    id: "2",
    warehouse: {
      id: "w2",
      title: "Ankara Lojistik Depo B",
      location: "Çankaya, Ankara",
      size: "250m²",
      price: 12000,
      image: "/placeholder-warehouse.jpg"
    },
    rentalStartDate: "2023-12-01",
    rentalEndDate: "2024-12-01",
    monthlyPrice: 12000,
    status: "active",
    contractNumber: "KNT-2023-042",
    daysRemaining: 180
  },
  {
    id: "3",
    warehouse: {
      id: "w3",
      title: "İzmir Küçük Depo C",
      location: "Konak, İzmir",
      size: "80m²",
      price: 5500,
      image: "/placeholder-warehouse.jpg"
    },
    rentalStartDate: "2024-02-10",
    rentalEndDate: "2024-05-10",
    monthlyPrice: 5500,
    status: "ending_soon",
    contractNumber: "KNT-2024-023",
    daysRemaining: 12
  }
];

export default async function MyWarehousesPage() {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();

  console.log(user)

  if (!user) {
    redirect('/giris-yap');
  }

  const rentals = fakeRentedWarehouses;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Package className="w-4 h-4" />
            <span>Kiraladığım Depolar</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Depolarım
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Kiraladığınız depoları buradan görüntüleyebilir ve yönetebilirsiniz.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Toplam Depo</p>
                  <p className="text-3xl font-bold text-gray-900">{rentals.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Aktif Kiralar</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {rentals.filter(r => r.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Aylık Toplam</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {rentals.reduce((sum, r) => sum + r.monthlyPrice, 0).toLocaleString('tr-TR')}₺
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Warehouse List */}
        <div className="space-y-6">
          {rentals.length === 0 ? (
            <Card>
              <CardContent className="text-center py-16">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Henüz kiralanan depo yok
                </h3>
                <p className="text-gray-500 mb-6">
                  Depolarımıza göz atın ve size uygun olanı kiralayın
                </p>
                <Link href="/depolar">
                  <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                    Depoları İncele
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            rentals.map((rental) => (
              <Card key={rental.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="grid md:grid-cols-12 gap-0">
                  {/* Image Section */}
                  <div className="md:col-span-4 relative h-64 md:h-auto bg-gray-200">
                    <Image
                      src={rental.warehouse.image}
                      alt={rental.warehouse.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      {rental.status === 'active' && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          Aktif
                        </Badge>
                      )}
                      {rental.status === 'ending_soon' && (
                        <Badge className="bg-orange-500 hover:bg-orange-600">
                          Bitiş Yaklaşıyor
                        </Badge>
                      )}
                      {rental.status === 'expired' && (
                        <Badge className="bg-red-500 hover:bg-red-600">
                          Süresi Dolmuş
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:col-span-8 p-6">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {rental.warehouse.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{rental.warehouse.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            <span>{rental.warehouse.size}</span>
                          </div>
                        </div>
                      </div>

                      {/* Rental Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Sözleşme No</p>
                          <p className="font-semibold text-gray-900">{rental.contractNumber}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Aylık Kira</p>
                          <p className="font-semibold text-gray-900">
                            {rental.monthlyPrice.toLocaleString('tr-TR')}₺
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Başlangıç</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(rental.rentalStartDate).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Bitiş</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(rental.rentalEndDate).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      </div>

                      {/* Warning for ending soon */}
                      {rental.status === 'ending_soon' && (
                        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <p className="text-sm text-orange-800">
                            ⚠️ Kiralama süreniz <strong>{rental.daysRemaining} gün</strong> sonra sona erecek
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-auto flex flex-wrap gap-3">
                        <Link href={`/depolar/${rental.warehouse.id}`}>
                          <Button variant="outline" className="cursor-pointer">
                            Depo Detayları
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                          <FileText className="w-4 h-4 mr-2" />
                          Sözleşme
                        </Button>
                        {rental.status === 'ending_soon' && (
                          <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 cursor-pointer">
                            <Calendar className="w-4 h-4 mr-2" />
                            Yenile
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
