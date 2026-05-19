import type { Metadata } from 'next'
import ContactClient from './contact-client'

export const metadata: Metadata = {
    title: 'Contact Us | ClothingBrand Heritage & Luxury',
    description: 'Get in touch with ClothingBrand for inquiries about our premium Indian artifacts, textiles, and shipping. Visit our Nagpur studio or contact us online.',
    openGraph: {
        title: 'Contact ClothingBrand | Heritage & Luxury Studio',
        description: 'Visit our Nagpur studio or contact us for inquiries about heritage artifacts and premium gifting.',
        url: 'https://clothingbrand.vercel.app/contact',
        siteName: 'ClothingBrand',
        locale: 'en_IN',
        type: 'website',
    },
}

export default function ContactPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: 'ClothingBrand Heritage',
        image: 'https://clothingbrand.vercel.app/icon.png',
        '@id': 'https://clothingbrand.vercel.app',
        url: 'https://clothingbrand.vercel.app/contact',
        telephone: '9665654326',
        priceRange: '₹₹₹',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'ClothingBrand Heritage Studio',
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
            email: 'support@clothingbrand.com',
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
