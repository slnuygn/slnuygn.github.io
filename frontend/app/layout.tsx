import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import SocialFooter from '@/components/SocialFooter'

export const metadata: Metadata = {
  title: 'Hi I\'m Selin!',
  description: 'Welcome to my personal portfolio website. Check out my timeline, roadmap, and projects!',
  openGraph: {
    title: 'Hi I\'m Selin!',
    description: 'Welcome to my personal portfolio website. Check out my timeline, roadmap, and projects!',
    url: 'https://slnuygn.github.io',
    siteName: 'Selin\'s Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hi I\'m Selin!',
    description: 'Welcome to my personal portfolio website. Check out my timeline, roadmap, and projects!',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
          <SocialFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
