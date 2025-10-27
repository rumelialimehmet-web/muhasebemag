import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Lodge Budget - AI-Powered Financial Analysis',
  description: 'AI-powered financial analysis platform for Turkish accountants and tax advisors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
}
