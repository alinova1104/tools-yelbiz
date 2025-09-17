import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Check, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      toast({
        title: "Hata",
        description: "En az bir karakter türü seçmelisiniz.",
        variant: "destructive",
      });
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
    toast({
      title: "Şifre oluşturuldu",
      description: `${length[0]} karakterlik güvenli şifre oluşturuldu.`,
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Kopyalandı",
      description: "Şifre panoya kopyalandı.",
    });
  };

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score++;

    if (score < 3) return { strength: "Zayıf", color: "text-red-500", width: "25%" };
    if (score < 5) return { strength: "Orta", color: "text-yellow-500", width: "50%" };
    if (score < 6) return { strength: "İyi", color: "text-blue-500", width: "75%" };
    return { strength: "Güçlü", color: "text-green-500", width: "100%" };
  };

  const strength = password ? getPasswordStrength() : null;

  return (
    <ToolLayout 
      title="Password Generator" 
      description="Güvenli ve güçlü şifreler oluşturun"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-white/80">Şifre Uzunluğu: {length[0]}</Label>
            <div className="mt-2">
              <Slider
                value={length}
                onValueChange={setLength}
                min={4}
                max={50}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-white/80">Karakter Türleri</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={(checked) => setIncludeUppercase(!!checked)}
              />
              <Label htmlFor="uppercase" className="text-sm text-white/70">
                Büyük harfler (A-Z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={(checked) => setIncludeLowercase(!!checked)}
              />
              <Label htmlFor="lowercase" className="text-sm text-white/70">
                Küçük harfler (a-z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked) => setIncludeNumbers(!!checked)}
              />
              <Label htmlFor="numbers" className="text-sm text-white/70">
                Sayılar (0-9)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={(checked) => setIncludeSymbols(!!checked)}
              />
              <Label htmlFor="symbols" className="text-sm text-white/70">
                Özel karakterler (!@#$%...)
              </Label>
            </div>
          </div>
        </div>

        <Button 
          onClick={generatePassword} 
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Şifre Oluştur
        </Button>

        {password && (
          <div className="space-y-4">
            <div>
              <Label className="text-white/80">Oluşturulan Şifre</Label>
              <div className="flex mt-2 gap-2">
                <Input
                  value={password}
                  readOnly
                  className="bg-background/50 border-white/20 font-mono"
                />
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {strength && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-white/60" />
                  <Label className="text-white/80">Şifre Gücü</Label>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        strength.strength === "Güçlü" ? "bg-green-500" :
                        strength.strength === "İyi" ? "bg-blue-500" :
                        strength.strength === "Orta" ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: strength.width }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${strength.color}`}>
                    {strength.strength}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PasswordGenerator;