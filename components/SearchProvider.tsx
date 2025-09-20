"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Tool {
  title: string
  description: string
  icon: ReactNode
  href: string
}

interface Category {
  title: string
  description: string
  categoryKey: string
  tools: Tool[]
}

interface SearchContextType {
  searchTerm: string
  setSearchTerm: (term: string) => void
  filteredCategories: Category[]
  categoriesLength: number
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({
  children,
  categories,
}: {
  children: ReactNode
  categories: Category[]
}) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      tools: category.tools.filter(
        (tool) =>
          tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.tools.length > 0)

const categoriesLength = categories.reduce((acc, category) => acc + category.tools.length, 0)
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredCategories, categoriesLength }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
