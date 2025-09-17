import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  href: string;
}

export const ToolCard = ({ title, description, icon, category, href }: ToolCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-gradient-card backdrop-blur-glass border border-white/5 hover:border-white/20 transition-all duration-700 hover:scale-[1.03] hover:shadow-luxury cursor-pointer">
      <div className="absolute inset-0 bg-gradient-glass opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-border opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
      
      <CardHeader className="relative pb-4 z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10 text-primary group-hover:bg-primary/15 group-hover:border-primary/20 group-hover:scale-110 group-hover:shadow-glow transition-all duration-500 backdrop-blur-sm">
            {icon}
          </div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all duration-300">
            {category}
          </span>
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-transparent group-hover:bg-gradient-hero group-hover:bg-clip-text transition-all duration-500 leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative pt-0 z-10">
        <CardDescription className="text-muted-foreground/80 group-hover:text-muted-foreground mb-6 line-clamp-2 leading-relaxed transition-colors duration-300">
          {description}
        </CardDescription>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500 font-semibold backdrop-blur-sm border border-transparent rounded-xl py-3"
        >
          <span>Aracı Kullan</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
        </Button>
      </CardContent>
      
      {/* Luxury accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </Card>
  );
};
