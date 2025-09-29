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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle, User, Mail, Phone, MessageSquare, Building } from "lucide-react";

// Contact form validation schema
const contactSchema = z.object({
  fullName: z
    .string({ message: 'Ad soyad gereklidir' })
    .min(2, { message: 'Ad soyad en az 2 karakter olmalıdır' })
    .max(100, { message: 'Ad soyad en fazla 100 karakter olabilir' }),
  email: z
    .string({ message: 'E-posta adresi gereklidir' })
    .email({ message: 'Geçerli bir e-posta adresi giriniz' }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: 'Telefon numarası en az 10 karakter olmalıdır'
    }),
  company: z
    .string()
    .optional(),
  subject: z
    .string({ message: 'Konu seçimi gereklidir' })
    .min(1, { message: 'Lütfen bir konu seçin' }),
  message: z
    .string({ message: 'Mesaj gereklidir' })
    .min(10, { message: 'Mesaj en az 10 karakter olmalıdır' })
    .max(1000, { message: 'Mesaj en fazla 1000 karakter olabilir' }),
});

type ContactInput = z.infer<typeof contactSchema>;

const subjects = [
  { value: 'depo-kiralama', label: 'Depo Kiralama' },
  { value: 'fiyat-teklifi', label: 'Fiyat Teklifi' },
  { value: 'teknik-destek', label: 'Teknik Destek' },
  { value: 'genel-bilgi', label: 'Genel Bilgi' },
  { value: 'sikayet', label: 'Şikayet' },
  { value: 'oneri', label: 'Öneri' },
  { value: 'diger', label: 'Diğer' },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);

    try {
      // Simulate API call - in production, this would send email
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Contact form data:', data);

      setIsSubmitted(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Mesajınız Gönderildi!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Mesajınızı aldık. En kısa sürede size geri dönüş yapacağız.
              Genellikle 24 saat içinde yanıtlıyoruz.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              Yeni Mesaj Gönder
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">İletişim Formu</CardTitle>
        <CardDescription>
          Aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz.
          Tüm alanları dikkatli bir şekilde doldurun.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Kişisel Bilgiler
            </h3>

            {/* Full Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Ad Soyad *</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Adınızı ve soyadınızı girin"
                  {...register("fullName")}
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>E-posta *</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone and Company Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Telefon</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="05xx xxx xx xx"
                  {...register("phone")}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Şirket</span>
                </Label>
                <Input
                  id="company"
                  placeholder="Şirket adınız (isteğe bağlı)"
                  {...register("company")}
                />
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Mesaj Detayları
            </h3>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Konu *</span>
              </Label>
              <Select onValueChange={(value) => setValue("subject", value)}>
                <SelectTrigger className={errors.subject ? "border-red-500" : ""}>
                  <SelectValue placeholder="Mesajınızın konusunu seçin" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">
                Mesajınız *
              </Label>
              <Textarea
                id="message"
                placeholder="Mesajınızı buraya yazın... (En az 10, en fazla 1000 karakter)"
                rows={6}
                {...register("message")}
                className={errors.message ? "border-red-500" : ""}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
              <p className="text-xs text-gray-500">
                * işaretli alanlar zorunludur
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer px-8"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full"></div>
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Mesajı Gönder
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}