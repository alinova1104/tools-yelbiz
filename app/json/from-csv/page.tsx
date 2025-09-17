"use client"

import type React from "react"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CSVToJSON() {
  const { toast } = useToast()
  const [csvInput, setCsvInput] = useState("")
  const [jsonOutput, setJsonOutput] = useState("")
  const [error, setError] = useState("")

  const convertToJSON = () => {
    try {
      if (!csvInput.trim()) {
        setError("CSV verisi boş olamaz")
        return
      }

      const lines = csvInput.trim().split("\n")
      if (lines.length < 2) {
        setError("CSV en az başlık satırı ve bir veri satırı içermelidir")
        return
      }

      // Parse headers
      const headers = parseCSVLine(lines[0])

      // Parse data rows
      const data = []
      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i])
        if (values.length > 0) {
          const obj: any = {}
          headers.forEach((header, index) => {
            obj[header] = values[index] || ""
          })
          data.push(obj)
        }
      }

      const jsonString = JSON.stringify(data, null, 2)
      setJsonOutput(jsonString)
      setError("")
    } catch (err) {
      setError("CSV formatında hata var!")
      setJsonOutput("")
    }
  }

  const parseCSVLine = (line: string): string[] => {
    const result = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Escaped quote
          current += '"'
          i++ // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes
        }
      } else if (char === "," && !inQuotes) {
        // End of field
        result.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }

    // Add last field
    result.push(current.trim())
    return result
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(jsonOutput)
    toast({ title: "Kopyalandı!", description: "JSON verisi panoya kopyalandı." })
  }

  const downloadAsFile = () => {
    const blob = new Blob([jsonOutput], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "converted.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setCsvInput(content)
      }
      reader.readAsText(file)
    }
  }

  const loadSampleData = () => {
    const sampleCSV = `id,name,email,age
1,"John Doe",john@example.com,30
2,"Jane Smith",jane@example.com,25
3,"Bob Johnson",bob@example.com,35`
    setCsvInput(sampleCSV)
  }

  return (
    <ToolLayout title="CSV to JSON Converter" description="CSV verilerini JSON formatına dönüştürün">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={convertToJSON}>CSV'yi JSON'a Dönüştür</Button>
          <Button onClick={loadSampleData} variant="outline">
            Örnek Veri Yükle
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                CSV Girişi
                <div className="flex gap-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button size="sm" variant="outline" asChild>
                      <span>
                        <Upload className="h-4 w-4" />
                      </span>
                    </Button>
                  </label>
                  <input id="file-upload" type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                </div>
              </CardTitle>
              <CardDescription>Dönüştürülecek CSV verisini girin</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                placeholder={`id,name,email,age
1,"John Doe",john@example.com,30
2,"Jane Smith",jane@example.com,25`}
                rows={15}
                className="font-mono text-sm"
              />
              {error && <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">{error}</div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                JSON Çıktısı
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadAsFile}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Dönüştürülmüş JSON verisi</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={jsonOutput}
                readOnly
                placeholder="JSON çıktısı burada görünecek..."
                rows={15}
                className="font-mono text-sm bg-muted"
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>CSV Format Kuralları</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• İlk satır başlık satırı olmalıdır</p>
              <p>• Değerler virgülle ayrılmalıdır</p>
              <p>• Virgül içeren değerler tırnak içinde olmalıdır</p>
              <p>• Tırnak karakteri için çift tırnak kullanın ("")</p>
              <p>• Her satır aynı sayıda sütun içermelidir</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kullanım Alanları</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Excel verilerini API'ye gönderme</p>
              <p>• Veritabanı içe aktarımları</p>
              <p>• Web uygulamalarında veri işleme</p>
              <p>• Konfigürasyon dosyaları oluşturma</p>
              <p>• Veri migrasyonu işlemleri</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
