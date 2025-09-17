import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError("");
      toast({
        title: "JSON başarıyla formatlandı",
        description: "JSON verileriniz düzenlendi ve doğrulandı.",
      });
    } catch (err) {
      setError("Geçersiz JSON formatı: " + (err as Error).message);
      setOutput("");
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
      toast({
        title: "JSON sıkıştırıldı",
        description: "JSON verileriniz tek satırda sıkıştırıldı.",
      });
    } catch (err) {
      setError("Geçersiz JSON formatı: " + (err as Error).message);
      setOutput("");
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

  const downloadJSON = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout 
      title="JSON Formatter & Validator" 
      description="JSON verilerinizi düzenleyin, doğrulayın ve güzelleştirin"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            JSON Giriş
          </label>
          <Textarea
            placeholder='{"name": "John", "age": 30, "city": "New York"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px] bg-background/50 border-white/20 focus:border-primary/50"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={formatJSON} className="bg-primary hover:bg-primary/90">
            Formatla & Doğrula
          </Button>
          <Button variant="outline" onClick={minifyJSON}>
            Sıkıştır
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-white/80">
                Sonuç
              </label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-xs"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Kopyalandı" : "Kopyala"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadJSON}
                  className="text-xs"
                >
                  <Download className="h-3 w-3 mr-1" />
                  İndir
                </Button>
              </div>
            </div>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] bg-background/50 border-white/20 font-mono text-sm"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default JSONFormatter;
