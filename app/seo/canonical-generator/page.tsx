"use client"
import { useMemo, useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function normalize(url: string) {
  let u = url.trim()
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`
  try {
    const parsed = new URL(u)
    parsed.hash = ""
    // trailing slash policy: keep root slash, drop others
    if (parsed.pathname !== "/") parsed.pathname = parsed.pathname.replace(/\/$/, "")
    return parsed.toString()
  } catch {
    return url
  }
}

export default function Page() {
  const [url, setUrl] = useState("")
  const canonical = useMemo(() => normalize(url), [url])
  const tag = canonical ? `<link rel="canonical" href="${canonical}" />` : ""

  return (
    <ToolLayout title="Canonical URL Generator" description="Sayfanız için doğru canonical etiketi oluşturun.">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://ornek.com/yazi" />
            <div className="text-sm text-muted-foreground">Normalize edilmiş: <span className="text-white">{canonical || "-"}</span></div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>Canonical Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-black/40 p-4 rounded-lg text-xs overflow-auto">{tag || "<link rel=\"canonical\" href=\"\" />"}</pre>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}



