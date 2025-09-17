"use client"

import type React from "react"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function JSONToCSV() {
  const { toast } = useToast()
  const [jsonInput, setJsonInput] = useState("")
  const [csvOutput, setCsvOutput] = useState("")
  const [error, setError] = useState("")

  const convertToCSV = () => {
    try {
      const data = JSON.parse(jsonInput)

      if (!Array.isArray(data)) {
        setError("JSON verisi bir dizi (array) olmalıdır")
        return
      }

      if (data.length === 0) {
        setError("JSON dizisi boş olamaz")
        return
      }

      // Get all unique keys from all objects
      const allKeys = new Set<string>()
      data.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          Object.keys(item).forEach((key) => allKeys.add(key))
        }
      })

      const headers = Array.from(allKeys)

      // Create CSV content
      let csv = headers.join(",") + "\n"

      data.forEach((item) => {
        const row = headers.map((header) => {
          const value = item[header]
          if (value === null || value === undefined) return ""

          // Handle strings with commas or quotes
          const stringValue = String(value)
          if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        })
        csv += row.join(",") + "\n"
      })

      setCsvOutput(csv)
      setError("")
    } catch (err) {
      setError("Geçersiz JSON formatı!")
      setCsvOutput("")
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(csvOutput)
    toast({ title: "Kopyalandı!", description: "CSV verisi panoya kopyalandı." })
  }

  const downloadAsFile = () => {
    const blob = new Blob([csvOutput], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "converted.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setJsonInput(content)
      }
      reader.readAsText(file)
    }
  }

  const loadSampleData = () => {
    const sampleJSON = JSON.stringify(
      [
        { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 },
      ],
      null,
      2,
    )
    setJsonInput(sampleJSON)
  }

  return (
    <ToolLayout title="JSON to CSV Converter" description="JSON verilerini CSV formatına dönüştürün">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={convertToCSV}>JSON'u CSV'ye Dönüştür</Button>
          <Button onClick={loadSampleData} variant="outline">
            Örnek Veri Yükle
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
              <CardDescription>Dönüştürülecek JSON dizisini girin</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
                rows={15}
                className="font-mono text-sm"
              />
              {error && <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">{error}</div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                CSV Çıktısı
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadAsFile}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Dönüştürülmüş CSV verisi</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={csvOutput}
                readOnly
                placeholder="CSV çıktısı burada görünecek..."
                rows={15}
                className="font-mono text-sm bg-muted"
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dönüştürme Kuralları</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• JSON verisi bir dizi (array) olmalıdır</p>
              <p>• Her dizi elemanı bir nesne (object) olmalıdır</p>
              <p>• Tüm nesnelerdeki anahtarlar CSV başlıkları olur</p>
              <p>• Eksik değerler boş hücre olarak gösterilir</p>
              <p>• Virgül içeren değerler tırnak içine alınır</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kullanım Alanları</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• API verilerini Excel'e aktarma</p>
              <p>• Veritabanı dışa aktarımları</p>
              <p>• Veri analizi için hazırlık</p>
              <p>• Raporlama ve görselleştirme</p>
              <p>• Toplu veri işleme</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
