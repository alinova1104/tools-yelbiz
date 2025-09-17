import { toast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";

export const showBackendWarning = () => {
  toast({
    title: "Backend Gerekli",
    description: "Bu özellik için backend bağlantısı gerekiyor. Lütfen Supabase entegrasyonunu etkinleştirin.",
    duration: 5000,
    action: (
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-amber-500" />
      </div>
    ),
  });
};
