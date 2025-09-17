import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Type, Hash, Clock, FileText } from "lucide-react";

const WordCounter = () => {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    return {
      characters,
      charactersNoSpaces,
      words,
      paragraphs,
      sentences,
      readingTime
    };
  }, [text]);

  return (
    <ToolLayout 
      title="Word & Character Counter" 
      description="Metin analizinizi yapın - kelime, karakter, paragraf sayısı ve okuma süresi"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Metninizi buraya yazın
          </label>
          <Textarea
            placeholder="Analiz edilecek metni buraya yazın..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[300px] bg-background/50 border-white/20 focus:border-primary/50"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Type className="h-4 w-4 text-primary" />
                Karakter
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-primary">{stats.characters}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Type className="h-4 w-4 text-blue-400" />
                Boşluksuz
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-blue-400">{stats.charactersNoSpaces}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Hash className="h-4 w-4 text-green-400" />
                Kelime
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-green-400">{stats.words}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-400" />
                Paragraf
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-purple-400">{stats.paragraphs}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Type className="h-4 w-4 text-orange-400" />
                Cümle
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-orange-400">{stats.sentences}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" />
                Okuma Süresi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-cyan-400">{stats.readingTime}dk</div>
            </CardContent>
          </Card>
        </div>

        {text && (
          <Card className="bg-gradient-card border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Detaylı İstatistikler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-white/70">
              <p>• Ortalama kelime uzunluğu: {stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(1) : 0} karakter</p>
              <p>• Cümle başına ortalama kelime: {stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : 0} kelime</p>
              <p>• Paragraf başına ortalama kelime: {stats.paragraphs > 0 ? (stats.words / stats.paragraphs).toFixed(1) : 0} kelime</p>
              <p>• Tahmini okuma hızı: 200 kelime/dakika</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
};

export default WordCounter;