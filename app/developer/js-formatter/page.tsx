"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, Upload } from "lucide-react"

export default function JSFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const formatJS = () => {
    try {
      // Basic JavaScript formatter
      const formatted = input
        .replace(/;/g, ";\n")
        .replace(/{/g, " {\n")
        .replace(/}/g, "\n}\n")
        .replace(/,/g, ",\n")
        .split("\n")
        .map((line) => {
          const trimmed = line.trim()
          if (trimmed.includes("{") && !trimmed.includes("}")) {
            return trimmed
          }
          if (trimmed.includes("}")) {
            return trimmed
          }
          if (trimmed) {
            return "  " + trimmed
          }
          return trimmed
        })
        .join("\n")
        .replace(/\n\s*\n/g, "\n")

      setOutput(formatted)
    } catch (error) {
      setOutput("Geçersiz JavaScript formatı")
    }
  }

  const minifyJS = () => {
    try {
      const minified = input
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/.*$/gm, "")
        .replace(/\s+/g, " ")
        .replace(/;\s*}/g, "}")
        .replace(/\s*{\s*/g, "{")
        .replace(/;\s*/g, ";")
        .replace(/,\s*/g, ",")
        .trim()
      setOutput(minified)
    } catch (error) {
      setOutput("Geçersiz JavaScript formatı")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  const downloadFile = () => {
    const blob = new Blob([output], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.js"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setInput(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JavaScript Formatter</h1>
          <p className="text-xl text-muted-foreground">JavaScript kodlarınızı düzenleyin ve optimize edin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>JavaScript Girişi</CardTitle>
              <CardDescription>JavaScript kodunuzu buraya yapıştırın veya dosya yükleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={formatJS} className="flex-1">
                  Format
                </Button>
                <Button onClick={minifyJS} variant="outline" className="flex-1 bg-transparent">
                  Minify
                </Button>
                <label className="cursor-pointer">
                  <Button variant="outline" size="icon" asChild>
                    <span>
                      <Upload className="h-4 w-4" />
                    </span>
                  </Button>
                  <input type="file" accept=".js,.jsx" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="JavaScript kodunuzu buraya yapıştırın..."
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sonuç</CardTitle>
              <CardDescription>Formatlanmış JavaScript kodu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Kopyala
                </Button>
                <Button onClick={downloadFile} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  İndir
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                className="min-h-[400px] font-mono text-sm"
                placeholder="Formatlanmış JavaScript burada görünecek..."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
