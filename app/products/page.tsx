// import { createServiceRoleClient } from '@/utils/supabase/service-role'
import { products as localProducts } from '@/data/products'
import ProductsClient from './products-client'

// export const revalidate = 60

const PRODUCTS_PER_PAGE = 12

interface PageProps {
    searchParams: Promise<{ page?: string; category?: string; search?: string; sort?: string; minPrice?: string; maxPrice?: string }>
}

function getEffectivePrice(p: (typeof localProducts)[number]): number {
    if (p.product_type === 'variable' && p.variations?.length) {
        return Math.min(...p.variations.map(v => v.price))
    }
    return p.price ?? 0
}

export default async function ProductsPage({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Math.max(1, parseInt(params.page || '1', 10))
    const category = params.category || 'All'
    const search = params.search || ''
    const sort = params.sort || 'newest'
    const minPrice = params.minPrice ? parseInt(params.minPrice) : undefined
    const maxPrice = params.maxPrice ? parseInt(params.maxPrice) : undefined

    let filtered = [...localProducts]

    // Search filter
    if (search) {
        const searchLower = search.toLowerCase()
        filtered = filtered.filter(p =>
            p.name?.toLowerCase().includes(searchLower) ||
            p.description?.toLowerCase().includes(searchLower)
        )
    }

    // Category filter
    if (category && category !== 'All') {
        const categoryLower = category.toLowerCase()
        filtered = filtered.filter(p =>
            p.categories?.some(c => c.toLowerCase() === categoryLower)
        )
    }

    // Price filter (uses effective price for variable products)
    if (minPrice !== undefined) {
        filtered = filtered.filter(p => getEffectivePrice(p) >= minPrice)
    }
    if (maxPrice !== undefined) {
        filtered = filtered.filter(p => getEffectivePrice(p) <= maxPrice)
    }

    // Sort
    if (sort === 'price_asc') {
        filtered = [...filtered].sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b))
    } else if (sort === 'price_desc') {
        filtered = [...filtered].sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a))
    }

    const total = filtered.length
    const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE)
    const from = (page - 1) * PRODUCTS_PER_PAGE
    const paginatedProducts = filtered.slice(from, from + PRODUCTS_PER_PAGE)

    // Derive unique categories from local products
    const allCategories = Array.from(
        new Set(localProducts.flatMap(p => p.categories))
    ).sort()

    // async function getProductsFromDB(...) { ... }

    return (
        <ProductsClient
            products={paginatedProducts}
            currentPage={page}
            totalPages={totalPages}
            totalProducts={total}
            currentCategory={category}
            searchQuery={search}
            currentSort={sort}
            currentMinPrice={minPrice}
            currentMaxPrice={maxPrice}
            initialCategories={allCategories}
        />
    )
}
