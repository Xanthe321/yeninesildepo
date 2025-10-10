import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

export default function Footer() {
  return(
    <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Yeni Nesil Depolama
            </h3>
            <p className="text-sm leading-relaxed">
              Güvenli ve esnek depolama çözümleri sunuyoruz. Eşyalarınızı gönül rahatlığıyla bize emanet edin.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Hızlı Erişim</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Ana Sayfa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hizmetler</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Depolarımız</a></li>
              <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">İletişim</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Adres Bilgisi, Şehir, Ülke</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+90 5XX XXX XX XX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@depo.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500">
          © 2024 Depo.com. Tüm Hakları Saklıdır.
        </div>
      </footer>
  )
}