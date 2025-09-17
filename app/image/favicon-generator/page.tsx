"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Upload, ImageIcon, Type, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function FaviconGenerator() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upload")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [textInput, setTextInput] = useState("A")
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6")
  const [textColor, setTextColor] = useState("#ffffff")
  const [fontSize, setFontSize] = useState("32")
  const [fontFamily, setFontFamily] = useState("Arial")
  const [generatedFavicons, setGeneratedFavicons] = useState<{ size: string; url: string }[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const faviconSizes = [
    { size: "16x16", description: "Tarayıcı sekmesi" },
    { size: "32x32", description: "Tarayıcı sekmesi (Retina)" },
    { size: "48x48", description: "Windows site ikonu" },
    { size: "64x64", description: "Windows site ikonu (büyük)" },
    { size: "96x96", description: "Android Chrome" },
    { size: "128x128", description: "Chrome Web Store" },
    { size: "152x152", description: "iPad touch icon" },
    { size: "167x167", description: "iPad Pro touch icon" },
    { size: "180x180", description: "iPhone touch icon" },
    { size: "192x192", description: "Android Chrome (büyük)" },
    { size: "512x512", description: "PWA splash screen" },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({ title: "Hata!", description: "Lütfen bir görsel dosyası seçin." })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const generateTextFavicon = (size: number): string => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return ""

    canvas.width = size
    canvas.height = size

    // Background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, size, size)

    // Text
    ctx.fillStyle = textColor
    ctx.font = `${Math.floor((size * Number.parseInt(fontSize)) / 64)}px ${fontFamily}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(textInput.charAt(0).toUpperCase(), size / 2, size / 2)

    return canvas.toDataURL("image/png")
  }

  const generateImageFavicon = (size: number): Promise<string> => {
    return new Promise((resolve) => {
      if (!uploadedImage) {
        resolve("")
        return
      }

      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          resolve("")
          return
        }

        canvas.width = size
        canvas.height = size

        // Draw image scaled to fit
        const scale = Math.min(size / img.width, size / img.height)
        const x = (size - img.width * scale) / 2
        const y = (size - img.height * scale) / 2

        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, size, size)
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale)

        resolve(canvas.toDataURL("image/png"))
      }
      img.src = uploadedImage
    })
  }

  const generateAllFavicons = async () => {
    const favicons: { size: string; url: string }[] = []

    for (const { size } of faviconSizes) {
      const [width] = size.split("x").map(Number)
      let dataUrl = ""

      if (activeTab === "text") {
        dataUrl = generateTextFavicon(width)
      } else if (activeTab === "upload" && uploadedImage) {
        dataUrl = await generateImageFavicon(width)
      }

      if (dataUrl) {
        favicons.push({ size, url: dataUrl })
      }
    }

    setGeneratedFavicons(favicons)
    toast({ title: "Başarılı!", description: `${favicons.length} farklı boyutta favicon oluşturuldu.` })
  }

  const downloadFavicon = (url: string, size: string) => {
    const a = document.createElement("a")
    a.href = url
    a.download = `favicon-${size}.png`
    a.click()
  }

  const downloadAllFavicons = () => {
    generatedFavicons.forEach(({ size, url }) => {
      setTimeout(() => downloadFavicon(url, size), 100)
    })
  }

  const generateHTMLCode = () => {
    return `<!-- Favicon HTML kodları -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="152x152" href="/favicon-152x152.png">
<link rel="apple-touch-icon" sizes="167x167" href="/favicon-167x167.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png">

<!-- Android Chrome -->
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png">

<!-- Manifest -->
<link rel="manifest" href="/site.webmanifest">`
  }

  return (
    <ToolLayout title="Favicon Generator" description="Web siteniz için favicon oluşturun">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Favicon Oluşturucu</CardTitle>
            <CardDescription>Görsel yükleyerek veya metin kullanarak favicon oluşturun</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Görsel Yükle
                </TabsTrigger>
                <TabsTrigger value="text">
                  <Type className="h-4 w-4 mr-2" />
                  Metin Favicon
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded"
                        className="max-w-32 max-h-32 mx-auto rounded-lg"
                      />
                      <Button onClick={() => fileInputRef.current?.click()}>Farklı Görsel Seç</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="text-lg font-medium">Görsel yükleyin</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG, SVG desteklenir</p>
                      </div>
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Görsel Seç
                      </Button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <div>
                  <Label htmlFor="bg-color">Arka Plan Rengi</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-10 rounded border"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="text-input">Metin (1 karakter)</Label>
                    <Input
                      id="text-input"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value.slice(0, 1))}
                      placeholder="A"
                      maxLength={1}
                    />
                  </div>

                  <div>
                    <Label htmlFor="font-family">Font</Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Verdana">Verdana</SelectItem>
                        <SelectItem value="Courier New">Courier New</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bg-color">Arka Plan Rengi</Label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="text-color">Metin Rengi</Label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 h-10 rounded border"
                      />
                      <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} placeholder="#ffffff" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-center">
                    <Label>Önizleme</Label>
                    <div
                      className="w-16 h-16 rounded-lg border-2 border-muted flex items-center justify-center text-2xl font-bold mx-auto"
                      style={{
                        backgroundColor: backgroundColor,
                        color: textColor,
                        fontFamily: fontFamily,
                      }}
                    >
                      {textInput.charAt(0).toUpperCase() || "A"}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center pt-4">
              <Button onClick={generateAllFavicons} disabled={activeTab === "upload" && !uploadedImage} size="lg">
                <Palette className="h-4 w-4 mr-2" />
                Favicon'ları Oluştur
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedFavicons.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Oluşturulan Favicon'lar
                <Button onClick={downloadAllFavicons}>
                  <Download className="h-4 w-4 mr-2" />
                  Tümünü İndir
                </Button>
              </CardTitle>
              <CardDescription>Farklı boyutlarda oluşturulan favicon'lar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {generatedFavicons.map(({ size, url }) => (
                  <div key={size} className="text-center space-y-2">
                    <div className="border rounded-lg p-2 bg-muted">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Favicon ${size}`}
                        className="w-8 h-8 mx-auto"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
                    <div className="text-xs">
                      <div className="font-medium">{size}</div>
                      <div className="text-muted-foreground">
                        {faviconSizes.find((f) => f.size === size)?.description}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => downloadFavicon(url, size)}>
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {generatedFavicons.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>HTML Kodları</CardTitle>
              <CardDescription>Web sitenizin head bölümüne eklenecek kodlar</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">{generateHTMLCode()}</pre>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Favicon Boyutları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                • <strong>16x16:</strong> Tarayıcı sekmesi (standart)
              </div>
              <div>
                • <strong>32x32:</strong> Tarayıcı sekmesi (yüksek çözünürlük)
              </div>
              <div>
                • <strong>180x180:</strong> iPhone touch icon
              </div>
              <div>
                • <strong>192x192:</strong> Android Chrome
              </div>
              <div>
                • <strong>512x512:</strong> PWA ve splash screen
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tasarım İpuçları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>• Basit ve tanınabilir tasarım kullanın</div>
              <div>• Yüksek kontrast renkleri tercih edin</div>
              <div>• Küçük boyutlarda test edin</div>
              <div>• Marka kimliğinizi yansıtın</div>
              <div>• Farklı arka planlarda test edin</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
