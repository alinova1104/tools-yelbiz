"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Minus } from "lucide-react"

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [difference, setDifference] = useState("")

  const [baseDate, setBaseDate] = useState("")
  const [addValue, setAddValue] = useState("")
  const [addUnit, setAddUnit] = useState("days")
  const [resultDate, setResultDate] = useState("")

  const calculateDifference = () => {
    if (!startDate || !endDate) return

    try {
      const start = new Date(startDate)
      const end = new Date(endDate)

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setDifference("Geçersiz tarih")
        return
      }

      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const diffWeeks = Math.floor(diffDays / 7)
      const diffMonths = Math.floor(diffDays / 30.44)
      const diffYears = Math.floor(diffDays / 365.25)

      setDifference(`
        ${diffDays} gün
        ${diffWeeks} hafta
        ${diffMonths} ay
        ${diffYears} yıl
      `)
    } catch (error) {
      setDifference("Hesaplama hatası")
    }
  }

  const addToDate = () => {
    if (!baseDate || !addValue) return

    try {
      const base = new Date(baseDate)
      if (isNaN(base.getTime())) {
        setResultDate("Geçersiz tarih")
        return
      }

      const value = Number.parseInt(addValue)
      if (isNaN(value)) {
        setResultDate("Geçersiz sayı")
        return
      }

      const result = new Date(base)

      switch (addUnit) {
        case "days":
          result.setDate(result.getDate() + value)
          break
        case "weeks":
          result.setDate(result.getDate() + value * 7)
          break
        case "months":
          result.setMonth(result.getMonth() + value)
          break
        case "years":
          result.setFullYear(result.getFullYear() + value)
          break
        case "hours":
          result.setHours(result.getHours() + value)
          break
        case "minutes":
          result.setMinutes(result.getMinutes() + value)
          break
      }

      setResultDate(result.toLocaleString("tr-TR"))
    } catch (error) {
      setResultDate("Hesaplama hatası")
    }
  }

  const subtractFromDate = () => {
    if (!baseDate || !addValue) return

    try {
      const base = new Date(baseDate)
      if (isNaN(base.getTime())) {
        setResultDate("Geçersiz tarih")
        return
      }

      const value = Number.parseInt(addValue)
      if (isNaN(value)) {
        setResultDate("Geçersiz sayı")
        return
      }

      const result = new Date(base)

      switch (addUnit) {
        case "days":
          result.setDate(result.getDate() - value)
          break
        case "weeks":
          result.setDate(result.getDate() - value * 7)
          break
        case "months":
          result.setMonth(result.getMonth() - value)
          break
        case "years":
          result.setFullYear(result.getFullYear() - value)
          break
        case "hours":
          result.setHours(result.getHours() - value)
          break
        case "minutes":
          result.setMinutes(result.getMinutes() - value)
          break
      }

      setResultDate(result.toLocaleString("tr-TR"))
    } catch (error) {
      setResultDate("Hesaplama hatası")
    }
  }

  const setToday = (setter: (value: string) => void) => {
    const today = new Date().toISOString().split("T")[0]
    setter(today)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Date Calculator</h1>
          <p className="text-xl text-muted-foreground">Tarihler arası fark hesaplama ve tarih ekleme/çıkarma</p>
        </div>

        <Tabs defaultValue="difference" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="difference">Tarih Farkı</TabsTrigger>
            <TabsTrigger value="add-subtract">Tarih Ekleme/Çıkarma</TabsTrigger>
          </TabsList>

          <TabsContent value="difference">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Tarihler Arası Fark
                </CardTitle>
                <CardDescription>İki tarih arasındaki farkı hesaplayın</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Başlangıç Tarihi</Label>
                    <div className="flex gap-2">
                      <Input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => setToday(setStartDate)} variant="outline" size="sm">
                        Bugün
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">Bitiş Tarihi</Label>
                    <div className="flex gap-2">
                      <Input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => setToday(setEndDate)} variant="outline" size="sm">
                        Bugün
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={calculateDifference} className="w-full">
                  Farkı Hesapla
                </Button>

                {difference && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Sonuç</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-line text-sm">{difference}</pre>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-subtract">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Tarih Ekleme/Çıkarma
                </CardTitle>
                <CardDescription>Bir tarihe zaman ekleyin veya çıkarın</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="base-date">Başlangıç Tarihi</Label>
                  <div className="flex gap-2">
                    <Input
                      id="base-date"
                      type="date"
                      value={baseDate}
                      onChange={(e) => setBaseDate(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={() => setToday(setBaseDate)} variant="outline">
                      Bugün
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-value">Değer</Label>
                    <Input
                      id="add-value"
                      type="number"
                      value={addValue}
                      onChange={(e) => setAddValue(e.target.value)}
                      placeholder="Örn: 30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Birim</Label>
                    <Select value={addUnit} onValueChange={setAddUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Dakika</SelectItem>
                        <SelectItem value="hours">Saat</SelectItem>
                        <SelectItem value="days">Gün</SelectItem>
                        <SelectItem value="weeks">Hafta</SelectItem>
                        <SelectItem value="months">Ay</SelectItem>
                        <SelectItem value="years">Yıl</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={addToDate} className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Ekle
                  </Button>
                  <Button onClick={subtractFromDate} variant="outline" className="flex-1 bg-transparent">
                    <Minus className="h-4 w-4 mr-2" />
                    Çıkar
                  </Button>
                </div>

                {resultDate && (
                  <div className="space-y-2">
                    <Label>Sonuç</Label>
                    <Input value={resultDate} readOnly />
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
