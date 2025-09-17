"use client"

import type React from "react"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, RefreshCw, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Base64Tool() {
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const encodeBase64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
      setError("")
    } catch (err) {
      setError("Kodlama sırasında hata oluştu!")
      setOutput("")
    }
  }

  const decodeBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
      setError("")
    } catch (err) {
      setError("Geçersiz Base64 formatı!")
      setOutput("")
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
    setError("")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
      }
      reader.readAsText(file)
    }
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
    setError("")
  }

  return (
    <ToolLayout title="Base64 Encode/Decode" description="Metinleri Base64 formatına kodlayın/çözün">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="encode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Base64 Encode</TabsTrigger>
            <TabsTrigger value="decode">Base64 Decode</TabsTrigger>
          </TabsList>

          <TabsContent value="encode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Base64 Encoding</CardTitle>
                <CardDescription>Metni Base64 formatına kodlayın</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Kodlanacak Metin</label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Merhaba Dünya!"
                    rows={6}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={encodeBase64} className="flex-1">
                    Base64 Encode Et
                  </Button>
                  <label htmlFor="file-upload-encode" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="h-4 w-4" />
                      </span>
                    </Button>
                  </label>
                  <input
                    id="file-upload-encode"
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Base64 Decoding</CardTitle>
                <CardDescription>Base64 kodunu çözün</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Çözülecek Base64 Kodu</label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="TWVyaGFiYSBEw7xueWEh"
                    rows={6}
                  />
                </div>
                <Button onClick={decodeBase64} className="w-full">
                  Base64 Decode Et
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
                <Button size="sm" variant="outline" onClick={clearAll}>
                  Temizle
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              placeholder="Sonuç burada görünecek..."
              rows={6}
              className="bg-muted font-mono"
            />
            {error && <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">{error}</div>}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Base64 Nedir?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Base64, binary verileri ASCII karakterlerle temsil etmek için kullanılan bir kodlama yöntemidir.</p>
              <p>
                <strong>Karakterler:</strong> A-Z, a-z, 0-9, +, / (64 karakter)
              </p>
              <p>
                <strong>Padding:</strong> = karakteri ile tamamlanır
              </p>
              <p>Her 3 byte veri, 4 Base64 karakterine dönüştürülür.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kullanım Alanları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                • <strong>Email:</strong> Dosya ekleri (MIME)
              </div>
              <div>
                • <strong>Web:</strong> Data URL'leri (data:image/png;base64,...)
              </div>
              <div>
                • <strong>API:</strong> Binary veri transferi
              </div>
              <div>
                • <strong>Konfigürasyon:</strong> Binary verilerin metin formatında saklanması
              </div>
              <div>
                • <strong>Güvenlik:</strong> Basit veri gizleme (şifreleme değil!)
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
