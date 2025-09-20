"use client"
import { useMemo, useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type RuleResult = { name: string; passed: boolean; hint?: string }

function analyzeUrl(raw: string): { score: number; results: RuleResult[]; normalized: string } {
  const url = raw.trim()
  const results: RuleResult[] = []

  const normalized = url
    .replace(/\s+/g, "-")
    .replace(/_{2,}/g, "-")
    .replace(/[^a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]/g, "")

  const path = (() => {
    try {
      const u = new URL(normalized.startsWith("http") ? normalized : `https://${normalized}`)
      return u.pathname
    } catch {
      return normalized
    }
  })()

  const segments = path.split("/").filter(Boolean)

  const rules: Array<() => RuleResult> = [
    () => ({ name: "Boş değil", passed: url.length > 0 }),
    () => ({ name: "Geçerli URL/Path", passed: /^([a-z]+:\/\/)?[\w.-]+(\/.*)?$/i.test(normalized) }),
    () => ({ name: "Küçük harf", passed: normalized === normalized.toLowerCase(), hint: "Tüm karakterleri küçük yapın" }),
    () => ({ name: "Boşluk yok", passed: !/\s/.test(url), hint: "Boşluk yerine tire (-) kullanın" }),
    () => ({ name: "Alt çizgi yok", passed: !/_/.test(path), hint: "_ yerine - kullanın" }),
    () => ({ name: "Kısa uzunluk", passed: normalized.length <= 115, hint: "115 karakterden kısa tutun" }),
    () => ({ name: "Dinamik id yok", passed: !/(^|\/)\d{8,}(\/|$)/.test(path), hint: "Uzun sayısal id'leri kaldırın" }),
    () => ({ name: "Anlamlı segmentler", passed: segments.every(s => s.length >= 2 && !/^.{1}$/.test(s)), hint: "Tek harfli segmentlerden kaçının" }),
    () => ({ name: "Uzantı yok", passed: !/\.(php|aspx?|jsp|html?)$/i.test(path), hint: "Dosya uzantısı kullanmayın" }),
    () => ({ name: "Tire kullanımı", passed: !/--/.test(path), hint: "Ardışık iki tireyi tek tire yapın" }),
  ]

  results.push(...rules.map(r => r()))
  const passed = results.filter(r => r.passed).length
  const score = Math.round((passed / results.length) * 100)
  return { score, results, normalized }
}

export default function Page() {
  const [input, setInput] = useState("")
  const { score, results, normalized } = useMemo(() => analyzeUrl(input), [input])

  return (
    <ToolLayout title="SEO Friendly URL Checker" description="URL'lerinizin SEO uyumluluğunu kontrol edin ve önerileri görün.">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="https://ornek.com/kategori/ornek-icerik" />
            {input && input !== normalized && (
              <div className="text-sm text-muted-foreground">Önerilen: <span className="text-white">{normalized}</span></div>
            )}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Skor</div>
              <div className="text-lg font-bold">{score}</div>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-hero" style={{ width: `${score}%` }} />
            </div>
            <Button onClick={() => setInput(normalized)} disabled={!input || input === normalized} variant="outline">
              Önerilen URL'yi uygula
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>Kurallar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {results.map(r => (
              <div key={r.name} className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{r.name}</div>
                  {!r.passed && r.hint && <div className="text-sm text-muted-foreground">{r.hint}</div>}
                </div>
                <div className={r.passed ? "text-green-400" : "text-red-400"}>{r.passed ? "✓" : "✗"}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}



