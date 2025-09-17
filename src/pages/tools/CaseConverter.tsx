import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CaseConverter = () => {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState("");

  const convertCase = (type: string, text: string) => {
    switch (type) {
      case "upper":
        return text.toUpperCase();
      case "lower":
        return text.toLowerCase();
      case "title":
        return text.replace(/\w\S*/g, (txt) =>
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case "sentence":
        return text.toLowerCase().replace(/(^\w|\.\s+\w)/gm, (txt) =>
          txt.toUpperCase()
        );
      case "camel":
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) =>
            chr.toUpperCase()
          );
      case "pascal":
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) =>
            chr.toUpperCase()
          )
          .replace(/^(.)/, (match, chr) => chr.toUpperCase());
      case "snake":
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "_")
          .replace(/^_|_$/g, "");
      case "kebab":
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      case "constant":
        return text
          .toUpperCase()
          .replace(/[^A-Z0-9]+/g, "_")
          .replace(/^_|_$/g, "");
      case "alternating":
        return text
          .split("")
          .map((char, index) =>
            index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
      case "inverse":
        return text
          .split("")
          .map((char) =>
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
      default:
        return text;
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
    toast({
      title: "Kopyalandı",
      description: "Metin panoya kopyalandı.",
    });
  };

  const cases = [
    { type: "upper", title: "BÜYÜK HARF", description: "Tüm harfleri büyük yapar" },
    { type: "lower", title: "küçük harf", description: "Tüm harfleri küçük yapar" },
    { type: "title", title: "Başlık Formatı", description: "Her kelimenin ilk harfini büyük yapar" },
    { type: "sentence", title: "Cümle formatı", description: "Cümle başlarını büyük yapar" },
    { type: "camel", title: "camelCase", description: "Deve formatı" },
    { type: "pascal", title: "PascalCase", description: "Pascal formatı" },
    { type: "snake", title: "snake_case", description: "Yılan formatı" },
    { type: "kebab", title: "kebab-case", description: "Kebab formatı" },
    { type: "constant", title: "CONSTANT_CASE", description: "Sabit formatı" },
    { type: "alternating", title: "aLtErNaTiNg CaSe", description: "Dönüşümlü format" },
    { type: "inverse", title: "tERS fORMAT", description: "Ters format" },
  ];

  return (
    <ToolLayout 
      title="Text Case Converter" 
      description="Metninizi farklı büyük/küçük harf formatlarına dönüştürün"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Dönüştürülecek Metin
          </label>
          <Textarea
            placeholder="Dönüştürülecek metni buraya girin..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[100px] bg-background/50 border-white/20"
          />
        </div>

        {input && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.map((caseType) => {
              const convertedText = convertCase(caseType.type, input);
              return (
                <Card key={caseType.type} className="bg-gradient-card border-white/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">
                        {caseType.title}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(convertedText, caseType.type)}
                        className="h-6 px-2"
                      >
                        {copied === caseType.type ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-white/60">{caseType.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="p-3 bg-background/50 rounded border border-white/10 font-mono text-sm break-all">
                      {convertedText || "Sonuç burada görünecek"}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!input && (
          <div className="text-center py-12 text-white/60">
            <p>Dönüştürme yapmak için yukarıya metin girin</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default CaseConverter;
