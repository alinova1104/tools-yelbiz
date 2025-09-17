"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

const timezones = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "Europe/Istanbul", label: "Istanbul (GMT+3)" },
  { value: "America/New_York", label: "New York (GMT-5)" },
  { value: "America/Los_Angeles", label: "Los Angeles (GMT-8)" },
  { value: "Europe/London", label: "London (GMT+0)" },
  { value: "Europe/Paris", label: "Paris (GMT+1)" },
  { value: "Asia/Tokyo", label: "Tokyo (GMT+9)" },
  { value: "Asia/Shanghai", label: "Shanghai (GMT+8)" },
  { value: "Australia/Sydney", label: "Sydney (GMT+11)" },
  { value: "America/Chicago", label: "Chicago (GMT-6)" },
]

export default function TimezoneConverterPage() {
  const [sourceTime, setSourceTime] = useState("")
  const [sourceTimezone, setSourceTimezone] = useState("Europe/Istanbul")
  const [targetTimezone, setTargetTimezone] = useState("America/New_York")
  const [convertedTime, setConvertedTime] = useState("")
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const updateCurrentTimes = () => {
      const now = new Date()
      const times: { [key: string]: string } = {}

      timezones.forEach((tz) => {
        try {
          times[tz.value] = now.toLocaleString("tr-TR", {
            timeZone: tz.value,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        } catch (error) {
          times[tz.value] = "Hata"
        }
      })

      setCurrentTimes(times)
    }

    updateCurrentTimes()
    const timer = setInterval(updateCurrentTimes, 1000)
    return () => clearInterval(timer)
  }, [])

  const convertTime = () => {
    if (!sourceTime) return

    try {
      // Create a date object from the input
      const inputDate = new Date(sourceTime)
      if (isNaN(inputDate.getTime())) {
        setConvertedTime("Geçersiz tarih formatı")
        return
      }

      // Convert to target timezone
      const converted = inputDate.toLocaleString("tr-TR", {
        timeZone: targetTimezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })

      setConvertedTime(converted)
    } catch (error) {
      setConvertedTime("Dönüşüm hatası")
    }
  }

  const setCurrentTime = () => {
    const now = new Date()
    const formatted = now.toISOString().slice(0, 16)
    setSourceTime(formatted)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Timezone Converter</h1>
          <p className="text-xl text-muted-foreground">Farklı zaman dilimlerinde saatleri dönüştürün</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Zaman Dönüştürücü</CardTitle>
              <CardDescription>Bir zaman diliminden diğerine dönüştürün</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Kaynak Zaman</Label>
                <div className="flex gap-2">
                  <Input
                    type="datetime-local"
                    value={sourceTime}
                    onChange={(e) => setSourceTime(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={setCurrentTime} variant="outline">
                    Şimdi
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Kaynak Zaman Dilimi</Label>
                <Select value={sourceTimezone} onValueChange={setSourceTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Hedef Zaman Dilimi</Label>
                <Select value={targetTimezone} onValueChange={setTargetTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={convertTime} className="w-full">
                Dönüştür
              </Button>

              {convertedTime && (
                <div className="space-y-2">
                  <Label>Sonuç</Label>
                  <Input value={convertedTime} readOnly />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Dünya Saatleri
              </CardTitle>
              <CardDescription>Farklı şehirlerdeki şu anki saatler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timezones.map((tz) => (
                  <div key={tz.value} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <span className="text-sm font-medium">{tz.label.split(" (")[0]}</span>
                    <span className="font-mono text-sm">{currentTimes[tz.value] || "Yükleniyor..."}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
