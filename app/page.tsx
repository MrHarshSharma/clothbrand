import { createServiceRoleClient } from '@/utils/supabase/service-role'
import HomeClient from '@/components/home-client'
import { Product } from '@/data/products'
import type { Metadata } from 'next'

// ISR: Revalidate every 5 minutes - page is cached and served instantly from edge
export const revalidate = 300

export const metadata: Metadata = {
  title: 'ClothingBrand | Shop Ethnic & Contemporary Fashion Online',
  description: 'Shop the latest ethnic wear, western styles, and fusion fashion at ClothingBrand. Handpicked clothing for women and men — new arrivals every week.',
  keywords: ['clothing brand', 'ethnic wear', 'boutique fashion', 'Indian fashion', 'women clothing', 'men clothing', 'kurta', 'sarees', 'western wear', 'online fashion store'],
  openGraph: {
    title: 'ClothingBrand | Ethnic & Contemporary Fashion',
    description: 'Handpicked ethnic and contemporary clothing for every occasion. Shop new arrivals every week.',
    url: 'https://clothingbrand.vercel.app',
    siteName: 'ClothingBrand',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'ClothingBrand — Shop Ethnic & Contemporary Fashion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClothingBrand | Ethnic & Contemporary Fashion',
    description: 'Shop the latest ethnic and contemporary styles. New arrivals every week.',
    images: ['/hero-image.png'],
  },
}

async function getProducts() {
  const supabase = createServiceRoleClient()
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return (data || []) as Product[]
}

export default async function Home() {
  const products = await getProducts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ClothingBrand',
    url: 'https://clothingbrand.vercel.app',
    logo: 'https://clothingbrand.vercel.app/icon.png',
    description: 'Shop the latest ethnic and contemporary fashion online. New arrivals every week.',
    sameAs: [
      'https://instagram.com/clothingbrand',
      'https://facebook.com/clothingbrand',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '9665654326',
      contactType: 'customer service',
      email: 'support@clothingbrand.com',
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
