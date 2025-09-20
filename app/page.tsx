"use client"
import {
  Search,
  Code,
  FileText,
  ImageIcon,
  Globe,
  Calculator,
  Lock,
  Zap,
  Palette,
  Hash,
  Type,
  Scissors,
  Download,
  Copy,
  RefreshCw,
  Shield,
  Network,
  Database,
  FileImage,
  QrCode,
  Link,
  Timer,
  Eye,
  BarChart,
  Settings,
  Wrench,
  Compass,
  DollarSign,
  Smile,
  Calendar,
  Clock,
  Key,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"
import { CategorySection } from "@/components/CategorySection"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchProvider, useSearch } from "@/components/SearchProvider"

{/*
function HomeContent() {
  const { searchTerm, setSearchTerm, filteredCategories } = useSearch()
  const totalTools = filteredCategories.reduce((acc, c) => acc + c.tools.length, 0)
  return (
    <div className="min-h-screen bg-background">
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black"></div>
          <div className="pointer-events-none absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-hero opacity-20 blur-hero animate-float-elegant"></div>
          <div className="pointer-events-none absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-hero opacity-15 blur-hero animate-float-elegant" style={{ animationDelay: "4s" }}></div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 animate-fade-in-up">
              <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-premium backdrop-blur-glass text-primary text-sm font-bold border border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 animate-pulse-glow">✨ {totalTools}+ Premium Developer Tools</span>
            </div>
            <div className="mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none">
                <span className="block bg-gradient-hero bg-clip-text text-transparent animate-gradient-x bg-[length:400%_400%]">Tools</span>
                <span className="block text-white/90 -mt-4">Hub</span>
              </h1>
            </div>
            <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <p className="text-2xl md:text-3xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light">Professional developer tools designed for <span className="text-transparent bg-gradient-hero bg-clip-text font-semibold"> modern workflows</span></p>
              <p className="text-lg text-white/40 mt-4 max-w-2xl mx-auto">Fast, secure, and completely free. No registration required.</p>
            </div>
            <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <div className="max-w-2xl mx-auto relative group">
                <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-3xl blur-lg group-focus-within:opacity-40 transition-opacity duration-500"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/40 h-6 w-6 group-focus-within:text-primary transition-colors duration-300" />
                  <Input type="text" placeholder="Search for tools..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-14 pr-6 py-6 text-lg bg-gradient-premium backdrop-blur-glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-3xl text-white placeholder:text-white/40" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <Button size="lg" className="relative overflow-hidden bg-gradient-hero hover:shadow-luxury transition-all duration-700 hover:scale-110 px-12 py-4 text-lg font-bold rounded-2xl group">
                <span className="relative z-10">Explore Tools</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Button>
              <Button variant="outline" size="lg" className="relative overflow-hidden border-white/20 bg-gradient-premium backdrop-blur-glass hover:border-primary/30 hover:text-primary transition-all duration-500 px-12 py-4 text-lg font-semibold rounded-2xl hover:scale-105 group">
                <span className="relative z-10">Browse Categories</span>
                <span className="pointer-events-none absolute inset-0 bg-gradient-glass opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-hero rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </header>
      <section className="relative py-20 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="animate-slide-up group cursor-pointer">
              <div className="text-4xl md:text-5xl font-black bg-gradient-hero bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">{totalTools}+</div>
              <div className="text-white/60 font-medium">Premium Tools</div>
            </div>
            <div className="animate-slide-up group cursor-pointer" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl md:text-5xl font-black bg-gradient-hero bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">10</div>
              <div className="text-white/60 font-medium">Categories</div>
            </div>
            <div className="animate-slide-up group cursor-pointer" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl md:text-5xl font-black bg-gradient-hero bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-white/60 font-medium">Free Forever</div>
            </div>
            <div className="animate-slide-up group cursor-pointer" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl md:text-5xl font-black bg-gradient-hero bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-white/60 font-medium">Available</div>
            </div>
          </div>
        </div>
      </section>
      <main className="container mx-auto px-4 py-20">
        <div className="space-y-20">
          {filteredCategories.map((category, index) => (
            <div key={category.categoryKey} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CategorySection title={category.title} description={category.description} tools={category.tools} categoryKey={category.categoryKey} />
            </div>
          ))}
        </div>
      </main>
      <footer className="border-t border-white/10 bg-gradient-secondary">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">Tools.Yelbiz</h3>
              <p className="text-muted-foreground leading-relaxed">Geliştiriciler ve dijital profesyoneller için tasarlanmış kapsamlı araç koleksiyonu. Modern, hızlı ve güvenilir çözümler.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Popüler Araçlar</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">JSON Formatter</li>
                <li className="hover:text-primary transition-colors cursor-pointer">PDF Merger</li>
                <li className="hover:text-primary transition-colors cursor-pointer">QR Code Generator</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Password Generator</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Kategoriler</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">Text & Content</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Image & Media</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Code & Development</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Security & Privacy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">İletişim</h4>
              <div className="space-y-3 text-muted-foreground">
                <p>tools.yelbiz.com.tr</p>
                <p>Professional tools for developers</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-muted-foreground">© 2024 Yelbiz Tools. Tüm hakları saklıdır.<span className="text-primary ml-2">Made with ❤️ for developers</span></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

*/}

