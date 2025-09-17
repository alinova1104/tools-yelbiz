"use client"

import type React from "react"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download, Upload, BarChart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function JSONMinifier() {
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0, percentage: 0 })

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError("")

      // Calculate statistics
      const originalSize = new Blob([input]).size
      const minifiedSize = new Blob([minified]).size
      const saved = originalSize - minifiedSize
      const percentage = originalSize > 0 ? Math.round((saved / originalSize) * 100) : 0

      setStats({
        original: originalSize,
        minified: minifiedSize,
        saved: saved,
        percentage: percentage,
      })
    } catch (err) {
      setError("Geçersiz JSON formatı!")
      setOutput("")
      setStats({ original: 0, minified: 0, saved: 0, percentage: 0 })
    }
  }

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError("")

      // Calculate statistics
      const originalSize = new Blob([input]).size
      const formattedSize = new Blob([formatted]).size
      const difference = formattedSize - originalSize
      const percentage = originalSize > 0 ? Math.round((difference / originalSize) * 100) : 0

      setStats({
        original: originalSize,
        minified: formattedSize,
        saved: -difference,
        percentage: -percentage,
      })
    } catch (err) {
      setError("Geçersiz JSON formatı!")
      setOutput("")
      setStats({ original: 0, minified: 0, saved: 0, percentage: 0 })
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
    a.download = "minified.json"
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

  const loadSampleData = () => {
    const sampleJSON = JSON.stringify(
      {
        users: [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            address: {
              street: "123 Main St",
              city: "New York",
              zipcode: "10001",
            },
            hobbies: ["reading", "swimming", "coding"],
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            address: {
              street: "456 Oak Ave",
              city: "Los Angeles",
              zipcode: "90210",
            },
            hobbies: ["painting", "hiking", "photography"],
          },
        ],
        metadata: {
          total: 2,
          created: "2024-01-01T00:00:00Z",
          version: "1.0",
        },
      },
      null,
      2,
    )
    setInput(sampleJSON)
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <ToolLayout title="JSON Minifier" description="JSON verilerinizi sıkıştırın ve boyutunu küçültün">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={minifyJSON}>JSON Minify</Button>
          <Button onClick={formatJSON} variant="outline">
            JSON Format
          </Button>
          <Button onClick={loadSampleData} variant="outline">
            Örnek Veri Yükle
          </Button>
        </div>

        {stats.original > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Dosya Boyutu İstatistikleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{formatBytes(stats.original)}</div>
                  <div className="text-sm text-muted-foreground">Orijinal Boyut</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{formatBytes(stats.minified)}</div>
                  <div className="text-sm text-muted-foreground">İşlenmiş Boyut</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stats.saved >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stats.saved >= 0 ? "-" : "+"}
                    {formatBytes(Math.abs(stats.saved))}
                  </div>
                  <div className="text-sm text-muted-foreground">Boyut Farkı</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stats.percentage >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stats.percentage >= 0 ? "-" : "+"}
                    {Math.abs(stats.percentage)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Yüzde Değişim</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
              <CardDescription>Sıkıştırılacak JSON verisini girin</CardDescription>
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
                İşlenmiş JSON
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadAsFile}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Sıkıştırılmış veya formatlanmış JSON</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={output}
                readOnly
                placeholder="İşlenmiş JSON burada görünecek..."
                rows={15}
                className="font-mono text-sm bg-muted"
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>JSON Minify Nedir?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                JSON minify, JSON dosyalarından gereksiz boşlukları, satır sonlarını ve girintileri kaldırarak dosya
                boyutunu küçültme işlemidir.
              </p>
              <p>
                <strong>Avantajları:</strong>
              </p>
              <ul className="ml-4 space-y-1">
                <li>• Daha hızlı veri transferi</li>
                <li>• Daha az bant genişliği kullanımı</li>
                <li>• Daha hızlı parsing</li>
                <li>• Depolama alanı tasarrufu</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kullanım Alanları</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                <strong>Production Ortamları:</strong>
              </p>
              <ul className="ml-4 space-y-1">
                <li>• API yanıtları</li>
                <li>• Konfigürasyon dosyaları</li>
                <li>• Web uygulaması verileri</li>
                <li>• CDN üzerinden servis edilen dosyalar</li>
              </ul>
              <p className="mt-3">
                <strong>Not:</strong> Development ortamında okunabilirlik için formatlanmış JSON tercih edilir.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
