import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

interface ToolLayoutProps {
  children: ReactNode
  title: string
  description: string
}

export function ToolLayout({ children, title, description }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-secondary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Tools
                </Button>
              </Link>
              <div className="h-6 w-px bg-white/20" />
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>

            <div className="text-right">
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">Tools.Yelbiz</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Tool Header */}
      <section className="py-12 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-hero bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>
      </section>

      {/* Tool Content */}
      <main className="container mx-auto px-4 py-12">{children}</main>
    </div>
  )
}
