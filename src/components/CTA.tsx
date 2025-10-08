"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Send, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {

const [formData, setFormData] = useState({ name: '', email: '', message: '' });


  return (
    <section className="relative py-20 sm:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Hızlı ve Kolay Başlangıç</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Hemen Depolamaya Başlayın!
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
            Fazla eşyalarınız için güvenli bir yer bulmak hiç bu kadar kolay olmamıştı. İhtiyacınız olan depoyu hemen keşfedin.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/depolar">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <Send className="w-5 h-5 mr-2" />
                Depoları İncele
              </Button>
            </Link>
            <Link href="/iletisim">
              <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 font-semibold px-8 transition-all cursor-pointer">
                İletişime Geç
              </Button>
            </Link>
          </div>

          {/* Stats or features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-3xl lg:text-4xl font-bold">100+</p>
              <p className="mt-2 text-blue-100">Mutlu Müşteri</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-3xl lg:text-4xl font-bold">7/24</p>
              <p className="mt-2 text-blue-100">Güvenlik</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-3xl lg:text-4xl font-bold">%100</p>
              <p className="mt-2 text-blue-100">Güvenilir</p>
            </div>
          </div>
        </div>
      </section>
  )
}