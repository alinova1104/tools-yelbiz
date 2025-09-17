"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe, MapPin, Wifi } from "lucide-react"

interface IPInfo {
  ip: string
  country: string
  region: string
  city: string
  isp: string
  timezone: string
  lat: number
  lon: number
}

export default function IPLookupPage() {
  const [ip, setIp] = useState("")
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const lookupIP = async () => {
    if (!ip.trim()) {
      setError("Lütfen geçerli bir IP adresi girin")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Mock IP lookup data (in real app, you'd use an actual IP geolocation API)
      const mockData: IPInfo = {
        ip: ip,
        country: "Turkey",
        region: "Istanbul",
        city: "Istanbul",
        isp: "Turk Telekom",
        timezone: "Europe/Istanbul",
        lat: 41.0082,
        lon: 28.9784,
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIpInfo(mockData)
    } catch (err) {
      setError("IP bilgileri alınırken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const getMyIP = async () => {
    setLoading(true)
    try {
      // In a real app, you'd fetch the user's IP
      const mockIP = "85.105.123.45"
      setIp(mockIP)
      await lookupIP()
    } catch (err) {
      setError("IP adresi alınırken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">IP Lookup</h1>
          <p className="text-xl text-muted-foreground">IP adresinin konum ve ISP bilgilerini öğrenin</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>IP Adresi Sorgula</CardTitle>
            <CardDescription>Sorgulamak istediğiniz IP adresini girin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ip">IP Adresi</Label>
              <div className="flex gap-2">
                <Input
                  id="ip"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  placeholder="192.168.1.1"
                  className="flex-1"
                />
                <Button onClick={lookupIP} disabled={loading}>
                  {loading ? "Sorgulanıyor..." : "Sorgula"}
                </Button>
                <Button onClick={getMyIP} variant="outline" disabled={loading}>
                  <Wifi className="h-4 w-4 mr-2" />
                  Benim IP'm
                </Button>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </CardContent>
        </Card>

        {ipInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Genel Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP Adresi:</span>
                  <span className="font-mono">{ipInfo.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISP:</span>
                  <span>{ipInfo.isp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Zaman Dilimi:</span>
                  <span>{ipInfo.timezone}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Konum Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ülke:</span>
                  <span>{ipInfo.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bölge:</span>
                  <span>{ipInfo.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Şehir:</span>
                  <span>{ipInfo.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Koordinatlar:</span>
                  <span className="font-mono">
                    {ipInfo.lat}, {ipInfo.lon}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
