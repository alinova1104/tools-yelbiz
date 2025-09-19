"use client"
import { useMemo, useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function analyze(text: string, minLen = 2) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9ğüşöçıİĞÜŞÖÇ\s]/gi, " ")
    .split(/\s+/)
    .filter(Boolean)

  const total = words.length
  const counts = new Map<string, number>()
  for (const w of words) {
    if (w.length < minLen) continue
    counts.set(w, (counts.get(w) || 0) + 1)
  }
  const items = Array.from(counts.entries())
    .map(([word, count]) => ({ word, count, density: total ? (count / total) * 100 : 0 }))
    .sort((a, b) => b.count - a.count)
  return { total, items }
}

export default function Page() {
  const [text, setText] = useState("")
  const [minLen, setMinLen] = useState(2)
  const { total, items } = useMemo(() => analyze(text, minLen), [text, minLen])

  return (
    <ToolLayout title="Keyword Density Analyzer" description="Metninizdeki kelime sıklığını ve yoğunluk oranlarını analiz edin.">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>Metin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} placeholder="Analiz etmek istediğiniz metni buraya yapıştırın" />
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Minimum kelime uzunluğu</span>
              <Input type="number" min={1} max={10} value={minLen} onChange={(e) => setMinLen(Number(e.target.value || 1))} className="w-24" />
              <span className="ml-auto text-sm text-muted-foreground">Toplam kelime: {total}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>Yoğunluk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {items.slice(0, 50).map(({ word, count, density }) => (
              <div key={word} className="flex items-center gap-4">
                <div className="w-32 shrink-0 font-medium">{word}</div>
                <div className="h-2 flex-1 bg-white/10 rounded">
                  <div className="h-full bg-gradient-hero rounded" style={{ width: `${Math.min(100, density)}%` }} />
                </div>
                <div className="w-24 text-right text-sm text-muted-foreground">{count} • {density.toFixed(1)}%</div>
              </div>
            ))}
            {!items.length && <div className="text-muted-foreground">Sonuç yok</div>}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}



