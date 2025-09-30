"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from "lucide-react";
import { useState } from "react";

interface UserData {
  id: string;
  email: string;
  role?: string;
}

interface ProfileFormProps {
  user: UserData | null;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.email?.split('@')[0] || 'Kullanıcı',
    email: user?.email || '',
    phone: '',
    address: '',
    bio: '',
    joinDate: new Date().toLocaleDateString('tr-TR')
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset data if needed
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Kullanıcı bilgileri bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg sm:text-xl truncate">{profileData.fullName}</CardTitle>
                <CardDescription className="flex items-center space-x-1">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Aktif Üye</span>
                </CardDescription>
              </div>
            </div>
            <div className="flex justify-end sm:justify-start">
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
                className={`${isEditing ? "cursor-pointer" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"} w-full sm:w-auto`}
                size="sm"
              >
                {isEditing ? (
                  <>
                    <X className="mr-1 sm:mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">İptal</span>
                    <span className="sm:hidden">İptal</span>
                  </>
                ) : (
                  <>
                    <Edit className="mr-1 sm:mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Düzenle</span>
                    <span className="sm:hidden">Düzenle</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Kişisel Bilgiler</CardTitle>
          <CardDescription>
            Temel hesap bilgilerinizi görüntüleyin ve düzenleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Full Name */}
          <div className="grid gap-3">
            <Label htmlFor="fullName" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Ad Soyad</span>
            </Label>
            {isEditing ? (
              <Input
                id="fullName"
                value={profileData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Adınızı ve soyadınızı girin"
              />
            ) : (
              <p className="py-2 px-3 bg-gray-50 rounded-md">{profileData.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-3">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>E-posta</span>
            </Label>
            <p className="py-2 px-3 bg-gray-50 rounded-md text-gray-600">
              {profileData.email}
              <span className="text-xs ml-2">(değiştirilemez)</span>
            </p>
          </div>

          {/* Phone */}
          <div className="grid gap-3">
            <Label htmlFor="phone" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Telefon</span>
            </Label>
            {isEditing ? (
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Telefon numaranızı girin"
                type="tel"
              />
            ) : (
              <p className="py-2 px-3 bg-gray-50 rounded-md">
                {profileData.phone || 'Telefon numarası belirtilmemiş'}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="grid gap-3">
            <Label htmlFor="address" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Adres</span>
            </Label>
            {isEditing ? (
              <Textarea
                id="address"
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Adresinizi girin"
                rows={3}
              />
            ) : (
              <p className="py-2 px-3 bg-gray-50 rounded-md">
                {profileData.address || 'Adres belirtilmemiş'}
              </p>
            )}
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
                className="cursor-pointer w-full sm:w-auto order-2 sm:order-1"
              >
                İptal
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full sm:w-auto order-1 sm:order-2"
              >
                {isSaving ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
                    <span className="hidden sm:inline">Kaydediliyor...</span>
                    <span className="sm:hidden">Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Kaydet
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}