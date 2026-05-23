import type { Metadata } from 'next'
import ContactClient from './contact-client'

export const metadata: Metadata = {
    title: 'Contact Us | Budget Cosmetic',
    description: 'Get in touch with Budget Cosmetic for inquiries about our skincare, makeup, and beauty products. Visit our Nagpur store or contact us online.',
    openGraph: {
        title: 'Contact Budget Cosmetic',
        description: 'Reach out to Budget Cosmetic for product inquiries, orders, and beauty advice. Based in Nagpur, India.',
        url: 'https://shivshakti-dev.vercel.app/contact',
        siteName: 'Budget Cosmetic',
        locale: 'en_IN',
        type: 'website',
    },
}

export default function ContactPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: 'Budget Cosmetic',
        image: 'https://shivshakti-dev.vercel.app/icon.png',
        '@id': 'https://shivshakti-dev.vercel.app',
        url: 'https://shivshakti-dev.vercel.app/contact',
        telephone: '9665654326',
        priceRange: '₹₹',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Budget Cosmetic Store',
            addressLocality: 'Nagpur',
            addressRegion: 'Maharashtra',
            postalCode: '440001',
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 26.9124,
            longitude: 75.7873,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                ],
                opens: '10:00',
                closes: '19:00',
            },
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '9665654326',
            contactType: 'customer service',
            email: 'budgetcosmetic@gmail.com',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi'],
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ContactClient />
        </>
    )
}
