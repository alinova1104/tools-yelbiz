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

export default function RobotsGenerator() {
  const { toast } = useToast()
  const [userAgents, setUserAgents] = useState([
    { agent: "*", allow: ["/"], disallow: ["/admin", "/private"], crawlDelay: "" },
  ])
  const [sitemap, setSitemap] = useState("")
  const [host, setHost] = useState("")

  const addUserAgent = () => {
    setUserAgents([...userAgents, { agent: "*", allow: [], disallow: [], crawlDelay: "" }])
  }

  const removeUserAgent = (index: number) => {
    setUserAgents(userAgents.filter((_, i) => i !== index))
  }

  const updateUserAgent = (index: number, field: string, value: any) => {
    const updated = [...userAgents]
    updated[index] = { ...updated[index], [field]: value }
    setUserAgents(updated)
  }

  const addPath = (index: number, type: "allow" | "disallow") => {
    const updated = [...userAgents]
    updated[index][type].push("")
    setUserAgents(updated)
  }

  const updatePath = (index: number, type: "allow" | "disallow", pathIndex: number, value: string) => {
    const updated = [...userAgents]
    updated[index][type][pathIndex] = value
    setUserAgents(updated)
  }

  const removePath = (index: number, type: "allow" | "disallow", pathIndex: number) => {
    const updated = [...userAgents]
    updated[index][type].splice(pathIndex, 1)
    setUserAgents(updated)
  }

  const generateRobotsTxt = () => {
    let robotsContent = ""

    userAgents.forEach((ua) => {
      robotsContent += `User-agent: ${ua.agent}\n`

      ua.disallow.forEach((path) => {
        if (path.trim()) robotsContent += `Disallow: ${path}\n`
      })

      ua.allow.forEach((path) => {
        if (path.trim()) robotsContent += `Allow: ${path}\n`
      })

      if (ua.crawlDelay) {
        robotsContent += `Crawl-delay: ${ua.crawlDelay}\n`
      }

      robotsContent += "\n"
    })

    if (sitemap) {
      robotsContent += `Sitemap: ${sitemap}\n`
    }

    if (host) {
      robotsContent += `Host: ${host}\n`
    }

    return robotsContent.trim()
  }

  const copyToClipboard = async () => {
    const robotsContent = generateRobotsTxt()
    await navigator.clipboard.writeText(robotsContent)
    toast({ title: "Kopyalandı!", description: "Robots.txt içeriği panoya kopyalandı." })
  }

  const downloadAsFile = () => {
    const robotsContent = generateRobotsTxt()
    const blob = new Blob([robotsContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "robots.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout title="Robots.txt Generator" description="Arama motoru botları için robots.txt dosyası oluşturun">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                User-Agent Kuralları
                <Button size="sm" onClick={addUserAgent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ekle
                </Button>
              </CardTitle>
              <CardDescription>Farklı botlar için kurallar belirleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {userAgents.map((ua, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>User-Agent #{index + 1}</Label>
                    {userAgents.length > 1 && (
                      <Button size="sm" variant="outline" onClick={() => removeUserAgent(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div>
                    <Label>Bot Adı</Label>
                    <Select value={ua.agent} onValueChange={(value) => updateUserAgent(index, "agent", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="*">* (Tüm botlar)</SelectItem>
                        <SelectItem value="Googlebot">Googlebot</SelectItem>
                        <SelectItem value="Bingbot">Bingbot</SelectItem>
                        <SelectItem value="Slurp">Yahoo Slurp</SelectItem>
                        <SelectItem value="DuckDuckBot">DuckDuckBot</SelectItem>
                        <SelectItem value="Baiduspider">Baiduspider</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>İzin Verilmeyen Yollar (Disallow)</Label>
                      <Button size="sm" variant="outline" onClick={() => addPath(index, "disallow")}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {ua.disallow.map((path, pathIndex) => (
                      <div key={pathIndex} className="flex gap-2 mb-2">
                        <Input
                          value={path}
                          onChange={(e) => updatePath(index, "disallow", pathIndex, e.target.value)}
                          placeholder="/admin"
                        />
                        <Button size="sm" variant="outline" onClick={() => removePath(index, "disallow", pathIndex)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>İzin Verilen Yollar (Allow)</Label>
                      <Button size="sm" variant="outline" onClick={() => addPath(index, "allow")}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {ua.allow.map((path, pathIndex) => (
                      <div key={pathIndex} className="flex gap-2 mb-2">
                        <Input
                          value={path}
                          onChange={(e) => updatePath(index, "allow", pathIndex, e.target.value)}
                          placeholder="/"
                        />
                        <Button size="sm" variant="outline" onClick={() => removePath(index, "allow", pathIndex)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Label>Crawl Delay (saniye)</Label>
                    <Input
                      type="number"
                      value={ua.crawlDelay}
                      onChange={(e) => updateUserAgent(index, "crawlDelay", e.target.value)}
                      placeholder="10"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ek Ayarlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sitemap">Sitemap URL</Label>
                <Input
                  id="sitemap"
                  value={sitemap}
                  onChange={(e) => setSitemap(e.target.value)}
                  placeholder="https://example.com/sitemap.xml"
                />
              </div>
              <div>
                <Label htmlFor="host">Host (Tercih edilen domain)</Label>
                <Input
                  id="host"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Oluşturulan Robots.txt</CardTitle>
              <CardDescription>Web sitenizin kök dizinine yüklenecek dosya</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96 whitespace-pre-wrap">
                  {generateRobotsTxt() || "Robots.txt içeriği burada görünecek..."}
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
              <CardTitle>Robots.txt Kuralları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>User-agent:</strong> Hangi botlar için kural geçerli
              </div>
              <div>
                <strong>Disallow:</strong> Bota erişim yasağı getirilen yollar
              </div>
              <div>
                <strong>Allow:</strong> Disallow kuralına istisna getirilen yollar
              </div>
              <div>
                <strong>Crawl-delay:</strong> Bot istekleri arasındaki bekleme süresi
              </div>
              <div>
                <strong>Sitemap:</strong> XML sitemap dosyasının konumu
              </div>
              <div>
                <strong>Host:</strong> Tercih edilen domain adı
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yaygın Örnekler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <code>/admin</code> - Admin paneli
              </div>
              <div>
                <code>/private</code> - Özel dosyalar
              </div>
              <div>
                <code>/*.pdf$</code> - PDF dosyaları
              </div>
              <div>
                <code>/search?*</code> - Arama sonuçları
              </div>
              <div>
                <code>/wp-admin</code> - WordPress admin
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
