"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Download, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: string
  priority: string
}

export default function SitemapGenerator() {
  const { toast } = useToast()
  const [urls, setUrls] = useState<SitemapUrl[]>([
    { loc: "", lastmod: new Date().toISOString().split("T")[0], changefreq: "weekly", priority: "0.8" },
  ])

  const addUrl = () => {
    setUrls([
      ...urls,
      {
        loc: "",
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "weekly",
        priority: "0.8",
      },
    ])
  }

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const updateUrl = (index: number, field: keyof SitemapUrl, value: string) => {
    const updated = [...urls]
    updated[index] = { ...updated[index], [field]: value }
    setUrls(updated)
  }

  const generateSitemap = () => {
    const validUrls = urls.filter((url) => url.loc.trim())

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    validUrls.forEach((url) => {
      sitemap += "  <url>\n"
      sitemap += `    <loc>${url.loc}</loc>\n`
      if (url.lastmod) sitemap += `    <lastmod>${url.lastmod}</lastmod>\n`
      if (url.changefreq) sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`
      if (url.priority) sitemap += `    <priority>${url.priority}</priority>\n`
      sitemap += "  </url>\n"
    })

    sitemap += "</urlset>"
    return sitemap
  }

  const copyToClipboard = async () => {
    const sitemapContent = generateSitemap()
    await navigator.clipboard.writeText(sitemapContent)
    toast({ title: "Kopyalandı!", description: "Sitemap XML panoya kopyalandı." })
  }

  const downloadAsFile = () => {
    const sitemapContent = generateSitemap()
    const blob = new Blob([sitemapContent], { type: "application/xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sitemap.xml"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout title="Sitemap XML Generator" description="Siteniz için XML sitemap oluşturun">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                URL Listesi
                <Button size="sm" onClick={addUrl}>
                  <Plus className="h-4 w-4 mr-2" />
                  URL Ekle
                </Button>
              </CardTitle>
              <CardDescription>Sitemap'e dahil edilecek URL'leri ekleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {urls.map((url, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>URL #{index + 1}</Label>
                    {urls.length > 1 && (
                      <Button size="sm" variant="outline" onClick={() => removeUrl(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div>
                    <Label>URL</Label>
                    <Input
                      value={url.loc}
                      onChange={(e) => updateUrl(index, "loc", e.target.value)}
                      placeholder="https://example.com/page"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Son Değişiklik</Label>
                      <Input
                        type="date"
                        value={url.lastmod}
                        onChange={(e) => updateUrl(index, "lastmod", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Öncelik</Label>
                      <Select value={url.priority} onValueChange={(value) => updateUrl(index, "priority", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.0">1.0 (En yüksek)</SelectItem>
                          <SelectItem value="0.9">0.9</SelectItem>
                          <SelectItem value="0.8">0.8</SelectItem>
                          <SelectItem value="0.7">0.7</SelectItem>
                          <SelectItem value="0.6">0.6</SelectItem>
                          <SelectItem value="0.5">0.5 (Orta)</SelectItem>
                          <SelectItem value="0.4">0.4</SelectItem>
                          <SelectItem value="0.3">0.3</SelectItem>
                          <SelectItem value="0.2">0.2</SelectItem>
                          <SelectItem value="0.1">0.1 (En düşük)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Değişim Sıklığı</Label>
                    <Select value={url.changefreq} onValueChange={(value) => updateUrl(index, "changefreq", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="always">Always (Her zaman)</SelectItem>
                        <SelectItem value="hourly">Hourly (Saatlik)</SelectItem>
                        <SelectItem value="daily">Daily (Günlük)</SelectItem>
                        <SelectItem value="weekly">Weekly (Haftalık)</SelectItem>
                        <SelectItem value="monthly">Monthly (Aylık)</SelectItem>
                        <SelectItem value="yearly">Yearly (Yıllık)</SelectItem>
                        <SelectItem value="never">Never (Hiç)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Oluşturulan Sitemap XML</CardTitle>
              <CardDescription>Web sitenizin kök dizinine yüklenecek sitemap.xml dosyası</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96 whitespace-pre-wrap">
                  {generateSitemap()}
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
              <CardTitle>Sitemap Rehberi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>loc:</strong> Sayfanın tam URL'si (zorunlu)
              </div>
              <div>
                <strong>lastmod:</strong> Son değişiklik tarihi (YYYY-MM-DD formatında)
              </div>
              <div>
                <strong>changefreq:</strong> Sayfanın ne sıklıkla değiştiği
              </div>
              <div>
                <strong>priority:</strong> Diğer sayfalara göre öncelik (0.0-1.0 arası)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO İpuçları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>• Ana sayfa için priority 1.0 kullanın</div>
              <div>• Önemli kategoriler için 0.8-0.9 kullanın</div>
              <div>• Blog yazıları için 0.6-0.7 kullanın</div>
              <div>• Sitemap'i robots.txt dosyasına ekleyin</div>
              <div>• Google Search Console'a sitemap'i gönderin</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
