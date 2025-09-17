"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CaseConverter() {
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [results, setResults] = useState({
    lowercase: "",
    uppercase: "",
    titlecase: "",
    sentencecase: "",
    camelcase: "",
    pascalcase: "",
    snakecase: "",
    kebabcase: "",
    constantcase: "",
    dotcase: "",
    pathcase: "",
    textcase: "",
  })

  const convertText = (text: string) => {
    const lowercase = text.toLowerCase()
    const uppercase = text.toUpperCase()

    // Title Case
    const titlecase = text.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())

    // Sentence Case
    const sentencecase = text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (l) => l.toUpperCase())

    // camelCase
    const camelcase = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())

    // PascalCase
    const pascalcase = camelcase.charAt(0).toUpperCase() + camelcase.slice(1)

    // snake_case
    const snakecase = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")

    // kebab-case
    const kebabcase = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")

    // CONSTANT_CASE
    const constantcase = snakecase.toUpperCase()

    // dot.case
    const dotcase = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, ".")
      .replace(/^\.+|\.+$/g, "")

    // path/case
    const pathcase = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "/")
      .replace(/^\/+|\/+$/g, "")

    // Text Case (alternating)
    const textcase = text
      .split("")
      .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join("")

    setResults({
      lowercase,
      uppercase,
      titlecase,
      sentencecase,
      camelcase,
      pascalcase,
      snakecase,
      kebabcase,
      constantcase,
      dotcase,
      pathcase,
      textcase,
    })
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    convertText(value)
  }

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text)
    toast({ title: "Kopyalandı!", description: `${type} panoya kopyalandı.` })
  }

  const clearAll = () => {
    setInput("")
    setResults({
      lowercase: "",
      uppercase: "",
      titlecase: "",
      sentencecase: "",
      camelcase: "",
      pascalcase: "",
      snakecase: "",
      kebabcase: "",
      constantcase: "",
      dotcase: "",
      pathcase: "",
      textcase: "",
    })
  }

  const loadSampleText = () => {
    const sample = "Hello World! This is a Sample Text for Case Conversion."
    setInput(sample)
    convertText(sample)
  }

  const caseTypes = [
    { key: "lowercase", label: "lowercase", description: "Tüm harfler küçük" },
    { key: "uppercase", label: "UPPERCASE", description: "Tüm harfler büyük" },
    { key: "titlecase", label: "Title Case", description: "Her kelimenin ilk harfi büyük" },
    { key: "sentencecase", label: "Sentence case", description: "Cümle başları büyük" },
    { key: "camelcase", label: "camelCase", description: "İlk kelime küçük, diğerleri büyük başlar" },
    { key: "pascalcase", label: "PascalCase", description: "Tüm kelimeler büyük başlar" },
    { key: "snakecase", label: "snake_case", description: "Alt çizgi ile ayrılmış" },
    { key: "kebabcase", label: "kebab-case", description: "Tire ile ayrılmış" },
    { key: "constantcase", label: "CONSTANT_CASE", description: "Büyük harf + alt çizgi" },
    { key: "dotcase", label: "dot.case", description: "Nokta ile ayrılmış" },
    { key: "pathcase", label: "path/case", description: "Slash ile ayrılmış" },
    { key: "textcase", label: "tExT cAsE", description: "Alternatif büyük/küçük" },
  ]

  return (
    <ToolLayout title="Text Case Converter" description="Metin büyük/küçük harf dönüştürücü">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={loadSampleText} variant="outline">
            Örnek Metin Yükle
          </Button>
          <Button onClick={clearAll} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Temizle
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Metin Girişi</CardTitle>
            <CardDescription>Dönüştürülecek metni girin</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Hello World! This is a Sample Text for Case Conversion."
              rows={4}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {caseTypes.map((type) => (
            <Card key={type.key}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  {type.label}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(results[type.key as keyof typeof results], type.label)}
                    disabled={!results[type.key as keyof typeof results]}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <CardDescription className="text-xs">{type.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-muted p-3 rounded-lg min-h-[60px] font-mono text-sm break-all">
                  {results[type.key as keyof typeof results] || "Sonuç burada görünecek..."}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Programlama Konvansiyonları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                • <strong>camelCase:</strong> JavaScript, Java değişken isimleri
              </div>
              <div>
                • <strong>PascalCase:</strong> C#, Java sınıf isimleri
              </div>
              <div>
                • <strong>snake_case:</strong> Python, Ruby değişken isimleri
              </div>
              <div>
                • <strong>kebab-case:</strong> CSS sınıfları, URL'ler
              </div>
              <div>
                • <strong>CONSTANT_CASE:</strong> Sabitler, environment variables
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kullanım Alanları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                • <strong>Kod Yazımı:</strong> Değişken ve fonksiyon isimleri
              </div>
              <div>
                • <strong>URL Oluşturma:</strong> SEO dostu URL'ler
              </div>
              <div>
                • <strong>Dosya İsimleri:</strong> Sistem uyumlu isimler
              </div>
              <div>
                • <strong>Veritabanı:</strong> Tablo ve sütun isimleri
              </div>
              <div>
                • <strong>Metin Düzenleme:</strong> Başlık ve içerik formatı
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
