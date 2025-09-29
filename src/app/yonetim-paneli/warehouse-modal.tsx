"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Upload, X, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { warehouseSchema, type WarehouseInput } from "@/lib/validations";
import { addWarehouse } from './actions';
import Image from "next/image";

export default function WarehouseModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
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
  });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const newImages = [...selectedImages, ...files];
    setSelectedImages(newImages);

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index]);

    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setSelectedImages([]);
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    setImagePreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setServerError(null);
    setServerSuccess(null);
    reset();
  };

  const onSubmit = async (data: WarehouseInput) => {
    setIsLoading(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('location', data.location);
      formData.append('size', data.size);
      formData.append('price', data.price.toString());
      if (data.description) {
        formData.append('description', data.description);
      }

      // Add images to form data
      selectedImages.forEach((image) => {
        formData.append(`images`, image);
      });

      const result = await addWarehouse(formData);

      if (result.success) {
        setServerSuccess(result.message || 'Depo başarıyla eklendi');
        setTimeout(() => {
          setOpen(false);
          resetForm();
        }, 1500);
      } else {
        setServerError(result.message || 'Depo eklenirken bir hata oluştu');
      }
    } catch (error) {
      setServerError('Beklenmeyen bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) {
        resetForm();
      }
    }}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
          <PlusCircle className="mr-2 h-4 w-4" />
          Yeni Depo Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Yeni Depo Ekle</DialogTitle>
            <DialogDescription>
              Sisteme yeni bir depo eklemek için aşağıdaki bilgileri doldurun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Server Messages */}
            {serverError && (
              <div className="col-span-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {serverError}
              </div>
            )}
            {serverSuccess && (
              <div className="col-span-4 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                {serverSuccess}
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Depo Adı *
              </Label>
              <Input
                id="title"
                placeholder="Örn: İstanbul Merkez Depo"
                {...register("title")}
                className={`col-span-3 ${errors.title ? "border-red-500" : ""}`}
              />
              {errors.title && (
                <p className="col-start-2 col-span-3 text-sm text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Konum *
              </Label>
              <Input
                id="location"
                placeholder="Örn: Kadıköy, İstanbul"
                {...register("location")}
                className={`col-span-3 ${errors.location ? "border-red-500" : ""}`}
              />
              {errors.location && (
                <p className="col-start-2 col-span-3 text-sm text-red-500 mt-1">{errors.location.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Boyut *
              </Label>
              <Input
                id="size"
                placeholder="Örn: 100m² / 1000m³"
                {...register("size")}
                className={`col-span-3 ${errors.size ? "border-red-500" : ""}`}
              />
              {errors.size && (
                <p className="col-start-2 col-span-3 text-sm text-red-500 mt-1">{errors.size.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Aylık Fiyat *
              </Label>
              <div className="col-span-3 relative">
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
                <p className="col-start-2 col-span-3 text-sm text-red-500 mt-1">{errors.price.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Açıklama
              </Label>
              <Textarea
                id="description"
                placeholder="Depo hakkında ek bilgiler (isteğe bağlı)"
                {...register("description")}
                className={`col-span-3 ${errors.description ? "border-red-500" : ""}`}
                rows={3}
              />
              {errors.description && (
                <p className="col-start-2 col-span-3 text-sm text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Image Upload Section */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                Depo Görselleri
              </Label>
              <div className="col-span-3 space-y-4">
                {/* Upload Button */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Depo görsellerini yüklemek için tıklayın
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

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
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
                            onClick={() => removeImage(index)}
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

                    {/* Add More Images Button */}
                    <div
                      className="aspect-video rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Daha Ekle</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="cursor-pointer"
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              {isLoading ? "Ekleniyor..." : "Depo Ekle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}