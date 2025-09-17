"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function URLEncoder() {
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const encodeURL = () => {
    try {
      const encoded = encodeURIComponent(input)
      setOutput(encoded)
    } catch (error) {
      toast({ title: "Hata!", description: "URL kodlanırken bir hata oluştu." })
    }
  }

  const decodeURL = () => {
    try {
      const decoded = decodeURIComponent(input)
      setOutput(decoded)
    } catch (error) {
      toast({ title: "Hata!", description: "URL çözülürken bir hata oluştu." })
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output)
    toast({ title: "Kopyalandı!", description: "Sonuç panoya kopyalandı." })
  }

  const swapInputOutput = () => {
    const temp = input
    setInput(output)
    setOutput(temp)
  }

  return (
    <ToolLayout title="URL Encoder/Decoder" description="URL'leri kodlayın ve çözümleyin">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="encode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">URL Encode</TabsTrigger>
            <TabsTrigger value="decode">URL Decode</TabsTrigger>
          </TabsList>

          <TabsContent value="encode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>URL Encoding</CardTitle>
                <CardDescription>Özel karakterleri URL-safe formata dönüştürün</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Kodlanacak Metin/URL</label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="https://example.com/search?q=hello world&lang=tr"
                    rows={4}
                  />
                </div>
                <Button onClick={encodeURL} className="w-full">
                  URL Encode Et
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>URL Decoding</CardTitle>
                <CardDescription>Kodlanmış URL'leri okunabilir formata dönüştürün</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Çözülecek URL</label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="https%3A//example.com/search%3Fq%3Dhello%20world%26lang%3Dtr"
                    rows={4}
                  />
                </div>
                <Button onClick={decodeURL} className="w-full">
                  URL Decode Et
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Sonuç
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={swapInputOutput}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={output} readOnly placeholder="Sonuç burada görünecek..." rows={4} className="bg-muted" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>URL Encoding Nedir?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>URL encoding, URL'lerde kullanılamayan özel karakterleri güvenli formata dönüştürme işlemidir.</p>
              <div>
                <strong>Yaygın Dönüşümler:</strong>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• Boşluk → %20</li>
                  <li>• & → %26</li>
                  <li>• ? → %3F</li>
                  <li>• = → %3D</li>
                  <li>• # → %23</li>
                  <li>• + → %2B</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kullanım Alanları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                • <strong>Form Verileri:</strong> POST/GET parametreleri
              </div>
              <div>
                • <strong>Arama Sorguları:</strong> Arama terimlerinde özel karakterler
              </div>
              <div>
                • <strong>API Çağrıları:</strong> URL parametrelerinde Türkçe karakterler
              </div>
              <div>
                • <strong>Dosya Adları:</strong> URL'de dosya adlarında boşluk
              </div>
              <div>
                • <strong>Sosyal Medya:</strong> Paylaşım URL'lerinde özel karakterler
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
