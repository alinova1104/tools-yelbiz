"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Download, RefreshCw, QrCode } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QRGenerator() {
  const { toast } = useToast()
  const [text, setText] = useState("")
  const [size, setSize] = useState([200])
  const [errorLevel, setErrorLevel] = useState("M")
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  const generateQRCode = () => {
    if (!text.trim()) {
      toast({ title: "Hata!", description: "QR kod için metin girmelisiniz." })
      return
    }

    // Using QR Server API for generating QR codes
    const encodedText = encodeURIComponent(text)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size[0]}x${size[0]}&data=${encodedText}&ecc=${errorLevel}`
    setQrCodeUrl(qrUrl)
  }

  const downloadQRCode = async () => {
    if (!qrCodeUrl) return

    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "qrcode.png"
      a.click()
      URL.revokeObjectURL(url)
      toast({ title: "İndirildi!", description: "QR kod başarıyla indirildi." })
    } catch (error) {
      toast({ title: "Hata!", description: "QR kod indirilemedi." })
    }
  }

  const clearAll = () => {
    setText("")
    setQrCodeUrl("")
  }

  const loadSampleData = (type: string) => {
    const samples = {
      url: "https://www.example.com",
      email: "mailto:info@example.com",
      phone: "tel:+905551234567",
      sms: "sms:+905551234567?body=Merhaba!",
      wifi: "WIFI:T:WPA;S:MyNetwork;P:MyPassword;;",
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:Example Company
TEL:+905551234567
EMAIL:john@example.com
URL:https://www.example.com
END:VCARD`,
      location: "geo:41.0082,28.9784?q=Istanbul,Turkey",
    }
    setText(samples[type as keyof typeof samples] || "")
  }

  return (
    <ToolLayout title="QR Code Generator" description="Metin, URL ve diğer veriler için QR kod oluşturun">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QR Kod Ayarları</CardTitle>
                <CardDescription>QR kodunuz için içerik ve ayarları belirleyin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="text">İçerik</Label>
                  <Textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="QR koda dönüştürülecek metin, URL veya veri..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>
                    Boyut: {size[0]}x{size[0]} piksel
                  </Label>
                  <Slider value={size} onValueChange={setSize} max={500} min={100} step={50} className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="errorLevel">Hata Düzeltme Seviyesi</Label>
                  <Select value={errorLevel} onValueChange={setErrorLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">L - Düşük (~7%)</SelectItem>
                      <SelectItem value="M">M - Orta (~15%)</SelectItem>
                      <SelectItem value="Q">Q - Yüksek (~25%)</SelectItem>
                      <SelectItem value="H">H - En Yüksek (~30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={generateQRCode} className="flex-1">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Kod Oluştur
                  </Button>
                  <Button onClick={clearAll} variant="outline">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hızlı Şablonlar</CardTitle>
                <CardDescription>Yaygın kullanım örnekleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" onClick={() => loadSampleData("url")}>
                    Web Sitesi
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => loadSampleData("email")}>
                    E-posta
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => loadSampleData("phone")}>
                    Telefon
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => loadSampleData("sms")}>
                    SMS
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => loadSampleData("wifi")}>
                    WiFi
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => loadSampleData("vcard")}>
                    vCard
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => loadSampleData("location")}>
                    Konum
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Oluşturulan QR Kod
                  <Button size="sm" variant="outline" onClick={downloadQRCode} disabled={!qrCodeUrl}>
                    <Download className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <CardDescription>QR kodunuz burada görünecek</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center min-h-[300px] bg-muted rounded-lg">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl || "/placeholder.svg"}
                      alt="Generated QR Code"
                      className="max-w-full max-h-full"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>QR kod burada görünecek</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>QR Kod İpuçları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>Boyut:</strong> Yazdırma için en az 200x200 piksel önerilir
                </div>
                <div>
                  <strong>Hata Düzeltme:</strong> Yüksek seviye, hasarlı kodları okuyabilir
                </div>
                <div>
                  <strong>Test:</strong> Farklı cihazlarda QR kodu test edin
                </div>
                <div>
                  <strong>Kontrast:</strong> Koyu zemin üzerine açık kod kullanın
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>QR Kod Formatları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <strong>URL:</strong> https://example.com
              </div>
              <div>
                <strong>E-posta:</strong> mailto:user@example.com
              </div>
              <div>
                <strong>Telefon:</strong> tel:+905551234567
              </div>
              <div>
                <strong>SMS:</strong> sms:+905551234567?body=Mesaj
              </div>
              <div>
                <strong>WiFi:</strong> WIFI:T:WPA;S:NetworkName;P:Password;;
              </div>
              <div>
                <strong>Konum:</strong> geo:latitude,longitude
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kullanım Alanları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>• Restoran menüleri ve fiyat listeleri</div>
              <div>• Etkinlik biletleri ve davetiyeler</div>
              <div>• Ürün bilgileri ve web siteleri</div>
              <div>• WiFi şifre paylaşımı</div>
              <div>• İletişim bilgileri (vCard)</div>
              <div>• Sosyal medya profilleri</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
