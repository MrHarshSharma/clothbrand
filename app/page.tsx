// import { createServiceRoleClient } from '@/utils/supabase/service-role'
import HomeClient from '@/components/home-client'
import { products, Product } from '@/data/products'
import type { Metadata } from 'next'

// ISR: Revalidate every 5 minutes - page is cached and served instantly from edge
// export const revalidate = 300

export const metadata: Metadata = {
  title: 'Budget Cosmetic | Premium Cosmetics & Skincare Online',
  description: 'Shop the latest skincare, makeup, and beauty essentials at Budget Cosmetic. Dermatologist-tested, cruelty-free cosmetics for every skin tone — new launches every week.',
  keywords: ['cosmetics', 'skincare', 'makeup', 'beauty products', 'lipstick', 'foundation', 'serum', 'cruelty free beauty', 'Indian cosmetics', 'online beauty store'],
  openGraph: {
    title: 'Budget Cosmetic | Premium Cosmetics & Skincare',
    description: 'Dermatologist-tested cosmetics and skincare for every skin tone. Shop new launches every week.',
    url: 'https://shivshakti-dev.vercel.app',
    siteName: 'Budget Cosmetic',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'Budget Cosmetic — Premium Cosmetics & Skincare',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Budget Cosmetic | Premium Cosmetics & Skincare',
    description: 'Shop the latest skincare and makeup. New launches every week.',
    images: ['/hero-image.png'],
  },
}

// async function getProducts() {
//   const supabase = createServiceRoleClient()
//   const { data, error } = await supabase
//     .from('product')
//     .select('*')
//     .order('created_at', { ascending: false })
//   if (error) {
//     console.error('Error fetching products:', error)
//     return []
//   }
//   return (data || []) as Product[]
// }

export default async function Home() {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Budget Cosmetic',
    url: 'https://shivshakti-dev.vercel.app',
    logo: 'https://shivshakti-dev.vercel.app/icon.png',
    description: 'Shop premium cosmetics and skincare online. New launches every week.',
    sameAs: [
      'https://instagram.com/shivshakti',
      'https://facebook.com/shivshakti',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '9665654326',
      contactType: 'customer service',
      email: 'budgetcosmetic@gmail.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient products={products} />
    </>
  )
}
