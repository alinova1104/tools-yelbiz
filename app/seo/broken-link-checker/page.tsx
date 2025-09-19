"use client"
import { useMemo, useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Result = { url: string; ok: boolean; status: number | null }

async function checkUrl(url: string): Promise<Result> {
  try {
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, { method: "HEAD", mode: "no-cors", signal: controller.signal as any })
    clearTimeout(t)
    // no-cors sonucu opaque ise status okunamaz; erişilebildi varsayıyoruz
    return { url, ok: true, status: (res as any).status || null }
  } catch {
    return { url, ok: false, status: null }
  }
}

export default function Page() {
  const [list, setList] = useState("")
  const [results, setResults] = useState<Result[]>([])
  const urls = useMemo(() => list.split(/\r?\n/).map(l => l.trim()).filter(Boolean), [list])

  async function run() {
    const out: Result[] = []
    for (const u of urls) {
      const full = /^https?:\/\//i.test(u) ? u : `https://${u}`
      // eslint-disable-next-line no-await-in-loop
      out.push(await checkUrl(full))
      setResults([...out])
    }
  }

  return (
    <ToolLayout title="Broken Link Checker" description="URL listesini tarayıp kırık bağlantıları tespit edin.">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>URL Listesi</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea rows={14} value={list} onChange={(e) => setList(e.target.value)} placeholder={`https://ornek.com\nhttps://ornek.com/404`} />
            <div className="mt-4 text-sm text-muted-foreground">Toplam: {urls.length}</div>
            <button onClick={run} className="mt-3 px-4 py-2 rounded-lg bg-gradient-hero">Tara</button>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>Sonuçlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[480px] overflow-auto">
            {results.map(r => (
              <div key={r.url} className="flex items-center justify-between border border-white/10 rounded-lg p-3">
                <div className="truncate mr-4" title={r.url}>{r.url}</div>
                <div className={r.ok ? "text-green-400" : "text-red-400"}>{r.ok ? (r.status ?? "OK") : (r.status ?? "ERR")}</div>
              </div>
            ))}
            {!results.length && <div className="text-muted-foreground">Henüz sonuç yok</div>}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}



