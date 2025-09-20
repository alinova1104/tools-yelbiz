"use client"
import { useMemo, useState } from "react"
import { ToolLayout } from "@/components/ToolLayout"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Ajv from "ajv"

const ajv = new Ajv({ allErrors: true, strict: false })

export default function Page() {
  const [schema, setSchema] = useState("{\n  \"type\": \"object\",\n  \"properties\": { \"name\": { \"type\": \"string\" } },\n  \"required\": [\"name\"]\n}")
  const [data, setData] = useState("{\n  \"name\": \"John\"\n}")

  const { valid, errors } = useMemo(() => {
    try {
      const compiled = ajv.compile(JSON.parse(schema))
      const ok = compiled(JSON.parse(data))
      return { valid: !!ok, errors: compiled.errors || [] }
    } catch (e: any) {
      return { valid: false, errors: [{ message: e.message }] as any }
    }
  }, [schema, data])

  return (
    <ToolLayout title="JSON Schema Validator" description="JSON verinizi seçtiğiniz Schema'ya göre doğrulayın.">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>Schema</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea rows={16} value={schema} onChange={(e) => setSchema(e.target.value)} className="font-mono text-sm" />
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-white/10">
          <CardHeader>
            <CardTitle>Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea rows={16} value={data} onChange={(e) => setData(e.target.value)} className="font-mono text-sm" />
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle>Sonuç</CardTitle>
          </CardHeader>
          <CardContent>
            {valid ? (
              <div className="text-green-400 font-semibold">Geçerli ✔</div>
            ) : (
              <div className="space-y-2">
                <div className="text-red-400 font-semibold">Geçersiz ✗</div>
                {errors?.map((err: any, i: number) => (
                  <div key={i} className="text-sm text-muted-foreground">{err.instancePath || ""} {err.message}</div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}