export default function PageProvider() {
  const categories = [
    {
      title: "SEO Tools",
      description: "Arama motoru optimizasyonu ve web analiz araçları",
      categoryKey: "seo",
      tools: [
        {
          title: "Meta Tag Generator",
          description: "Web siteniz için SEO uyumlu meta etiketleri oluşturun",
          icon: <Globe className="h-5 w-5" />,
          href: "/seo/meta-tag-generator",
        },
        {
          title: "Robots.txt Generator",
          description: "Arama motoru botları için robots.txt dosyası oluşturun",
          icon: <Settings className="h-5 w-5" />,
          href: "/seo/robots-generator",
        },
        {
          title: "Sitemap XML Generator",
          description: "Siteniz için XML sitemap oluşturun",
          icon: <Network className="h-5 w-5" />,
          href: "/seo/sitemap-generator",
        },
        {
          title: "URL Encoder/Decoder",
          description: "URL'leri kodlayın ve çözümleyin",
          icon: <Link className="h-5 w-5" />,
          href: "/seo/url-encoder",
        },
        {
          title: "SEO Friendly URL Checker",
          description: "URL'lerinizin SEO uyumluluğunu kontrol edin",
          icon: <CheckCircle className="h-5 w-5" />,
          href: "/seo/url-checker",
        },
        {
          title: "Backlink Checker",
          description: "Web sitenizin geri bağlantılarını analiz edin",
          icon: <Link className="h-5 w-5" />,
          href: "/seo/backlink-checker",
        },
        {
          title: "Keyword Density Analyzer",
          description: "İçerikteki anahtar kelime yoğunluğunu analiz edin",
          icon: <BarChart className="h-5 w-5" />,
          href: "/seo/keyword-density",
        },
        {
          title: "Page Speed Insights",
          description: "Web sayfanızın hızını analiz edin",
          icon: <Zap className="h-5 w-5" />,
          href: "/seo/page-speed",
        },
        {
          title: "Canonical URL Generator",
          description: "Canonical URL etiketleri oluşturun",
          icon: <Settings className="h-5 w-5" />,
          href: "/seo/canonical-generator",
        },
        {
          title: "Broken Link Checker",
          description: "Kırık bağlantıları tespit edin",
          icon: <AlertCircle className="h-5 w-5" />,
          href: "/seo/broken-link-checker",
        },
      ],
    },
    {
      title: "JSON & Data Tools",
      description: "JSON ve veri formatlama araçları",
      categoryKey: "json",
      tools: [
        {
          title: "JSON Formatter / Validator",
          description: "JSON verilerinizi düzenleyin ve doğrulayın",
          icon: <Code className="h-5 w-5" />,
          href: "/json/formatter",
        },
        {
          title: "JSON to CSV Converter",
          description: "JSON verilerini CSV formatına dönüştürün",
          icon: <FileText className="h-5 w-5" />,
          href: "/json/to-csv",
        },
        {
          title: "CSV to JSON Converter",
          description: "CSV verilerini JSON formatına dönüştürün",
          icon: <Database className="h-5 w-5" />,
          href: "/json/from-csv",
        },
        {
          title: "XML to JSON Converter",
          description: "XML verilerini JSON formatına dönüştürün",
          icon: <RefreshCw className="h-5 w-5" />,
          href: "/json/from-xml",
        },
        {
          title: "YAML to JSON Converter",
          description: "YAML verilerini JSON formatına dönüştürün",
          icon: <RefreshCw className="h-5 w-5" />,
          href: "/json/from-yaml",
        },
        {
          title: "JSON Minifier",
          description: "JSON verilerinizi sıkıştırın",
          icon: <Scissors className="h-5 w-5" />,
          href: "/json/minifier",
        },
        {
          title: "JSON Schema Validator",
          description: "JSON Schema ile verilerinizi doğrulayın",
          icon: <CheckCircle className="h-5 w-5" />,
          href: "/json/schema-validator",
        },
      ],
    },
    {
      title: "Text & String Tools",
      description: "Metin işleme ve string manipülasyon araçları",
      categoryKey: "text",
      tools: [
        {
          title: "Base64 Encode/Decode",
          description: "Metinleri Base64 formatına kodlayın/çözün",
          icon: <Lock className="h-5 w-5" />,
          href: "/text/base64",
        },
        {
          title: "URL Encode/Decode",
          description: "URL'leri kodlayın ve çözün",
          icon: <Link className="h-5 w-5" />,
          href: "/text/url-encoder",
        },
        {
          title: "Lorem Ipsum Generator",
          description: "Tasarım için örnek metin oluşturun",
          icon: <Type className="h-5 w-5" />,
          href: "/text/lorem-ipsum",
        },
        {
          title: "Word & Character Counter",
          description: "Kelime ve karakter sayısını hesaplayın",
          icon: <Hash className="h-5 w-5" />,
          href: "/text/word-counter",
        },
        {
          title: "Text Case Converter",
          description: "Metin büyük/küçük harf dönüştürücü",
          icon: <Type className="h-5 w-5" />,
          href: "/text/case-converter",
        },
        {
          title: "Regex Tester",
          description: "Regular expression'ları test edin",
          icon: <Search className="h-5 w-5" />,
          href: "/text/regex-tester",
        },
        {
          title: "Regex Builder",
          description: "Regular expression oluşturucu",
          icon: <Wrench className="h-5 w-5" />,
          href: "/text/regex-builder",
        },
        {
          title: "HTML Entities Encoder/Decoder",
          description: "HTML özel karakterleri kodlayın",
          icon: <Code className="h-5 w-5" />,
          href: "/text/html-entities",
        },
        {
          title: "Palindrome Checker",
          description: "Palindrom kontrolcüsü",
          icon: <Eye className="h-5 w-5" />,
          href: "/text/palindrome",
        },
        {
          title: "Anagram Finder",
          description: "Anagram bulucu",
          icon: <RefreshCw className="h-5 w-5" />,
          href: "/text/anagram",
        },
      ],
    },
    {
      title: "PDF & File Tools",
      description: "PDF ve dosya işleme araçları",
      categoryKey: "pdf",
      tools: [
        {
          title: "PDF to JPG/PNG Converter",
          description: "PDF'leri görsel formatına dönüştürün",
          icon: <FileImage className="h-5 w-5" />,
          href: "/pdf/to-image",
        },
        {
          title: "PDF Merger",
          description: "Birden fazla PDF'yi birleştirin",
          icon: <Copy className="h-5 w-5" />,
          href: "/pdf/merger",
        },
        {
          title: "PDF Splitter",
          description: "PDF'leri sayfalara ayırın",
          icon: <Scissors className="h-5 w-5" />,
          href: "/pdf/splitter",
        },
        {
          title: "PDF Metadata Viewer",
          description: "PDF meta verilerini görüntüleyin",
          icon: <Info className="h-5 w-5" />,
          href: "/pdf/metadata-viewer",
        },
        {
          title: "PDF Metadata Editor",
          description: "PDF meta verilerini düzenleyin",
          icon: <Settings className="h-5 w-5" />,
          href: "/pdf/metadata-editor",
        },
        {
          title: "PDF Text Extractor",
          description: "PDF'den metin çıkarın",
          icon: <Type className="h-5 w-5" />,
          href: "/pdf/text-extractor",
        },
        {
          title: "PDF Compressor",
          description: "PDF dosya boyutunu küçültün",
          icon: <Download className="h-5 w-5" />,
          href: "/pdf/compressor",
        },
        {
          title: "PDF Form Filler",
          description: "PDF formlarını doldurun",
          icon: <FileText className="h-5 w-5" />,
          href: "/pdf/form-filler",
        },
        {
          title: "File Format Converter",
          description: "Dosya formatları arası dönüştürme",
          icon: <RefreshCw className="h-5 w-5" />,
          href: "/pdf/format-converter",
        },
        {
          title: "Barcode / QR Code Generator",
          description: "Barkod ve QR kod oluşturucu",
          icon: <QrCode className="h-5 w-5" />,
          href: "/pdf/qr-generator",
        },
      ],
    },
    {
      title: "Image & Graphics Tools",
      description: "Görsel düzenleme ve grafik araçları",
      categoryKey: "image",
      tools: [
        {
          title: "Favicon Generator",
          description: "Web siteniz için favicon oluşturun",
          icon: <ImageIcon className="h-5 w-5" />,
          href: "/image/favicon-generator",
        },
        {
          title: "Image Compressor",
          description: "Görselleri sıkıştırın",
          icon: <Download className="h-5 w-5" />,
          href: "/image/compressor",
        },
        {
          title: "Image Resizer",
          description: "Görsel boyutlandırma",
          icon: <Settings className="h-5 w-5" />,
          href: "/image/resizer",
        },
        {
          title: "Base64 Image Encoder/Decoder",
          description: "Görselleri Base64'e dönüştürün",
          icon: <Lock className="h-5 w-5" />,
          href: "/image/base64",
        },
        {
          title: "Color Picker",
          description: "Renk seçici ve paleti",
          icon: <Palette className="h-5 w-5" />,
          href: "/image/color-picker",
        },
        {
          title: "Palette Generator",
          description: "Renk paleti oluşturucu",
          icon: <Palette className="h-5 w-5" />,
          href: "/image/palette-generator",
        },
        {
          title: "Image to ASCII Art Converter",
          description: "Görseli ASCII sanatına dönüştürün",
          icon: <Type className="h-5 w-5" />,
          href: "/image/ascii-converter",
        },
        {
          title: "QR Code Generator",
          description: "QR kod oluşturucu",
          icon: <QrCode className="h-5 w-5" />,
          href: "/image/qr-generator",
        },
        {
          title: "Screenshot Tool",
          description: "Ekran görüntüsü aracı",
          icon: <ImageIcon className="h-5 w-5" />,
          href: "/image/screenshot",
        },
        {
          title: "EXIF Data Viewer",
          description: "Görsel EXIF verilerini görüntüleyin",
          icon: <Info className="h-5 w-5" />,
          href: "/image/exif-viewer",
        },
      ],
    },
    {
      title: "Developer & Network Tools",
      description: "Geliştirici ve ağ analiz araçları",
      categoryKey: "developer",
      tools: [
        {
          title: "HTTP Header Viewer",
          description: "HTTP başlıklarını görüntüleyin",
          icon: <Network className="h-5 w-5" />,
          href: "/dev/http-headers",
        },
        {
          title: "IP Geolocation Tool",
          description: "IP konum tespit aracı",
          icon: <Compass className="h-5 w-5" />,
          href: "/dev/ip-geolocation",
        },
        {
          title: "Whois Lookup",
          description: "Domain whois sorgulama",
          icon: <Search className="h-5 w-5" />,
          href: "/dev/whois",
        },
        {
          title: "DNS Lookup",
          description: "DNS kayıtlarını sorgulayın",
          icon: <Network className="h-5 w-5" />,
          href: "/dev/dns-lookup",
        },
        {
          title: "Propagation Checker",
          description: "DNS yayılım kontrolü",
          icon: <Globe className="h-5 w-5" />,
          href: "/dev/dns-propagation",
        },
        {
          title: "Port Scanner",
          description: "Port tarama aracı",
          icon: <Shield className="h-5 w-5" />,
          href: "/dev/port-scanner",
        },
        {
          title: "SSL Checker",
          description: "SSL sertifika kontrolü",
          icon: <Lock className="h-5 w-5" />,
          href: "/dev/ssl-checker",
        },
        {
          title: "CURL Tester",
          description: "CURL komutlarını test edin",
          icon: <Code className="h-5 w-5" />,
          href: "/dev/curl-tester",
        },
        {
          title: "API Response Tester",
          description: "API yanıtlarını test edin",
          icon: <Database className="h-5 w-5" />,
          href: "/dev/api-tester",
        },
      ],
    },
    {
      title: "Time & Date Tools",
      description: "Zaman ve tarih araçları",
      categoryKey: "time",
      tools: [
        {
          title: "Unix Timestamp Converter",
          description: "Unix zaman damgası dönüştürücü",
          icon: <Clock className="h-5 w-5" />,
          href: "/time/timestamp-converter",
        },
        {
          title: "World Clock",
          description: "Dünya saati",
          icon: <Globe className="h-5 w-5" />,
          href: "/time/world-clock",
        },
        {
          title: "Timezone Converter",
          description: "Saat dilimi dönüştürücü",
          icon: <Clock className="h-5 w-5" />,
          href: "/time/timezone-converter",
        },
        {
          title: "Countdown Timer",
          description: "Geri sayım sayacı",
          icon: <Timer className="h-5 w-5" />,
          href: "/time/countdown",
        },
        { title: "Stopwatch", description: "Kronometre", icon: <Timer className="h-5 w-5" />, href: "/time/stopwatch" },
        {
          title: "Date Calculator",
          description: "Tarih hesaplayıcı",
          icon: <Calculator className="h-5 w-5" />,
          href: "/time/date-calculator",
        },
        {
          title: "Holiday API Integration",
          description: "Tatil günleri API entegrasyonu",
          icon: <Calendar className="h-5 w-5" />,
          href: "/time/holidays",
        },
      ],
    },
    {
      title: "Security & Encryption Tools",
      description: "Güvenlik ve şifreleme araçları",
      categoryKey: "security",
      tools: [
        {
          title: "MD5 Hash Generator",
          description: "MD5 hash oluşturucu",
          icon: <Hash className="h-5 w-5" />,
          href: "/security/md5",
        },
        {
          title: "SHA Hash Generator",
          description: "SHA hash oluşturucu",
          icon: <Hash className="h-5 w-5" />,
          href: "/security/sha",
        },
        {
          title: "Password Strength Checker",
          description: "Şifre güçlülük kontrolcüsü",
          icon: <Shield className="h-5 w-5" />,
          href: "/security/password-checker",
        },
        {
          title: "Random Password Generator",
          description: "Rastgele şifre oluşturucu",
          icon: <Key className="h-5 w-5" />,
          href: "/security/password-generator",
        },
        {
          title: "JWT Decoder",
          description: "JWT token çözücü",
          icon: <Lock className="h-5 w-5" />,
          href: "/security/jwt-decoder",
        },
        {
          title: "HMAC Generator",
          description: "HMAC oluşturucu",
          icon: <Hash className="h-5 w-5" />,
          href: "/security/hmac",
        },
        {
          title: "Two-Factor Authentication QR Code Generator",
          description: "2FA QR kodu oluşturucu",
          icon: <QrCode className="h-5 w-5" />,
          href: "/security/2fa-qr",
        },
      ],
    },
    {
      title: "Finance & Calculators",
      description: "Finansal araçlar ve hesaplayıcılar",
      categoryKey: "finance",
      tools: [
        {
          title: "Currency Exchange Rates",
          description: "Döviz kurları",
          icon: <DollarSign className="h-5 w-5" />,
          href: "/finance/currency",
        },
        {
          title: "Loan Calculator",
          description: "Kredi hesaplayıcı",
          icon: <Calculator className="h-5 w-5" />,
          href: "/finance/loan-calculator",
        },
        {
          title: "Basic Accounting / Invoice Demo",
          description: "Temel muhasebe / fatura demo",
          icon: <CreditCard className="h-5 w-5" />,
          href: "/finance/invoice",
        },
        {
          title: "Interest Calculator",
          description: "Faiz hesaplayıcı",
          icon: <Calculator className="h-5 w-5" />,
          href: "/finance/interest",
        },
        {
          title: "Budget Planner",
          description: "Bütçe planlayıcı",
          icon: <BarChart className="h-5 w-5" />,
          href: "/finance/budget",
        },
      ],
    },
    {
      title: "Fun & General Tools",
      description: "Eğlenceli ve genel araçlar",
      categoryKey: "fun",
      tools: [
        {
          title: "Emoji Picker",
          description: "Emoji seçici",
          icon: <Smile className="h-5 w-5" />,
          href: "/fun/emoji-picker",
        },
        {
          title: "Random Joke Generator",
          description: "Rastgele şaka oluşturucu",
          icon: <Smile className="h-5 w-5" />,
          href: "/fun/joke-generator",
        },
        {
          title: "Colored Text Generator",
          description: "Renkli metin oluşturucu",
          icon: <Palette className="h-5 w-5" />,
          href: "/fun/colored-text",
        },
        {
          title: "ASCII Art Generator",
          description: "ASCII sanat oluşturucu",
          icon: <Type className="h-5 w-5" />,
          href: "/fun/ascii-art",
        },
        {
          title: "Name Meaning / Numerology",
          description: "İsim anlamı / numeroloji",
          icon: <Eye className="h-5 w-5" />,
          href: "/fun/name-meaning",
        },
      ],
    },
  ]
  return (
    <SearchProvider categories={categories}>
      <Page />
    </SearchProvider>
  );
}

