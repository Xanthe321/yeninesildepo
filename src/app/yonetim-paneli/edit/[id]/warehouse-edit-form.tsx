"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Image as ImageIcon, Save, ArrowLeft, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { warehouseSchema, type WarehouseInput } from "@/lib/validations";
import { updateWarehouse } from '../../actions';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { compressImages } from "@/lib/client-image-compression";

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
  description?: string;
  is_rented: boolean;
  warehouses_images?: WarehouseImage[];
}

interface WarehouseEditFormProps {
  warehouse: Warehouse;
}

export default function WarehouseEditForm({ warehouse }: WarehouseEditFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<WarehouseImage[]>(warehouse.warehouses_images || []);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WarehouseInput>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      title: warehouse.title,
      location: warehouse.location || '',
      size: warehouse.size || '',
      price: warehouse.price,
      description: warehouse.description || '',
    }
  });

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsCompressing(true);

    try {
      // Compress images on client-side before adding to state
      const compressedFiles = await compressImages(files, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
      });

      const newImages = [...selectedImages, ...compressedFiles];
      setSelectedImages(newImages);

      // Create preview URLs
      const newPreviews = compressedFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    } catch (error) {
      console.error('Image compression error:', error);
      // Fallback: use original files if compression fails
      const newImages = [...selectedImages, ...files];
      setSelectedImages(newImages);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    } finally {
      setIsCompressing(false);
    }
  };

  const removeNewImage = (index: number) => {
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index]);

    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageId: string) => {
    setExistingImages(prev => prev.filter(img => img.id !== imageId));
  };

  const onSubmit = async (data: WarehouseInput) => {
    setIsLoading(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const formData = new FormData();
      formData.append('id', warehouse.id);
      formData.append('title', data.title);
      formData.append('location', data.location);
      formData.append('size', data.size);
      formData.append('price', data.price.toString());
      if (data.description) {
        formData.append('description', data.description);
      }

      // Add existing images that weren't removed
      existingImages.forEach((image) => {
        formData.append('existingImages', JSON.stringify(image));
      });

      // Add new images
      selectedImages.forEach((image) => {
        formData.append(`images`, image);
      });

      const result = await updateWarehouse(formData);

      if (result.success) {
        setServerSuccess(result.message || 'Depo başarıyla güncellendi');
        setTimeout(() => {
          router.push('/yonetim-paneli');
        }, 1500);
      } else {
        setServerError(result.message || 'Depo güncellenirken bir hata oluştu');
      }
    } catch (error) {
      setServerError('Beklenmeyen bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup preview URLs on component unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Depo Bilgileri</CardTitle>
          <Link href="/yonetim-paneli">
            <Button variant="outline" size="sm" className="cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri Dön
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Server Messages */}
          {serverError && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {serverError}
            </div>
          )}
          {serverSuccess && (
            <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              {serverSuccess}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Depo Adı *</Label>
                <Input
                  id="title"
                  placeholder="Örn: İstanbul Merkez Depo"
                  {...register("title")}
                  className={`mt-1 ${errors.title ? "border-red-500" : ""}`}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Konum *</Label>
                <Input
                  id="location"
                  placeholder="Örn: Kadıköy, İstanbul"
                  {...register("location")}
                  className={`mt-1 ${errors.location ? "border-red-500" : ""}`}
                />
                {errors.location && (
                  <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="size">Boyut *</Label>
                <div className="grid-cols-3 relative">
                  <Input
                    id="size"
                    placeholder="Örn: 100m² / 1000m³"
                    {...register("size")}
                    className={`mt-1 ${errors.size ? "border-red-500" : ""}`}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    m²
                  </span>
                </div>
                {errors.size && (
                  <p className="text-sm text-red-500 mt-1">{errors.size.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="price">Aylık Fiyat *</Label>
                <div className="relative mt-1">
                  <Input
                    id="price"
                    type="number"
                    placeholder="5000"
                    {...register("price", { valueAsNumber: true })}
                    className={`pr-8 ${errors.price ? "border-red-500" : ""}`}
                    min="0"
                    step="100"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ₺
                  </span>
                </div>
                {errors.price && (
                  <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  placeholder="Depo hakkında ek bilgiler (isteğe bağlı)"
                  {...register("description")}
                  className={`mt-1 ${errors.description ? "border-red-500" : ""}`}
                  rows={4}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-4">
              <Label>Depo Görselleri</Label>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Mevcut Görseller</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {existingImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={image.image_path}
                            alt="Existing warehouse image"
                            width={400}
                            height={300}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(image.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Images */}
              <div>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Yeni görseller eklemek için tıklayın
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, JPEG formatları desteklenir
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />

                {/* New Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Yeni Görseller</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {selectedImages[index]?.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link href="/yonetim-paneli">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                className="cursor-pointer"
              >
                İptal
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}