import { ToolCard } from "./ToolCard";

interface Tool {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

interface CategorySectionProps {
  title: string;
  description: string;
  tools: Tool[];
  categoryKey: string;
}

export const CategorySection = ({ title, description, tools, categoryKey }: CategorySectionProps) => {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <ToolCard
            key={`${categoryKey}-${index}`}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            category={title}
            href={tool.href}
          />
        ))}
      </div>
    </section>
  );
};