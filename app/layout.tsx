
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
  title: 'ClothingBrand | Shop Fashion Online',
  description: 'Shop ethnic wear, western styles, and fusion fashion at ClothingBrand. New arrivals every week.',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
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

