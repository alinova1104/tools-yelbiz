"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Upload, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ColorPicker() {
  const { toast } = useToast()
  const [selectedColor, setSelectedColor] = useState("#3b82f6")
  const [colorHistory, setColorHistory] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [colorFormats, setColorFormats] = useState({
    hex: "#3b82f6",
    rgb: "rgb(59, 130, 246)",
    hsl: "hsl(217, 91%, 60%)",
    hsv: "hsv(217, 76%, 96%)",
    cmyk: "cmyk(76%, 47%, 0%, 4%)",
  })

  useEffect(() => {
    updateColorFormats(selectedColor)
  }, [selectedColor])

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const rgbToHsv = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const d = max - min
    const s = max === 0 ? 0 : d / max
    const v = max

    let h = 0
    if (d !== 0) {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    }
  }

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255

    const k = 1 - Math.max(r, Math.max(g, b))
    const c = (1 - r - k) / (1 - k) || 0
    const m = (1 - g - k) / (1 - k) || 0
    const y = (1 - b - k) / (1 - k) || 0

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    }
  }

  const updateColorFormats = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)

    setColorFormats({
      hex: hex.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsv: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`,
      cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    })
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    if (!colorHistory.includes(color)) {
      setColorHistory((prev) => [color, ...prev.slice(0, 19)]) // Keep last 20 colors
    }
  }

  const copyToClipboard = async (text: string, format: string) => {
    await navigator.clipboard.writeText(text)
    toast({ title: "Kopyalandı!", description: `${format} formatı panoya kopyalandı.` })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = Math.min(img.width, 400)
        canvas.height = Math.min(img.height, 300)

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const imageData = ctx.getImageData(x, y, 1, 1)
    const [r, g, b] = imageData.data

    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    handleColorChange(hex)
  }

  const predefinedColors = [
    "#FF0000",
    "#FF8000",
    "#FFFF00",
    "#80FF00",
    "#00FF00",
    "#00FF80",
    "#00FFFF",
    "#0080FF",
    "#0000FF",
    "#8000FF",
    "#FF00FF",
    "#FF0080",
    "#800000",
    "#804000",
    "#808000",
    "#408000",
    "#008000",
    "#008040",
    "#008080",
    "#004080",
    "#000080",
    "#400080",
    "#800080",
    "#800040",
    "#000000",
    "#404040",
    "#808080",
    "#C0C0C0",
    "#FFFFFF",
  ]

  return (
    <ToolLayout title="Color Picker" description="Renk seçici ve paleti">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Renk Seçici</CardTitle>
                <CardDescription>Renginizi seçin ve farklı formatlarda görüntüleyin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="color-input">Renk Seçin</Label>
                    <div className="flex gap-4 items-center">
                      <input
                        id="color-input"
                        type="color"
                        value={selectedColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-20 h-20 rounded-lg border-2 border-muted cursor-pointer"
                      />
                      <div className="flex-1">
                        <Input
                          value={selectedColor}
                          onChange={(e) => handleColorChange(e.target.value)}
                          placeholder="#3b82f6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className="w-8 h-8 rounded border-2 border-muted hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Görselden Renk Seçimi</CardTitle>
                <CardDescription>Bir görsel yükleyip üzerinden renk seçin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Görsel Yükle
                      </span>
                    </Button>
                  </label>
                  <input
                    id="image-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    className="cursor-crosshair max-w-full"
                    style={{ display: "block" }}
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  <Eye className="h-4 w-4 inline mr-1" />
                  Görsel üzerine tıklayarak renk seçin
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Renk Formatları</CardTitle>
                <CardDescription>Seçilen rengin farklı formatlardaki değerleri</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="hex" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="hex">HEX</TabsTrigger>
                    <TabsTrigger value="rgb">RGB</TabsTrigger>
                    <TabsTrigger value="hsl">HSL</TabsTrigger>
                    <TabsTrigger value="hsv">HSV</TabsTrigger>
                    <TabsTrigger value="cmyk">CMYK</TabsTrigger>
                  </TabsList>

                  {Object.entries(colorFormats).map(([format, value]) => (
                    <TabsContent key={format} value={format} className="mt-4">
                      <div className="flex items-center gap-2">
                        <Input value={value} readOnly className="font-mono" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(value, format.toUpperCase())}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Renk Önizlemesi</CardTitle>
                <CardDescription>Seçilen rengin görünümü</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className="w-full h-32 rounded-lg border-2 border-muted"
                    style={{ backgroundColor: selectedColor }}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Beyaz Metin</Label>
                      <div
                        className="p-4 rounded text-white text-center font-medium"
                        style={{ backgroundColor: selectedColor }}
                      >
                        Örnek Metin
                      </div>
                    </div>
                    <div>
                      <Label>Siyah Metin</Label>
                      <div
                        className="p-4 rounded text-black text-center font-medium"
                        style={{ backgroundColor: selectedColor }}
                      >
                        Örnek Metin
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {colorHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Renk Geçmişi</CardTitle>
                  <CardDescription>Son seçilen renkler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-10 gap-2">
                    {colorHistory.map((color, index) => (
                      <button
                        key={`${color}-${index}`}
                        onClick={() => handleColorChange(color)}
                        className="w-8 h-8 rounded border-2 border-muted hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Renk Formatları Hakkında</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <strong>HEX:</strong> Web tasarımında en yaygın format (#RRGGBB)
              </div>
              <div>
                <strong>RGB:</strong> Kırmızı, Yeşil, Mavi değerleri (0-255)
              </div>
              <div>
                <strong>HSL:</strong> Ton, Doygunluk, Parlaklık değerleri
              </div>
              <div>
                <strong>HSV:</strong> Ton, Doygunluk, Değer (Brightness)
              </div>
              <div>
                <strong>CMYK:</strong> Baskı için kullanılan format
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kullanım Alanları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>• Web tasarımı ve CSS kodlama</div>
              <div>• Grafik tasarım projeleri</div>
              <div>• Marka rengi belirleme</div>
              <div>• UI/UX tasarım çalışmaları</div>
              <div>• Baskı tasarımları için renk seçimi</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
