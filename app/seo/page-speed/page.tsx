"use client"
import { useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type PsiResult = {
  lighthouseResult?: {
    categories?: { performance?: { score?: number } }
    audits?: Record<string, { title: string; score?: number; displayValue?: string }>
  }
}

export default function Page() {
  const [url, setUrl] = useState("")
  const [data, setData] = useState<PsiResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function run() {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile`
      const res = await fetch(endpoint)
      const json = (await res.json()) as PsiResult
      setData(json)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const perf = data?.lighthouseResult?.categories?.performance?.score
  const audits = data?.lighthouseResult?.audits || {}

  return (
    <ToolLayout title="Page Speed Insights" description="Google PSI ile performans skorunu ve temel metrikleri görüntüleyin.">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://ornek.com" />
            <Button onClick={run} disabled={!url || loading}>{loading ? "Analiz ediliyor..." : "Analiz Et"}</Button>
            {typeof perf === "number" && (
              <div>
                <div className="text-sm text-muted-foreground">Performance</div>
                <div className="text-2xl font-bold">{Math.round(perf * 100)}</div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-gradient-hero" style={{ width: `${Math.round(perf * 100)}%` }} />
                </div>
              </div>
            )}
            {error && <div className="text-red-400 text-sm">{error}</div>}
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>Öne Çıkan Metrikler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(audits)
              .filter(([key]) => ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"].includes(key))
              .map(([key, a]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="text-sm">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.displayValue || (typeof a.score === "number" ? Math.round(a.score * 100) : "-")}</div>
                </div>
              ))}
            {!Object.keys(audits).length && <div className="text-muted-foreground">Henüz veri yok</div>}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}



