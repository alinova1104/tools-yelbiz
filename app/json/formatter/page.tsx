"use client"

import type React from "react"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download, Upload, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function JSONFormatter() {
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError("")
    } catch (err) {
      setError("Geçersiz JSON formatı!")
      setOutput("")
    }
  }

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError("")
    } catch (err) {
      setError("Geçersiz JSON formatı!")
      setOutput("")
    }
  }

  const validateJSON = () => {
    try {
      JSON.parse(input)
      toast({ title: "Geçerli JSON!", description: "JSON formatı doğru." })
      setError("")
    } catch (err) {
      setError("Geçersiz JSON formatı!")
      toast({ title: "Geçersiz JSON!", description: "JSON formatında hata var." })
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output)
    toast({ title: "Kopyalandı!", description: "JSON panoya kopyalandı." })
  }

  const downloadAsFile = () => {
    const blob = new Blob([output], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.json"
    a.click()
    URL.revokeObjectURL(url)
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
    <ToolLayout title="JSON Formatter / Validator" description="JSON verilerinizi düzenleyin ve doğrulayın">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={formatJSON}>Format JSON</Button>
          <Button onClick={minifyJSON} variant="outline">
            Minify JSON
          </Button>
          <Button onClick={validateJSON} variant="outline">
            Validate JSON
          </Button>
          <Button onClick={clearAll} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Temizle
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                JSON Girişi
                <div className="flex gap-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button size="sm" variant="outline" asChild>
                      <span>
                        <Upload className="h-4 w-4" />
                      </span>
                    </Button>
                  </label>
                  <input id="file-upload" type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                </div>
              </CardTitle>
              <CardDescription>JSON verilerinizi buraya yapıştırın veya dosya yükleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name": "John", "age": 30, "city": "New York"}'
                rows={15}
                className="font-mono text-sm"
              />
              {error && <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">{error}</div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Formatlanmış JSON
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadAsFile}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Düzenlenmiş JSON çıktısı</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={output}
                readOnly
                placeholder="Formatlanmış JSON burada görünecek..."
                rows={15}
                className="font-mono text-sm bg-muted"
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>JSON Nedir?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>JSON (JavaScript Object Notation), veri alışverişi için kullanılan hafif bir format.</p>
              <p>İnsan tarafından okunabilir ve makineler tarafından kolayca işlenebilir.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Format vs Minify</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                <strong>Format:</strong> JSON'u okunabilir hale getirir (girintili)
              </p>
              <p>
                <strong>Minify:</strong> Gereksiz boşlukları kaldırır (sıkıştırılmış)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yaygın Hatalar</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Eksik virgül veya fazla virgül</p>
              <p>• Tek tırnak yerine çift tırnak kullanın</p>
              <p>• Son elemandan sonra virgül koymayın</p>
              <p>• Anahtar isimleri çift tırnak içinde olmalı</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
