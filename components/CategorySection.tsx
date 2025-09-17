import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { ReactNode } from "react"

interface Tool {
  title: string
  description: string
  icon: ReactNode
  href: string
}

interface CategorySectionProps {
  title: string
  description: string
  tools: Tool[]
  categoryKey: string
}

export function CategorySection({ title, description, tools, categoryKey }: CategorySectionProps) {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-hero bg-clip-text text-transparent">{title}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="group h-full bg-gradient-premium backdrop-blur-glass border border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-luxury cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-hero/10 group-hover:bg-gradient-hero/20 transition-colors duration-300">
                    {tool.icon}
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                    {tool.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                  {tool.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
