// import { createServiceRoleClient } from '@/utils/supabase/service-role'
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'
import ProductDetails from './product-details'
import { products, Product } from '@/data/products'

// export const revalidate = 600

interface PageProps {
    params: Promise<{ id: string }>
}

function getProduct(id: string): Product | null {
    if (!id || id === 'undefined') return null
    return products.find(p => p.id.toString() === id) ?? null
}

// async function getProductFromDB(id: string) {
//     const supabase = createServiceRoleClient()
//     const { data: product, error } = await supabase
//         .from('product')
//         .select('*')
//         .eq('id', id)
//         .single()
//     if (error || !product) return null
//     return product as Product
// }

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params
    const product = getProduct(id)

    if (!product) {
        return { title: 'Product Not Found' }
    }

    const previousImages = (await parent).openGraph?.images || []
    const mainImage = product.images?.[0] || '/placeholder-product.png'

    let metaDescription = product.description
    try {
        const jsonDesc = JSON.parse(product.description)
        if (typeof jsonDesc === 'object' && jsonDesc !== null && jsonDesc.productDescription) {
            metaDescription = jsonDesc.productDescription
        }
    } catch {
        // Not JSON, use as-is
    }

    return {
        title: `${product.name} | Budget Cosmetic`,
        description: metaDescription,
        openGraph: {
            title: product.name,
            description: metaDescription,
            images: [mainImage, ...previousImages],
        },
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params
    const product = getProduct(id)

    if (!product) {
        notFound()
    }

    return <ProductDetails product={product} />
}
