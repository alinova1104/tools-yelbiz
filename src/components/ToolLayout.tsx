import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const ToolLayout = ({ title, description, children }: ToolLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-secondary backdrop-blur-glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Geri
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="hover:bg-white/10"
              >
                <Home className="h-4 w-4 mr-2" />
                Ana Sayfa
              </Button>
            </div>
            <div className="text-sm text-white/60">
              Tools Hub
            </div>
          </div>
        </div>
      </header>

      {/* Tool Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
          
          <div className="bg-gradient-card backdrop-blur-glass rounded-2xl border border-white/10 p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
