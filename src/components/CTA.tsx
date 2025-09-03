"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CTA() {

const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // const handleInputChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => ({ ...prevState, [name]: value }));
  // };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   console.log('Form verileri:', formData);
  //   // Burada form verilerini gönderme işlemi yapılabilir
  // };

  return (
    <section className="bg-blue-600 text-white py-20 sm:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Hemen Depolamaya Başlayın!
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Fazla eşyalarınız için güvenli bir yer bulmak hiç bu kadar kolay olmamıştı. Aşağıdaki formu doldurarak size özel bir teklif alın.
          </p>
          <div className="mt-10 max-w-xl mx-auto">
            <form className="space-y-6">
              <Input
                type="text"
                name="name"
                placeholder="Adınız Soyadınız"
                value={formData.name}
                className="bg-white text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400"
              />
              <Input
                type="email"
                name="email"
                placeholder="E-posta Adresiniz"
                value={formData.email}
                // onChange={handleInputChange}
                className="bg-white text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400"
              />
              <Textarea
                name="message"
                placeholder="Mesajınız (isteğe bağlı)"
                value={formData.message}
                // onChange={handleInputChange}
                className="bg-white text-gray-900 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-400"
              />
              <Button type="submit" className="w-full bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
                Fiyat Teklifi Al
              </Button>
            </form>
          </div>
        </div>
      </section>
  )
}