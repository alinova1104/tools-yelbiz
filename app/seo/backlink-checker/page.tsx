"use client"
import { useMemo, useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Backlink = { url: string; anchor?: string; rel?: string; domain: string; pathDepth: number; hasQuery: boolean; follow: "dofollow" | "nofollow" }

function parseBacklinks(text: string): Backlink[] {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  const items: Backlink[] = []
  for (const line of lines) {
    const parts = line.split(/\t|\s{2,}\|?\s{2,}/).map(p => p.trim())
    const [rawUrl, anchor, rel] = [parts[0], parts[1], parts[2]]
    if (!rawUrl) continue
    try {
      const u = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`)
      const pathDepth = u.pathname.split("/").filter(Boolean).length
      items.push({
        url: u.toString(),
        anchor,
        rel,
        domain: u.hostname.replace(/^www\./, ""),
        pathDepth,
        hasQuery: !!u.search,
        follow: /(^|\s)nofollow(\s|$)/i.test(rel || "") ? "nofollow" : "dofollow",
      })
    } catch {
      // ignore invalid
    }
  }
  return items
}

export default function Page() {
  const [text, setText] = useState("")
  const [filter, setFilter] = useState("")
  const items = useMemo(() => parseBacklinks(text), [text])
  const filtered = useMemo(() => items.filter(i => (filter ? i.domain.includes(filter) || i.url.includes(filter) : true)), [items, filter])

  const stats = useMemo(() => {
    const uniqueDomains = new Set(filtered.map(i => i.domain)).size
    const dofollow = filtered.filter(i => i.follow === "dofollow").length
    const nofollow = filtered.length - dofollow
    const withQuery = filtered.filter(i => i.hasQuery).length
    const deep = filtered.filter(i => i.pathDepth >= 3).length
    return { total: filtered.length, uniqueDomains, dofollow, nofollow, withQuery, deep }
  }, [filtered])

  return (
    <ToolLayout title="Backlink Checker" description="Backlink listenizi içeri aktarın, alan adı ve kalite özetini görün.">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>Backlink Listesi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea rows={14} value={text} onChange={(e) => setText(e.target.value)} placeholder={`Her satıra bir backlink girin.\nFormat örnekleri:\nhttps://site.com/yazi-1\tAnchor\tnofollow\nhttps://diger.com/path/page Anchor dofollow`} />
            <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filtre (domain veya URL)" />
            <div className="text-sm text-muted-foreground">Toplam: {stats.total} • Unique domain: {stats.uniqueDomains} • Dofollow: {stats.dofollow} • Nofollow: {stats.nofollow} • Query parametreli: {stats.withQuery} • Derin (3+): {stats.deep}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>Özet ve Liste</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[480px] overflow-auto">
            {filtered.map(b => (
              <div key={b.url + (b.anchor || "")} className="border border-white/10 rounded-lg p-3 flex flex-col gap-1">
                <div className="text-sm break-all">
                  <span className="text-white/80">{b.url}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {b.anchor && <span>Anchor: <span className="text-white/80">{b.anchor}</span></span>}
                  <span>Domain: <span className="text-white/80">{b.domain}</span></span>
                  <span>Follow: <span className={b.follow === "dofollow" ? "text-green-400" : "text-yellow-300"}>{b.follow}</span></span>
                  {b.hasQuery && <span className="text-orange-300">query</span>}
                  {b.pathDepth >= 3 && <span className="text-blue-300">deep:{b.pathDepth}</span>}
                </div>
              </div>
            ))}
            {!filtered.length && <div className="text-muted-foreground">Liste boş</div>}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}



