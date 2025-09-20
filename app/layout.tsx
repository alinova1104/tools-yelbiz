import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Tools.Yelbiz - Professional Developer Tools",
  description: "Professional developer tools designed for modern workflows. Fast, secure, and completely free.",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
