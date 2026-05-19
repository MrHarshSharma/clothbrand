import { createServiceRoleClient } from '@/utils/supabase/service-role'
import HomeClient from '@/components/home-client'
import { Product } from '@/data/products'
import type { Metadata } from 'next'

// ISR: Revalidate every 5 minutes - page is cached and served instantly from edge
export const revalidate = 300

export const metadata: Metadata = {
  title: 'Shivshakti | Boutique Clothing & Ethnic Wear',
  description: 'Discover handpicked ethnic and contemporary clothing at Shivshakti. Premium boutique fashion from Nagpur, crafted with tradition and style.',
  keywords: ['boutique clothing', 'ethnic wear', 'Indian fashion', 'kurta', 'sarees', 'Nagpur', 'Maharashtra fashion', 'women fashion', 'men fashion', 'Shivshakti'],
  openGraph: {
    title: 'Shivshakti | Boutique Fashion',
    description: 'Handpicked ethnic and contemporary clothing from Nagpur, Maharashtra.',
    url: 'https://shivshakti.vercel.app',
    siteName: 'Shivshakti',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/hero-hamper.png',
        width: 1200,
        height: 630,
        alt: 'Shivshakti Boutique Clothing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivshakti | Boutique Fashion',
    description: 'Premium ethnic and contemporary clothing from Nagpur.',
    images: ['/hero-hamper.png'],
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
    name: 'Shivshakti Boutique',
    url: 'https://shivshakti.vercel.app',
    logo: 'https://shivshakti.vercel.app/icon.png',
    description: 'Handpicked ethnic and contemporary clothing from Nagpur, Maharashtra.',
    sameAs: [
      'https://instagram.com/shivshakti',
      'https://facebook.com/shivshakti',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '9890379728',
      contactType: 'customer service',
      email: 'shivshaktiprovision18@gmail.com',
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
