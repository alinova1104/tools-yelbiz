import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, RefreshCw, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LoremIpsum = () => {
  const [amount, setAmount] = useState("5");
  const [type, setType] = useState("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
    "accusamus", "accusantium", "doloremque", "laudantium", "totam", "rem",
    "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis"
  ];

  const generateWords = (count: number): string => {
    const result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * loremWords.length);
      result.push(loremWords[randomIndex]);
    }
    return result.join(" ");
  };

  const generateSentence = (): string => {
    const wordCount = Math.floor(Math.random() * 10) + 5; // 5-15 words
    const words = generateWords(wordCount);
    return words.charAt(0).toUpperCase() + words.slice(1) + ".";
  };

  const generateParagraph = (): string => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3; // 3-8 sentences
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(" ");
  };

  const generateLorem = () => {
    const count = parseInt(amount) || 1;
    let result = "";

    if (type === "words") {
      result = generateWords(count);
      if (startWithLorem) {
        result = "Lorem ipsum dolor sit amet " + result.split(" ").slice(5).join(" ");
      }
    } else if (type === "sentences") {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      result = sentences.join(" ");
      if (startWithLorem && count > 0) {
        sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        result = sentences.join(" ");
      }
    } else if (type === "paragraphs") {
      const paragraphs = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph());
      }
      result = paragraphs.join("\n\n");
      if (startWithLorem && count > 0) {
        paragraphs[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + paragraphs[0].split(". ").slice(1).join(". ");
        result = paragraphs.join("\n\n");
      }
    }

    setOutput(result);
    toast({
      title: "Lorem ipsum oluşturuldu",
      description: `${count} ${type === "words" ? "kelime" : type === "sentences" ? "cümle" : "paragraf"} oluşturuldu.`,
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Kopyalandı",
      description: "Lorem ipsum metni panoya kopyalandı.",
    });
  };

  return (
    <ToolLayout 
      title="Lorem Ipsum Generator" 
      description="Tasarım ve geliştirme projeleriniz için placeholder metin oluşturun"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-white/80">Miktar</Label>
            <Input
              type="number"
              min="1"
              max="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-background/50 border-white/20"
            />
          </div>

          <div>
            <Label className="text-white/80">Tür</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="bg-background/50 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="words">Kelime</SelectItem>
                <SelectItem value="sentences">Cümle</SelectItem>
                <SelectItem value="paragraphs">Paragraf</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-center">
            <Button 
              onClick={generateLorem}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Oluştur
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="startLorem"
            checked={startWithLorem}
            onCheckedChange={(checked) => setStartWithLorem(!!checked)}
          />
          <Label htmlFor="startLorem" className="text-sm text-white/70">
            "Lorem ipsum" ile başlasın
          </Label>
        </div>

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white/80">Oluşturulan Metin</Label>
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
              className="min-h-[300px] bg-background/50 border-white/20"
            />
            
            <div className="text-xs text-white/60 space-y-1">
              <p>• Karakter sayısı: {output.length}</p>
              <p>• Kelime sayısı: {output.split(/\s+/).filter(word => word.length > 0).length}</p>
              <p>• Paragraf sayısı: {output.split("\n\n").filter(p => p.trim()).length}</p>
            </div>
          </div>
        )}

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-blue-400 mb-2">Lorem Ipsum Nedir?</h4>
          <p className="text-sm text-white/70">
            Lorem ipsum, matbaa ve dizgi endüstrisinde kullanılan sahte metindir. 
            1500'lerden beri endüstriyel standart sahte metin olarak kullanılmaktadır. 
            Tasarımda içeriğin dikkat dağıtmaması için placeholder olarak kullanılır.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default LoremIpsum;