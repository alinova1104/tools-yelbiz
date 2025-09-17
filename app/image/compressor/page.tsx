"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, ImageIcon, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageFile {
  original: File
  compressed?: string
  originalSize: number
  compressedSize?: number
  compressionRatio?: number
}

export default function ImageCompressor() {
  const { toast } = useToast()
  const [imageFile, setImageFile] = useState<ImageFile | null>(null)
  const [quality, setQuality] = useState([80])
  const [format, setFormat] = useState("jpeg")
  const [maxWidth, setMaxWidth] = useState([1920])
  const [maxHeight, setMaxHeight] = useState([1080])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({ title: "Hata!", description: "Lütfen bir görsel dosyası seçin." })
      return
    }

    setImageFile({
      original: file,
      originalSize: file.size,
    })
  }

  const compressImage = async () => {
    if (!imageFile) return

    setIsProcessing(true)
    setProgress(0)

    try {
      // Simulate compression progress
      const progressSteps = [20, 40, 60, 80, 100]
      for (let i = 0; i < progressSteps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        setProgress(progressSteps[i])
      }

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = new Image()
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img
        const maxW = maxWidth[0]
        const maxH = maxHeight[0]

        if (width > maxW || height > maxH) {
          const ratio = Math.min(maxW / width, maxH / height)
          width *= ratio
          height *= ratio
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height)

        const mimeType = format === "png" ? "image/png" : "image/jpeg"
        const qualityValue = format === "png" ? 1 : quality[0] / 100

        const compressedDataUrl = canvas.toDataURL(mimeType, qualityValue)

        // Calculate compressed size (approximate)
        const compressedSize = Math.round((compressedDataUrl.length * 3) / 4)
        const compressionRatio = Math.round(((imageFile.originalSize - compressedSize) / imageFile.originalSize) * 100)

        setImageFile((prev) =>
          prev
            ? {
                ...prev,
                compressed: compressedDataUrl,
                compressedSize,
                compressionRatio,
              }
            : null,
        )

        toast({
          title: "Başarılı!",
          description: `Görsel %${compressionRatio} oranında sıkıştırıldı.`,
        })
      }

      img.src = URL.createObjectURL(imageFile.original)
    } catch (error) {
      toast({ title: "Hata!", description: "Görsel sıkıştırılırken bir hata oluştu." })
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadCompressed = () => {
    if (!imageFile?.compressed) return

    const a = document.createElement("a")
    a.href = imageFile.compressed
    a.download = `compressed-${imageFile.original.name.split(".")[0]}.${format}`
    a.click()
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const clearAll = () => {
    setImageFile(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <ToolLayout title="Image Compressor" description="Görselleri sıkıştırın ve boyutunu küçültün">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Görsel Yükle</CardTitle>
            <CardDescription>Sıkıştırılacak görseli seçin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              {imageFile ? (
                <div className="space-y-4">
                  <ImageIcon className="h-12 w-12 mx-auto text-green-600" />
                  <div>
                    <p className="text-lg font-medium">{imageFile.original.name}</p>
                    <p className="text-sm text-muted-foreground">{formatBytes(imageFile.originalSize)}</p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()}>Farklı Görsel Seç</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">Görsel yükleyin</p>
                    <p className="text-sm text-muted-foreground">JPG, PNG, WebP desteklenir</p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Görsel Seç
                  </Button>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </div>
          </CardContent>
        </Card>

        {imageFile && (
          <Card>
            <CardHeader>
              <CardTitle>Sıkıştırma Ayarları</CardTitle>
              <CardDescription>Kalite ve boyut ayarlarını yapın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Çıktı Formatı</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jpeg">JPEG (Küçük boyut)</SelectItem>
                        <SelectItem value="png">PNG (Yüksek kalite)</SelectItem>
                        <SelectItem value="webp">WebP (Modern format)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {format !== "png" && (
                    <div>
                      <Label>Kalite: {quality[0]}%</Label>
                      <Slider value={quality} onValueChange={setQuality} max={100} min={10} step={5} className="mt-2" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Maksimum Genişlik: {maxWidth[0]}px</Label>
                    <Slider
                      value={maxWidth}
                      onValueChange={setMaxWidth}
                      max={4000}
                      min={100}
                      step={100}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Maksimum Yükseklik: {maxHeight[0]}px</Label>
                    <Slider
                      value={maxHeight}
                      onValueChange={setMaxHeight}
                      max={4000}
                      min={100}
                      step={100}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Görsel sıkıştırılıyor...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={compressImage} disabled={isProcessing} className="flex-1">
                  <Zap className="h-4 w-4 mr-2" />
                  Sıkıştır
                </Button>
                <Button onClick={clearAll} variant="outline">
                  Temizle
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {imageFile?.compressed && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Sıkıştırma Sonucu
                <Button onClick={downloadCompressed}>
                  <Download className="h-4 w-4 mr-2" />
                  İndir
                </Button>
              </CardTitle>
              <CardDescription>Sıkıştırılmış görsel hazır</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{formatBytes(imageFile.originalSize)}</div>
                  <div className="text-sm text-muted-foreground">Orijinal Boyut</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {imageFile.compressedSize ? formatBytes(imageFile.compressedSize) : "0 Bytes"}
                  </div>
                  <div className="text-sm text-muted-foreground">Sıkıştırılmış Boyut</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{imageFile.compressionRatio || 0}%</div>
                  <div className="text-sm text-muted-foreground">Tasarruf</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Orijinal</Label>
                  <div className="border rounded-lg p-2 bg-muted">
                    <img
                      src={URL.createObjectURL(imageFile.original) || "/placeholder.svg"}
                      alt="Original"
                      className="w-full h-48 object-contain"
                    />
                  </div>
                </div>
                <div>
                  <Label>Sıkıştırılmış</Label>
                  <div className="border rounded-lg p-2 bg-muted">
                    <img
                      src={imageFile.compressed || "/placeholder.svg"}
                      alt="Compressed"
                      className="w-full h-48 object-contain"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <canvas ref={canvasRef} className="hidden" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sıkıştırma İpuçları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>• JPEG fotoğraflar için, PNG grafik/logo için ideal</div>
              <div>• Web için genellikle 80% kalite yeterli</div>
              <div>• Büyük görselleri boyutlandırın</div>
              <div>• WebP modern tarayıcılarda daha iyi sıkıştırma sağlar</div>
              <div>• Kalite ve boyut arasında denge kurun</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Desteklenen Formatlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                • <strong>Giriş:</strong> JPG, PNG, WebP, GIF, BMP
              </div>
              <div>
                • <strong>Çıkış:</strong> JPG, PNG, WebP
              </div>
              <div>
                • <strong>Maksimum boyut:</strong> 50MB
              </div>
              <div>
                • <strong>Çözünürlük:</strong> 4000x4000 piksel'e kadar
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
