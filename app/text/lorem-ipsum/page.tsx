"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Download, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoremIpsumGenerator() {
  const { toast } = useToast()
  const [count, setCount] = useState(5)
  const [type, setType] = useState("paragraphs")
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState("")

  const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "reprehenderit",
    "in",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
    "at",
    "vero",
    "eos",
    "accusamus",
    "accusantium",
    "doloremque",
    "laudantium",
    "totam",
    "rem",
    "aperiam",
    "eaque",
    "ipsa",
    "quae",
    "ab",
    "illo",
    "inventore",
    "veritatis",
    "et",
    "quasi",
    "architecto",
    "beatae",
    "vitae",
    "dicta",
    "sunt",
    "explicabo",
    "nemo",
    "ipsam",
    "voluptatem",
    "quia",
    "voluptas",
    "aspernatur",
    "aut",
    "odit",
    "fugit",
    "sed",
    "quia",
    "consequuntur",
    "magni",
    "dolores",
    "ratione",
    "sequi",
    "nesciunt",
    "neque",
    "porro",
    "quisquam",
    "dolorem",
    "adipisci",
    "numquam",
    "eius",
    "modi",
    "tempora",
    "incidunt",
    "magnam",
    "quaerat",
  ]

  const generateWord = () => {
    return loremWords[Math.floor(Math.random() * loremWords.length)]
  }

  const generateSentence = (minWords = 4, maxWords = 18) => {
    const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords
    const words = []

    for (let i = 0; i < wordCount; i++) {
      words.push(generateWord())
    }

    // Capitalize first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)

    return words.join(" ") + "."
  }

  const generateParagraph = (minSentences = 3, maxSentences = 7) => {
    const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences
    const sentences = []

    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence())
    }

    return sentences.join(" ")
  }

  const generateLorem = () => {
    let result = ""

    switch (type) {
      case "words":
        const words = []
        for (let i = 0; i < count; i++) {
          words.push(generateWord())
        }
        if (startWithLorem && words.length > 0) {
          words[0] = "Lorem"
          if (words.length > 1) words[1] = "ipsum"
        }
        result = words.join(" ")
        break

      case "sentences":
        const sentences = []
        for (let i = 0; i < count; i++) {
          sentences.push(generateSentence())
        }
        if (startWithLorem && sentences.length > 0) {
          sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
        result = sentences.join(" ")
        break

      case "paragraphs":
        const paragraphs = []
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph())
        }
        if (startWithLorem && paragraphs.length > 0) {
          paragraphs[0] =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        }
        result = paragraphs.join("\n\n")
        break

      default:
        result = ""
    }

    setOutput(result)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output)
    toast({ title: "Kopyalandı!", description: "Lorem ipsum metni panoya kopyalandı." })
  }

  const downloadAsFile = () => {
    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "lorem-ipsum.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearOutput = () => {
    setOutput("")
  }

  return (
    <ToolLayout title="Lorem Ipsum Generator" description="Tasarım için örnek metin oluşturun">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Lorem Ipsum Ayarları</CardTitle>
            <CardDescription>Oluşturulacak metin türünü ve miktarını seçin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="count">Miktar</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(Number.parseInt(e.target.value) || 1)}
                />
              </div>

              <div>
                <Label htmlFor="type">Tür</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="words">Kelimeler</SelectItem>
                    <SelectItem value="sentences">Cümleler</SelectItem>
                    <SelectItem value="paragraphs">Paragraflar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="startWithLorem"
                  checked={startWithLorem}
                  onCheckedChange={(checked) => setStartWithLorem(checked as boolean)}
                />
                <Label htmlFor="startWithLorem" className="text-sm">
                  "Lorem ipsum" ile başla
                </Label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={generateLorem} className="flex-1">
                Lorem Ipsum Oluştur
              </Button>
              <Button onClick={clearOutput} variant="outline">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Oluşturulan Metin
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!output}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={downloadAsFile} disabled={!output}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              placeholder="Lorem ipsum metni burada görünecek..."
              rows={15}
              className="bg-muted"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Lorem Ipsum Nedir?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Lorem ipsum, basım ve dizgi endüstrisinde kullanılan standart sahte metindir.</p>
              <p>
                1500'lerden beri kullanılan bu metin, Cicero'nun "de Finibus Bonorum et Malorum" eserinden alınmıştır.
              </p>
              <p>İçeriğin dikkat dağıtmaması için anlamsız hale getirilmiş Latin metnidir.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kullanım Alanları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                • <strong>Web Tasarımı:</strong> Sayfa düzeni ve tipografi testleri
              </div>
              <div>
                • <strong>Grafik Tasarım:</strong> Broşür, poster, katalog tasarımları
              </div>
              <div>
                • <strong>Yazılım Geliştirme:</strong> UI/UX prototipleri
              </div>
              <div>
                • <strong>Basım:</strong> Dergi, kitap, gazete düzenleri
              </div>
              <div>
                • <strong>Sunum:</strong> PowerPoint ve demo içerikleri
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
