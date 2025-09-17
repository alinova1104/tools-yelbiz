"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MetaTagGenerator() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    author: "",
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1.0",
    charset: "UTF-8",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogUrl: "",
    twitterCard: "summary_large_image",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
  })

  const generateMetaTags = () => {
    const tags = []

    // Basic meta tags
    if (formData.charset) tags.push(`<meta charset="${formData.charset}">`)
    if (formData.viewport) tags.push(`<meta name="viewport" content="${formData.viewport}">`)
    if (formData.title) tags.push(`<title>${formData.title}</title>`)
    if (formData.description) tags.push(`<meta name="description" content="${formData.description}">`)
    if (formData.keywords) tags.push(`<meta name="keywords" content="${formData.keywords}">`)
    if (formData.author) tags.push(`<meta name="author" content="${formData.author}">`)
    if (formData.robots) tags.push(`<meta name="robots" content="${formData.robots}">`)

    // Open Graph tags
    if (formData.ogTitle) tags.push(`<meta property="og:title" content="${formData.ogTitle}">`)
    if (formData.ogDescription) tags.push(`<meta property="og:description" content="${formData.ogDescription}">`)
    if (formData.ogImage) tags.push(`<meta property="og:image" content="${formData.ogImage}">`)
    if (formData.ogUrl) tags.push(`<meta property="og:url" content="${formData.ogUrl}">`)
    tags.push(`<meta property="og:type" content="website">`)

    // Twitter Card tags
    if (formData.twitterCard) tags.push(`<meta name="twitter:card" content="${formData.twitterCard}">`)
    if (formData.twitterTitle) tags.push(`<meta name="twitter:title" content="${formData.twitterTitle}">`)
    if (formData.twitterDescription)
      tags.push(`<meta name="twitter:description" content="${formData.twitterDescription}">`)
    if (formData.twitterImage) tags.push(`<meta name="twitter:image" content="${formData.twitterImage}">`)

    return tags.join("\n")
  }

  const copyToClipboard = async () => {
    const metaTags = generateMetaTags()
    await navigator.clipboard.writeText(metaTags)
    toast({ title: "Kopyalandı!", description: "Meta etiketler panoya kopyalandı." })
  }

  const downloadAsFile = () => {
    const metaTags = generateMetaTags()
    const blob = new Blob([metaTags], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "meta-tags.html"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout title="Meta Tag Generator" description="Web siteniz için SEO uyumlu meta etiketleri oluşturun">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Temel Bilgiler</CardTitle>
              <CardDescription>Web sitenizin temel meta bilgilerini girin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Sayfa Başlığı</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Sitenizin başlığı"
                />
              </div>
              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Sitenizin kısa açıklaması (150-160 karakter)"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="keywords">Anahtar Kelimeler</Label>
                <Input
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="anahtar, kelime, listesi"
                />
              </div>
              <div>
                <Label htmlFor="author">Yazar</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Site yazarı"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Open Graph (Facebook)</CardTitle>
              <CardDescription>Facebook paylaşımları için meta etiketler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ogTitle">OG Başlık</Label>
                <Input
                  id="ogTitle"
                  value={formData.ogTitle}
                  onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                  placeholder="Facebook'ta görünecek başlık"
                />
              </div>
              <div>
                <Label htmlFor="ogDescription">OG Açıklama</Label>
                <Textarea
                  id="ogDescription"
                  value={formData.ogDescription}
                  onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                  placeholder="Facebook'ta görünecek açıklama"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="ogImage">OG Görsel URL</Label>
                <Input
                  id="ogImage"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="ogUrl">OG URL</Label>
                <Input
                  id="ogUrl"
                  value={formData.ogUrl}
                  onChange={(e) => setFormData({ ...formData, ogUrl: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Twitter Card</CardTitle>
              <CardDescription>Twitter paylaşımları için meta etiketler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="twitterTitle">Twitter Başlık</Label>
                <Input
                  id="twitterTitle"
                  value={formData.twitterTitle}
                  onChange={(e) => setFormData({ ...formData, twitterTitle: e.target.value })}
                  placeholder="Twitter'da görünecek başlık"
                />
              </div>
              <div>
                <Label htmlFor="twitterDescription">Twitter Açıklama</Label>
                <Textarea
                  id="twitterDescription"
                  value={formData.twitterDescription}
                  onChange={(e) => setFormData({ ...formData, twitterDescription: e.target.value })}
                  placeholder="Twitter'da görünecek açıklama"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="twitterImage">Twitter Görsel URL</Label>
                <Input
                  id="twitterImage"
                  value={formData.twitterImage}
                  onChange={(e) => setFormData({ ...formData, twitterImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Oluşturulan Meta Etiketler</CardTitle>
              <CardDescription>HTML head bölümüne eklenecek etiketler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96 whitespace-pre-wrap">
                  {generateMetaTags() || "Meta etiketler burada görünecek..."}
                </pre>
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadAsFile}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO İpuçları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Başlık:</strong> 50-60 karakter arası olmalı
              </div>
              <div>
                <strong>Açıklama:</strong> 150-160 karakter arası olmalı
              </div>
              <div>
                <strong>Anahtar Kelimeler:</strong> 5-10 adet, virgülle ayrılmış
              </div>
              <div>
                <strong>OG Görsel:</strong> 1200x630 piksel boyutunda olmalı
              </div>
              <div>
                <strong>Twitter Görsel:</strong> 1024x512 piksel boyutunda olmalı
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
