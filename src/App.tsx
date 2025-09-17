import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import tool components
import JSONFormatter from "./pages/tools/JSONFormatter";
import WordCounter from "./pages/tools/WordCounter"; 
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import QRGenerator from "./pages/tools/QRGenerator";
import Base64Tool from "./pages/tools/Base64Tool";
import CaseConverter from "./pages/tools/CaseConverter";
import LoremIpsum from "./pages/tools/LoremIpsum";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Core Tools - Implemented */}
          <Route path="/json/formatter" element={<JSONFormatter />} />
          <Route path="/text/word-counter" element={<WordCounter />} />
          <Route path="/security/password-generator" element={<PasswordGenerator />} />
          <Route path="/image/qr-generator" element={<QRGenerator />} />
          <Route path="/text/base64" element={<Base64Tool />} />
          <Route path="/text/case-converter" element={<CaseConverter />} />
          <Route path="/text/lorem-ipsum" element={<LoremIpsum />} />
          
          {/* Placeholder routes for other tools */}
          
          {/* More routes will be added for other categories... */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
