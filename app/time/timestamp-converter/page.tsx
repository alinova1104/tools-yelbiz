"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Copy } from "lucide-react"

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const convertToDate = () => {
    try {
      const ts = Number.parseInt(timestamp)
      if (isNaN(ts)) return

      const date = new Date(ts * 1000)
      setDateTime(date.toLocaleString("tr-TR"))
    } catch (error) {
      setDateTime("Geçersiz timestamp")
    }
  }

  const convertToTimestamp = () => {
    try {
      const date = new Date(dateTime)
      if (isNaN(date.getTime())) return

      setTimestamp(Math.floor(date.getTime() / 1000).toString())
    } catch (error) {
      setTimestamp("Geçersiz tarih")
    }
  }

  const getCurrentTimestamp = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString())
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Timestamp Converter</h1>
          <p className="text-xl text-muted-foreground">Unix timestamp ile tarih arasında dönüşüm yapın</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Şu Anki Zaman
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <Label>Tarih & Saat</Label>
                <div className="text-lg font-mono mt-1">{currentTime.toLocaleString("tr-TR")}</div>
              </div>
              <div>
                <Label>Unix Timestamp</Label>
                <div className="text-lg font-mono mt-1">{Math.floor(currentTime.getTime() / 1000)}</div>
              </div>
              <div>
                <Label>ISO 8601</Label>
                <div className="text-lg font-mono mt-1">{currentTime.toISOString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="to-date" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="to-date">Timestamp → Tarih</TabsTrigger>
            <TabsTrigger value="to-timestamp">Tarih → Timestamp</TabsTrigger>
          </TabsList>

          <TabsContent value="to-date">
            <Card>
              <CardHeader>
                <CardTitle>Timestamp'i Tarihe Çevir</CardTitle>
                <CardDescription>Unix timestamp'ini okunabilir tarihe dönüştürün</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timestamp">Unix Timestamp</Label>
                  <div className="flex gap-2">
                    <Input
                      id="timestamp"
                      value={timestamp}
                      onChange={(e) => setTimestamp(e.target.value)}
                      placeholder="1640995200"
                      className="flex-1"
                    />
                    <Button onClick={convertToDate}>Çevir</Button>
                    <Button onClick={getCurrentTimestamp} variant="outline">
                      Şimdi
                    </Button>
                  </div>
                </div>
                {dateTime && (
                  <div className="space-y-2">
                    <Label>Sonuç</Label>
                    <div className="flex gap-2">
                      <Input value={dateTime} readOnly className="flex-1" />
                      <Button onClick={() => copyToClipboard(dateTime)} variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="to-timestamp">
            <Card>
              <CardHeader>
                <CardTitle>Tarihi Timestamp'e Çevir</CardTitle>
                <CardDescription>Tarihi Unix timestamp'ine dönüştürün</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="datetime">Tarih & Saat</Label>
                  <div className="flex gap-2">
                    <Input
                      id="datetime"
                      type="datetime-local"
                      value={dateTime}
                      onChange={(e) => setDateTime(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={convertToTimestamp}>Çevir</Button>
                  </div>
                </div>
                {timestamp && (
                  <div className="space-y-2">
                    <Label>Sonuç</Label>
                    <div className="flex gap-2">
                      <Input value={timestamp} readOnly className="flex-1" />
                      <Button onClick={() => copyToClipboard(timestamp)} variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
