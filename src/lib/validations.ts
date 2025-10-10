import { z } from 'zod'

// Common validation patterns
const emailSchema = z
  .string({ message: 'E-posta adresi gereklidir' })
  .email({ message: 'Geçerli bir e-posta adresi giriniz' })
  .min(1, { message: 'E-posta adresi boş olamaz' })
  .max(255, { message: 'E-posta adresi çok uzun' })

const passwordSchema = z
  .string({ message: 'Şifre gereklidir' })
  .min(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  .max(128, { message: 'Şifre en fazla 128 karakter olabilir' })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Şifre en az bir küçük harf, bir büyük harf ve bir rakam içermelidir'
  })

const nameSchema = z
  .string({ message: 'Ad soyad gereklidir' })
  .min(2, { message: 'Ad soyad en az 2 karakter olmalıdır' })
  .max(100, { message: 'Ad soyad en fazla 100 karakter olabilir' })
  .regex(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/, {
    message: 'Ad soyad sadece harf ve boşluk karakterleri içerebilir'
  })

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string({ message: 'Şifre gereklidir' })
    .min(1, { message: 'Şifre boş olamaz' })
})

// Signup schema
export const signupSchema = z
  .object({
    fullName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string({ message: 'Şifre tekrarı gereklidir' })
      .min(1, { message: 'Şifre tekrarı boş olamaz' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword']
  })

// Warehouse schema
export const warehouseSchema = z.object({
  title: z
    .string({ message: 'Depo adı gereklidir' })
    .min(2, { message: 'Depo adı en az 2 karakter olmalıdır' })
    .max(100, { message: 'Depo adı en fazla 100 karakter olabilir' }),
  location: z
    .string({ message: 'Konum gereklidir' })
    .min(5, { message: 'Konum en az 5 karakter olmalıdır' })
    .max(255, { message: 'Konum en fazla 255 karakter olabilir' }),
  size: z
    .string({ message: 'Boyut gereklidir' })
    .min(1, { message: 'Boyut boş olamaz' })
    .max(50, { message: 'Boyut en fazla 50 karakter olabilir' }),
  price: z
    .number({ message: 'Fiyat gereklidir' })
    .positive({ message: 'Fiyat pozitif bir sayı olmalıdır' })
    .max(1000000, { message: 'Fiyat çok yüksek' }),
  description: z
    .string()
    .max(500, { message: 'Açıklama en fazla 500 karakter olabilir' })
    .optional(),
  features: z
    .string()
    .optional()
})

// Form data helper
export function parseFormData<T>(
  formData: FormData,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: z.ZodError } {
  try {
    const data: Record<string, FormDataEntryValue | number> = Object.fromEntries(formData.entries())

    // Convert price to number if it exists
    if ('price' in data && typeof data.price === 'string') {
      data.price = parseFloat(data.price)
    }

    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error }
    }
    throw error
  }
}

// Error formatting helper
export function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => issue.message)
    .join(', ')
}

// Types
export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type WarehouseInput = z.infer<typeof warehouseSchema>