function Page() {

  const { searchTerm, setSearchTerm, filteredCategories, categoriesLength } = useSearch()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black"></div>
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-hero opacity-20 blur-hero animate-float-elegant"></div>
          <div
            className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-hero opacity-15 blur-hero animate-float-elegant"
            style={{ animationDelay: "4s" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="mb-12 animate-fade-in-up">
              <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-premium backdrop-blur-glass text-primary text-sm font-bold border border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 animate-pulse-glow">
                ✨ {categoriesLength}+ Premium Developer Tools
              </span>
            </div>

            {/* Main Title */}
            <div className="mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none">
                <span className="block bg-gradient-hero bg-clip-text text-transparent animate-gradient-x bg-[length:400%_400%]">
                  Tools
                </span>
                <span className="block text-white/90 -mt-4">Hub</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <p className="text-2xl md:text-3xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light">
                Professional developer tools designed for
                <span className="text-transparent bg-gradient-hero bg-clip-text font-semibold">
                  {" "}
                  modern workflows
                </span>
              </p>
              <p className="text-lg text-white/40 mt-4 max-w-2xl mx-auto">
                Fast, secure, and completely free. No registration required.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <div className="max-w-2xl mx-auto relative group">
                <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-3xl blur-lg group-focus-within:opacity-40 transition-opacity duration-500"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/40 h-6 w-6 group-focus-within:text-primary transition-colors duration-300" />
                  <Input
                    type="text"
                    placeholder="Search for tools..."
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-14 pr-6 py-6 text-lg bg-gradient-premium backdrop-blur-glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-3xl text-white placeholder:text-white/40"
                  />
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap justify-center gap-6 animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <Button
                size="lg"
                className="relative overflow-hidden bg-gradient-hero hover:shadow-luxury transition-all duration-700 hover:scale-110 px-12 py-4 text-lg font-bold rounded-2xl group"
              >
                <span className="relative z-10">Explore Tools</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="relative overflow-hidden border-white/20 bg-gradient-premium backdrop-blur-glass hover:border-primary/30 hover:text-primary transition-all duration-500 px-12 py-4 text-lg font-semibold rounded-2xl hover:scale-105 group"
              >
                <span className="relative z-10">Browse Categories</span>
                <span className="pointer-events-none absolute inset-0 bg-gradient-glass opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-hero rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="relative py-20 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="animate-slide-up group cursor-pointer">
              <div className="text-4xl md:text-5xl font-black bg-gradient-hero bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                {categoriesLength}+
              </div>
              <div className="text-white/60 font-medium">Premium Tools</div>
            </div>
            <div className="animate-slide-up group cursor-pointer" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl md:text-5xl font-black bg-gradient-hero bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                10
              </div>
              <div className="text-white/60 font-medium">Categories</div>
            </div>
            <div className="animate-slide-up group cursor-pointer" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl md:text-5xl font-black bg-gradient-hero bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-white/60 font-medium">Free Forever</div>
            </div>
            <div className="animate-slide-up group cursor-pointer" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl md:text-5xl font-black bg-gradient-hero bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-white/60 font-medium">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Categories */}
      <main className="container mx-auto px-4 py-20">
        <div className="space-y-20">
          {filteredCategories.map((category, index) => (
            <div
              key={category.categoryKey}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategorySection
                title={category.title}
                description={category.description}
                tools={category.tools}
                categoryKey={category.categoryKey}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-gradient-secondary">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">Tools.Yelbiz</h3>
              <p className="text-muted-foreground leading-relaxed">
                Geliştiriciler ve dijital profesyoneller için tasarlanmış kapsamlı araç koleksiyonu. Modern, hızlı ve
                güvenilir çözümler.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Popüler Araçlar</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">JSON Formatter</li>
                <li className="hover:text-primary transition-colors cursor-pointer">PDF Merger</li>
                <li className="hover:text-primary transition-colors cursor-pointer">QR Code Generator</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Password Generator</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Kategoriler</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">Text & Content</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Image & Media</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Code & Development</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Security & Privacy</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">İletişim</h4>
              <div className="space-y-3 text-muted-foreground">
                <p>tools.yelbiz.com.tr</p>
                <p>Professional tools for developers</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Yelbiz Tools. Tüm hakları saklıdır.
              <span className="text-primary ml-2">Made with ❤️ for developers</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
