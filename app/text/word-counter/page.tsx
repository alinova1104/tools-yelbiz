"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Upload, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WordCounter() {
  const { toast } = useToast()
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: 0,
    speakingTime: 0,
  })

  useEffect(() => {
    calculateStats(text)
  }, [text])

  const calculateStats = (input: string) => {
    const characters = input.length
    const charactersNoSpaces = input.replace(/\s/g, "").length

    // Words
    const words = input.trim() === "" ? 0 : input.trim().split(/\s+/).length

    // Sentences
    const sentences = input.trim() === "" ? 0 : input.split(/[.!?]+/).filter((s) => s.trim().length > 0).length

    // Paragraphs
    const paragraphs = input.trim() === "" ? 0 : input.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length

    // Lines
    const lines = input === "" ? 0 : input.split("\n").length

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200)

    // Speaking time (average 150 words per minute)
    const speakingTime = Math.ceil(words / 150)

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
    })
  }

  const copyStats = async () => {
    const statsText = `
Metin İstatistikleri:
- Karakterler: ${stats.characters}
- Karakterler (boşluksuz): ${stats.charactersNoSpaces}
- Kelimeler: ${stats.words}
- Cümleler: ${stats.sentences}
- Paragraflar: ${stats.paragraphs}
- Satırlar: ${stats.lines}
- Okuma süresi: ${stats.readingTime} dakika
- Konuşma süresi: ${stats.speakingTime} dakika
    `.trim()

    await navigator.clipboard.writeText(statsText)
    toast({ title: "Kopyalandı!", description: "İstatistikler panoya kopyalandı." })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setText(content)
      }
      reader.readAsText(file)
    }
  }

  const loadSampleText = () => {
    const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`
    setText(sampleText)
  }

  const clearText = () => {
    setText("")
  }

  return (
    <ToolLayout title="Word & Character Counter" description="Kelime ve karakter sayısını hesaplayın">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={loadSampleText} variant="outline">
            Örnek Metin Yükle
          </Button>
          <Button onClick={clearText} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Temizle
          </Button>
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Dosya Yükle
              </span>
            </Button>
          </label>
          <input id="file-upload" type="file" accept=".txt,.md" onChange={handleFileUpload} className="hidden" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Metin Girişi</CardTitle>
                <CardDescription>Analiz edilecek metni buraya yazın veya yapıştırın</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Metninizi buraya yazın..."
                  rows={20}
                  className="resize-none"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Temel İstatistikler
                  <Button size="sm" variant="outline" onClick={copyStats}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.characters.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Karakterler</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.charactersNoSpaces.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Boşluksuz</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{stats.words.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Kelimeler</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{stats.sentences.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Cümleler</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yapı İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Paragraflar:</span>
                  <span className="font-semibold">{stats.paragraphs}</span>
                </div>
                <div className="flex justify-between">
                  <span>Satırlar:</span>
                  <span className="font-semibold">{stats.lines}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ortalama kelime/cümle:</span>
                  <span className="font-semibold">
                    {stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Ortalama karakter/kelime:</span>
                  <span className="font-semibold">
                    {stats.words > 0 ? Math.round(stats.charactersNoSpaces / stats.words) : 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zaman Tahminleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Okuma süresi:</span>
                  <span className="font-semibold">{stats.readingTime} dakika</span>
                </div>
                <div className="flex justify-between">
                  <span>Konuşma süresi:</span>
                  <span className="font-semibold">{stats.speakingTime} dakika</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  * Okuma: 200 kelime/dakika
                  <br />* Konuşma: 150 kelime/dakika
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Kullanım Alanları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                • <strong>İçerik Yazımı:</strong> Blog yazıları, makaleler
              </div>
              <div>
                • <strong>Sosyal Medya:</strong> Karakter sınırları kontrolü
              </div>
              <div>
                • <strong>Akademik:</strong> Makale ve tez yazımı
              </div>
              <div>
                • <strong>SEO:</strong> Meta açıklama uzunluğu
              </div>
              <div>
                • <strong>Çeviri:</strong> Kelime sayısına dayalı fiyatlandırma
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İpuçları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>• Blog yazıları genelde 300-2000 kelime arası</div>
              <div>• Twitter: 280 karakter sınırı</div>
              <div>• Meta açıklama: 150-160 karakter</div>
              <div>• Email konu: 50 karakter altı önerilir</div>
              <div>• Ortalama okuma hızı: 200-250 kelime/dakika</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
