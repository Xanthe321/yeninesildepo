import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "../../utils/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yeni Nesil Depolama",
  description: "En uygun fiyatlarla depoları kiralayın",
  icons: {
    icon: '/favicon.ico',
  },
};

interface UserData {
  id: string;
  email: string;
  role?: string;
}

// async function getUser(): Promise<UserData | null> {
//   try {
//     const supabase = await createClient();
//     const { data: { user }, error: authError } = await supabase.auth.getUser()

//     if (authError || !user) return null;

//     // Get user role
//     const { data: userRole } = await supabase
//       .from('user_roles')
//       .select('role')
//       .eq('user_id', user.id)
//       .single()

//     return {
//       id: user.id,
//       email: user.email || '',
//       role: userRole?.role
//     } as UserData;
//   } catch (error) {
//     return null;
//   }
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const user = await getUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Header user={user} /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
