import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, QrCode } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const QRGenerator = () => {
  const [text, setText] = useState("");
  const [qrSize, setQrSize] = useState("200");
  const [qrType, setQrType] = useState("text");
  const [qrUrl, setQrUrl] = useState("");

  const generateQR = () => {
    if (!text.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen QR kod için bir metin girin.",
        variant: "destructive",
      });
      return;
    }

    // QR code generation using qr-server.com API
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodedText}`;
    setQrUrl(url);
    
    toast({
      title: "QR Kod oluşturuldu",
      description: "QR kodunuz başarıyla oluşturuldu.",
    });
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qr-code.png';
    link.click();
  };

  const handleTypeChange = (type: string) => {
    setQrType(type);
    
    switch (type) {
      case "url":
        setText("https://");
        break;
      case "email":
        setText("mailto:");
        break;
      case "phone":
        setText("tel:");
        break;
      case "sms":
        setText("sms:");
        break;
      case "wifi":
        setText("WIFI:T:WPA;S:NetworkName;P:Password;;");
        break;
      default:
        setText("");
    }
  };

  return (
    <ToolLayout 
      title="QR Code Generator" 
      description="URL, metin veya diğer veriler için QR kod oluşturun"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-white/80">QR Kod Türü</Label>
              <Select value={qrType} onValueChange={handleTypeChange}>
                <SelectTrigger className="bg-background/50 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Metin</SelectItem>
                  <SelectItem value="url">URL/Website</SelectItem>
                  <SelectItem value="email">E-posta</SelectItem>
                  <SelectItem value="phone">Telefon</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="wifi">WiFi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white/80">Boyut</Label>
              <Select value={qrSize} onValueChange={setQrSize}>
                <SelectTrigger className="bg-background/50 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="150">150x150 px</SelectItem>
                  <SelectItem value="200">200x200 px</SelectItem>
                  <SelectItem value="300">300x300 px</SelectItem>
                  <SelectItem value="400">400x400 px</SelectItem>
                  <SelectItem value="500">500x500 px</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white/80">İçerik</Label>
              {qrType === "text" || qrType === "wifi" ? (
                <Textarea
                  placeholder={
                    qrType === "wifi" 
                      ? "WIFI:T:WPA;S:NetworkName;P:Password;;"
                      : "QR koda dönüştürülecek metni girin..."
                  }
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[100px] bg-background/50 border-white/20"
                />
              ) : (
                <Input
                  placeholder={
                    qrType === "url" ? "https://example.com" :
                    qrType === "email" ? "mailto:example@example.com" :
                    qrType === "phone" ? "tel:+901234567890" :
                    qrType === "sms" ? "sms:+901234567890" :
                    "İçeriği girin..."
                  }
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="bg-background/50 border-white/20"
                />
              )}
            </div>

            <Button 
              onClick={generateQR} 
              className="w-full bg-primary hover:bg-primary/90"
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Kod Oluştur
            </Button>
          </div>

          <div className="flex flex-col items-center space-y-4">
            {qrUrl ? (
              <>
                <div className="bg-white p-4 rounded-lg">
                  <img src={qrUrl} alt="Generated QR Code" className="max-w-full h-auto" />
                </div>
                <Button 
                  onClick={downloadQR}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  QR Kodu İndir
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/20 rounded-lg w-full">
                <QrCode className="h-16 w-16 text-white/40 mb-4" />
                <p className="text-white/60 text-center">
                  QR kod burada görünecek
                </p>
              </div>
            )}
          </div>
        </div>

        {qrType === "wifi" && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">WiFi QR Kod Formatı:</h4>
            <p className="text-sm text-white/70 mb-2">
              WIFI:T:[WPA/WEP/nopass];S:[Ağ Adı];P:[Şifre];;
            </p>
            <p className="text-xs text-white/60">
              Örnek: WIFI:T:WPA;S:MüşterilerAgı;P:güvenliŞifre123;;
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default QRGenerator;