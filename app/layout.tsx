import type { Metadata, Viewport } from 'next'
import { Nunito, Baloo_2 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })
const baloo = Baloo_2({ subsets: ['latin'], variable: '--font-baloo' })

export const metadata: Metadata = {
  title: 'LinguaLand - English Learning for Kids',
  description: 'Fun and interactive English learning platform for Class 1 with AR experiences, games, and vocabulary building.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#FF6B35',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${baloo.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
