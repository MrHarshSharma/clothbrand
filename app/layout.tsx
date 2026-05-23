
import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import { CartProvider } from '@/context/cart-context'
import { AuthProvider } from '@/context/auth-context'
import CartDrawer from '@/components/cart-drawer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Budget Cosmetic | Premium Cosmetics & Skincare',
  description: 'Shop premium cosmetics, skincare, and beauty essentials at Budget Cosmetic. Cruelty-free, dermatologist-tested. New launches every week.',
  icons: {
    icon: '/tp_logo.png',
    apple: '/tp_logo.png',
  }
}

import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            <Suspense fallback={null}>
              <CartDrawer />
            </Suspense>
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

