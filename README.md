# Yeni Nesil Depo

Modern işletmeler için depo kiralama ve yönetimini dijitalleştirmek amacıyla geliştirilmiş full-stack bir web uygulamasıdır.

Yeni Nesil Depo; kullanıcıların mevcut depoları inceleyebilmesini, depo detaylarını görüntüleyebilmesini ve iletişim kurabilmesini sağlarken, yöneticilerin depo içeriklerini ve sistemdeki kayıtları merkezi bir yönetim paneli üzerinden yönetmesine olanak tanır.

Proje, **Next.js 15 App Router**, **React 19**, **TypeScript** ve **Supabase** kullanılarak geliştirilmiş; authentication, server-side işlemler, dosya/görsel yönetimi ve yönetim paneli gibi gerçek dünya uygulamalarında ihtiyaç duyulan temel özellikleri bir araya getirmektedir.

## ✨ Özellikler

* 🏢 Depoları listeleme ve detaylarını görüntüleme
* 🔎 Depo içeriklerini ve özelliklerini inceleme
* 👤 Kullanıcı kayıt ve giriş sistemi
* 🔐 Supabase tabanlı authentication
* 🛡️ Yetkili kullanıcılar için yönetim paneli
* ⚙️ Depo ekleme, düzenleme ve yönetimi
* 🖼️ Depo görsellerinin yüklenmesi ve yönetilmesi
* 📦 Depo bilgilerinin dinamik olarak yönetilmesi
* 📱 Responsive kullanıcı arayüzü
* ✉️ İletişim formu
* ✅ Form validation
* 🗜️ Client-side image compression
* ⚡ Image optimization
* 🔄 Server-side data işlemleri
* 🎨 Reusable UI component yapısı

## 🧰 Teknolojiler

| Teknoloji                     | Kullanım Alanı                                 |
| ----------------------------- | ---------------------------------------------- |
| **Next.js 15**                | Full-stack React framework                     |
| **React 19**                  | UI geliştirme                                  |
| **TypeScript**                | Type-safe development                          |
| **Supabase**                  | Authentication, database ve backend servisleri |
| **@supabase/ssr**             | Server-side authentication ve session yönetimi |
| **Tailwind CSS**              | Styling                                        |
| **React Hook Form**           | Form yönetimi                                  |
| **Zod**                       | Schema ve form validation                      |
| **Radix UI**                  | Accessible UI primitives                       |
| **Lucide React**              | Icon sistemi                                   |
| **Sharp**                     | Image processing                               |
| **browser-image-compression** | Client-side image compression                  |
| **Nodemailer**                | E-mail işlemleri                               |

## 🏗️ Proje Yapısı

Uygulama Next.js App Router mimarisi üzerine kurulmuştur.

```text
src/
├── app/
│   ├── admin/
│   ├── depolar/
│   ├── depolarim/
│   ├── giris-yap/
│   ├── iletisim/
│   ├── profil/
│   ├── uye-ol/
│   └── yonetim-paneli/
│
├── components/
│   ├── forms/
│   ├── ui/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Services.tsx
│   └── ...
│
└── lib/
    ├── auth.ts
    ├── validations.ts
    ├── image-optimization.ts
    ├── client-image-compression.ts
    └── warehouse-actions.ts

utils/
└── supabase/
    ├── client.ts
    ├── server.ts
    └── middleware.ts
```

Bu yapı; UI bileşenleri, business logic, authentication ve route'ların birbirinden ayrılmasını sağlayarak uygulamanın daha sürdürülebilir bir yapıda geliştirilmesine olanak tanır.

## 🔐 Authentication

Kullanıcı authentication sistemi Supabase Auth üzerine kurulmuştur.

Uygulamada client ve server tarafındaki Supabase kullanımı birbirinden ayrılmıştır. `@supabase/ssr` kullanılarak server-side authentication ve session yönetimi desteklenmektedir.

Authentication yapısı içerisinde:

* Kullanıcı kayıt olma
* Kullanıcı giriş yapma
* Oturum kontrolü
* Profil işlemleri
* Server-side authentication
* Middleware üzerinden session yönetimi

gibi işlemler ele alınmaktadır.

## 👨‍💼 Yönetim Paneli

Uygulamada yöneticilerin depo kayıtlarını merkezi olarak yönetebilmesi için ayrı bir yönetim paneli bulunmaktadır.

Yönetim paneli üzerinden:

* Yeni depo oluşturma
* Mevcut depoları görüntüleme
* Depo bilgilerini düzenleme
* Depo kayıtlarını yönetme
* Depo görsellerini yönetme

gibi işlemler gerçekleştirilebilir.

Yönetim panelinin ayrı route ve component yapılarıyla organize edilmesi, kullanıcı tarafındaki uygulama ile yönetim tarafının birbirinden ayrılmasını sağlar.

## 🖼️ Görsel Yönetimi

Depo platformlarında görseller önemli olduğu için projede görsel yükleme ve optimizasyon süreçlerine özel olarak yer verilmiştir.

Client tarafında `browser-image-compression`, server tarafında ise `Sharp` kullanılarak görsellerin uygulamaya aktarılmadan önce optimize edilmesi ve uygun boyutlarda işlenmesi hedeflenmiştir.

Bu yaklaşım, özellikle yüksek çözünürlüklü depo görsellerinin kullanıldığı senaryolarda gereksiz dosya boyutlarının azaltılmasına yardımcı olur.

## 🧠 Validation & Data Handling

Form işlemlerinde **React Hook Form** ve **Zod** birlikte kullanılarak kullanıcı girdilerinin kontrollü şekilde işlenmesi sağlanmıştır.

Business logic'in önemli bir bölümü `lib` altında ayrıştırılmıştır. Özellikle warehouse işlemlerinin `warehouse-actions.ts` içerisinde tutulması, UI ile veri işlemlerinin birbirinden ayrılmasını sağlar.

## 📱 Responsive Design

Uygulama farklı ekran boyutlarında kullanılabilecek responsive bir kullanıcı arayüzü düşünülerek geliştirilmiştir.

Header, mobile menu, hero section, depo listeleri, formlar ve yönetim paneli gibi farklı UI parçaları reusable component yaklaşımıyla organize edilmiştir.

## 🚀 Kurulum

Projeyi local ortamınızda çalıştırmak için:

```bash
git clone https://github.com/Xanthe321/yeninesildepo.git

cd yeninesildepo

npm install
```

Environment değişkenlerini `.env.local` dosyasına ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Ardından development server'ı başlatın:

```bash
npm run dev
```

Uygulama:

```text
http://localhost:3000
```

adresinde çalışacaktır.

## 📦 Production Build

Production build oluşturmak için:

```bash
npm run build
```

Uygulamayı production modunda çalıştırmak için:

```bash
npm start
```

Lint kontrolü için:

```bash
npm run lint
```

## 🌐 Live Demo

**https://yeninesildepo.vercel.app/**

## 🎯 Projenin Amacı

Bu proje yalnızca bir arayüz çalışması olarak değil; authentication, server-side işlemler, veri yönetimi, görsel optimizasyonu ve yönetim paneli gibi gerçek bir web uygulamasında karşılaşılabilecek ihtiyaçları bir arada ele alan full-stack bir uygulama olarak geliştirilmiştir.

Özellikle **Next.js App Router, Supabase SSR authentication, server-side işlemler, form validation ve yönetim paneli mimarisi** üzerine pratik deneyim kazanmak amacıyla geliştirilmiştir.

