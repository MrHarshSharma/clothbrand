import { createServiceRoleClient } from '@/utils/supabase/service-role'
import ProductsClient from './products-client'

// Cache this page and revalidate every 60 seconds
export const revalidate = 60

const PRODUCTS_PER_PAGE = 12

interface GetProductsParams {
    page: number
    category?: string
    search?: string
    sort?: string
    minPrice?: number
    maxPrice?: number
}

async function getProducts({ page, category, search, sort, minPrice, maxPrice }: GetProductsParams) {
    const supabase = createServiceRoleClient()

    const { data: allProducts, error } = await supabase
        .from('product')
        .select('id, name, description, price, categories, images, product_type, variations, created_at')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching products:', error)
        return { products: [], total: 0, totalPages: 0 }
    }

    let filtered = allProducts || []

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
            p.categories?.some((c: string) => c.toLowerCase() === categoryLower)
        )
    }

    // Price filter
    if (minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= minPrice)
    }
    if (maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= maxPrice)
    }

    // Sort
    if (sort === 'price_asc') {
        filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sort === 'price_desc') {
        filtered = [...filtered].sort((a, b) => b.price - a.price)
    }
    // 'newest' is already the default from .order('created_at', { ascending: false })

    const total = filtered.length
    const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE)
    const from = (page - 1) * PRODUCTS_PER_PAGE
    const products = filtered.slice(from, from + PRODUCTS_PER_PAGE)

    return { products, total, totalPages }
}

interface PageProps {
    searchParams: Promise<{ page?: string; category?: string; search?: string; sort?: string; minPrice?: string; maxPrice?: string }>
}

export default async function ProductsPage({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Math.max(1, parseInt(params.page || '1', 10))
    const category = params.category || 'All'
    const search = params.search || ''
    const sort = params.sort || 'newest'
    const minPrice = params.minPrice ? parseInt(params.minPrice) : undefined
    const maxPrice = params.maxPrice ? parseInt(params.maxPrice) : undefined

    const { products, total, totalPages } = await getProducts({ page, category, search, sort, minPrice, maxPrice })

    return (
        <ProductsClient
            products={products}
            currentPage={page}
            totalPages={totalPages}
            totalProducts={total}
            currentCategory={category}
            searchQuery={search}
            currentSort={sort}
            currentMinPrice={minPrice}
            currentMaxPrice={maxPrice}
        />
    )
}
