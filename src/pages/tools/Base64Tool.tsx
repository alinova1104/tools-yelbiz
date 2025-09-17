import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const encodeToBase64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      toast({
        title: "Base64 kodlama tamamlandı",
        description: "Metin Base64 formatına kodlandı.",
      });
    } catch (error) {
      toast({
        title: "Kodlama hatası",
        description: "Metin kodlanırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const decodeFromBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      toast({
        title: "Base64 çözme tamamlandı",
        description: "Base64 metni çözüldü.",
      });
    } catch (error) {
      toast({
        title: "Çözme hatası",
        description: "Geçersiz Base64 formatı.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Kopyalandı",
      description: "Sonuç panoya kopyalandı.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const base64 = result.split(',')[1]; // Remove data:type;base64, prefix
      setOutput(base64);
      toast({
        title: "Dosya yüklendi",
        description: "Dosya Base64 formatına dönüştürüldü.",
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <ToolLayout 
      title="Base64 Encoder/Decoder" 
      description="Metinleri ve dosyaları Base64 formatına kodlayın veya çözün"
    >
      <Tabs defaultValue="encode" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="encode">Kodla</TabsTrigger>
          <TabsTrigger value="decode">Çöz</TabsTrigger>
          <TabsTrigger value="file">Dosya</TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Kodlanacak Metin
            </label>
            <Textarea
              placeholder="Kodlanacak metni buraya girin..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[150px] bg-background/50 border-white/20"
            />
          </div>
          <Button onClick={encodeToBase64} className="w-full bg-primary hover:bg-primary/90">
            Base64'e Kodla
          </Button>
        </TabsContent>

        <TabsContent value="decode" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Base64 Kodlanmış Metin
            </label>
            <Textarea
              placeholder="Base64 kodlanmış metni buraya girin..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[150px] bg-background/50 border-white/20"
            />
          </div>
          <Button onClick={decodeFromBase64} className="w-full bg-primary hover:bg-primary/90">
            Base64'den Çöz
          </Button>
        </TabsContent>

        <TabsContent value="file" className="space-y-4">
          <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
            <label className="cursor-pointer">
              <span className="text-white/80 hover:text-primary transition-colors">
                Dosya seçin veya sürükleyip bırakın
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*,text/*,.pdf,.doc,.docx"
              />
            </label>
            <p className="text-sm text-white/60 mt-2">
              Maksimum dosya boyutu: 5MB
            </p>
          </div>
        </TabsContent>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-white/80">
                Sonuç
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="text-xs"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Kopyalandı" : "Kopyala"}
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="min-h-[150px] bg-background/50 border-white/20 font-mono text-sm"
            />
          </div>
        )}
      </Tabs>
    </ToolLayout>
  );
};

export default Base64Tool;