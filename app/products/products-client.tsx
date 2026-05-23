'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/data/products'
import ProductCard from '@/components/product-card'
import { Package, Search, X, ChevronLeft, ChevronRight, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ProductsClientProps {
    products: Product[]
    currentPage: number
    totalPages: number
    totalProducts: number
    currentCategory: string
    searchQuery: string
    currentSort: string
    currentMinPrice?: number
    currentMaxPrice?: number
    initialCategories?: string[]
}

const SORT_OPTIONS = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
]

export default function ProductsClient({
    products,
    currentPage,
    totalPages,
    totalProducts,
    currentCategory,
    searchQuery,
    currentSort,
    currentMinPrice,
    currentMaxPrice,
    initialCategories = [],
}: ProductsClientProps) {
    const router = useRouter()
    const [categories, setCategories] = useState<string[]>(['All', ...initialCategories])
    const [showFilterDrawer, setShowFilterDrawer] = useState(false)
    const [localMinPrice, setLocalMinPrice] = useState(currentMinPrice?.toString() || '')
    const [localMaxPrice, setLocalMaxPrice] = useState(currentMaxPrice?.toString() || '')
    const [openSection, setOpenSection] = useState<string[]>(['sort', 'category', 'price'])

    // DB categories fetch — re-enable when switching back to DB
    // useEffect(() => {
    //     fetch('/api/categories')
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.success && data.categories) {
    //                 setCategories(['All', ...data.categories.map((c: { category: string }) => c.category)])
    //             }
    //         })
    //         .catch(() => { })
    // }, [])

    const buildUrl = (params: {
        page?: number
        category?: string
        search?: string
        sort?: string
        minPrice?: string
        maxPrice?: string
    }) => {
        const url = new URLSearchParams()
        const page = params.page ?? currentPage
        const category = params.category ?? currentCategory
        const search = params.search ?? searchQuery
        const sort = params.sort ?? currentSort
        const minPrice = params.minPrice !== undefined ? params.minPrice : currentMinPrice?.toString() || ''
        const maxPrice = params.maxPrice !== undefined ? params.maxPrice : currentMaxPrice?.toString() || ''

        if (page > 1) url.set('page', page.toString())
        if (category && category !== 'All') url.set('category', category)
        if (search) url.set('search', search)
        if (sort && sort !== 'newest') url.set('sort', sort)
        if (minPrice) url.set('minPrice', minPrice)
        if (maxPrice) url.set('maxPrice', maxPrice)

        const queryString = url.toString()
        return `/products${queryString ? `?${queryString}` : ''}`
    }

    const handleCategoryChange = (category: string) => {
        router.push(buildUrl({ category, page: 1 }))
    }

    const handleSortChange = (sort: string) => {
        router.push(buildUrl({ sort, page: 1 }))
    }

    const handlePriceApply = () => {
        router.push(buildUrl({ minPrice: localMinPrice, maxPrice: localMaxPrice, page: 1 }))
        setShowFilterDrawer(false)
    }

    const handlePriceClear = () => {
        setLocalMinPrice('')
        setLocalMaxPrice('')
        router.push(buildUrl({ minPrice: '', maxPrice: '', page: 1 }))
    }

    const handlePageChange = (page: number) => {
        router.push(buildUrl({ page }))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const clearSearch = () => router.push(buildUrl({ search: '', page: 1 }))
    const clearAll = () => {
        setLocalMinPrice('')
        setLocalMaxPrice('')
        router.push('/products')
    }

    const toggleSection = (s: string) =>
        setOpenSection(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

    const activeFiltersCount = [
        currentCategory !== 'All',
        currentSort !== 'newest',
        !!currentMinPrice,
        !!currentMaxPrice,
        !!searchQuery,
    ].filter(Boolean).length

    // Filter sidebar content (shared between desktop sidebar and mobile drawer)
    const FilterContent = () => (
        <div className="space-y-1">
            {/* Sort */}
            <div className="border-b border-[#EBEBEB]">
                <button
                    onClick={() => toggleSection('sort')}
                    className="w-full flex items-center justify-between py-4 text-sm font-semibold text-[#1A1A1A]"
                >
                    Sort By
                    <ChevronDown className={`w-4 h-4 text-[#717171] transition-transform ${openSection.includes('sort') ? 'rotate-180' : ''}`} />
                </button>
                {openSection.includes('sort') && (
                    <div className="pb-4 space-y-2">
                        {SORT_OPTIONS.map(opt => (
                            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                                <div
                                    onClick={() => handleSortChange(opt.value)}
                                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors ${
                                        currentSort === opt.value
                                            ? 'border-[#1A1A1A] bg-[#1A1A1A]'
                                            : 'border-[#D4D4D4] group-hover:border-[#B8975A]'
                                    }`}
                                >
                                    {currentSort === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                                <span
                                    onClick={() => handleSortChange(opt.value)}
                                    className={`text-sm cursor-pointer ${currentSort === opt.value ? 'text-[#1A1A1A] font-medium' : 'text-[#717171]'}`}
                                >
                                    {opt.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Category */}
            <div className="border-b border-[#EBEBEB]">
                <button
                    onClick={() => toggleSection('category')}
                    className="w-full flex items-center justify-between py-4 text-sm font-semibold text-[#1A1A1A]"
                >
                    Category
                    <ChevronDown className={`w-4 h-4 text-[#717171] transition-transform ${openSection.includes('category') ? 'rotate-180' : ''}`} />
                </button>
                {openSection.includes('category') && (
                    <div className="pb-4 space-y-2">
                        {categories.map(cat => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <div
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors ${
                                        currentCategory === cat
                                            ? 'border-[#1A1A1A] bg-[#1A1A1A]'
                                            : 'border-[#D4D4D4] group-hover:border-[#B8975A]'
                                    }`}
                                >
                                    {currentCategory === cat && (
                                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>
                                <span
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`text-sm cursor-pointer ${currentCategory === cat ? 'text-[#1A1A1A] font-medium' : 'text-[#717171]'}`}
                                >
                                    {cat}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range */}
            <div className="border-b border-[#EBEBEB]">
                <button
                    onClick={() => toggleSection('price')}
                    className="w-full flex items-center justify-between py-4 text-sm font-semibold text-[#1A1A1A]"
                >
                    Price Range
                    <ChevronDown className={`w-4 h-4 text-[#717171] transition-transform ${openSection.includes('price') ? 'rotate-180' : ''}`} />
                </button>
                {openSection.includes('price') && (
                    <div className="pb-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <label className="text-[10px] text-[#717171] uppercase tracking-wider mb-1 block">Min (₹)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={localMinPrice}
                                    onChange={e => setLocalMinPrice(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#B8975A]"
                                />
                            </div>
                            <span className="text-[#717171] mt-5">–</span>
                            <div className="flex-1">
                                <label className="text-[10px] text-[#717171] uppercase tracking-wider mb-1 block">Max (₹)</label>
                                <input
                                    type="number"
                                    placeholder="Any"
                                    value={localMaxPrice}
                                    onChange={e => setLocalMaxPrice(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#B8975A]"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handlePriceApply}
                                className="flex-1 py-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-lg hover:bg-[#2C2C2C] transition-colors"
                            >
                                Apply
                            </button>
                            {(currentMinPrice || currentMaxPrice) && (
                                <button
                                    onClick={handlePriceClear}
                                    className="px-3 py-2 border border-[#EBEBEB] text-[#717171] text-sm rounded-lg hover:bg-[#F8F8F8] transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Clear All */}
            {activeFiltersCount > 0 && (
                <button
                    onClick={clearAll}
                    className="w-full py-3 text-sm font-medium text-[#D0021B] hover:text-[#B0011A] transition-colors text-left"
                >
                    Clear all filters
                </button>
            )}
        </div>
    )

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-[#F5F0EB] pt-12 pb-12 md:pt-16 md:pb-16">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
                            {searchQuery ? 'Search Results' : 'Our Collection'}
                        </h1>
                        <p className="text-[#4A4A4A] text-lg leading-relaxed">
                            {searchQuery
                                ? `Showing results for "${searchQuery}"`
                                : 'Explore our full range of skincare, makeup, lip color, and everyday essentials — premium beauty at budget prices.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 lg:px-8 py-10">
                <div className="flex gap-8">

                    {/* ── Desktop Sidebar ── */}
                    <aside className="hidden lg:block w-60 flex-shrink-0">
                        <div className="sticky top-20">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-widest">Filters</h2>
                                {activeFiltersCount > 0 && (
                                    <span className="px-2 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-full">
                                        {activeFiltersCount}
                                    </span>
                                )}
                            </div>
                            <FilterContent />
                        </div>
                    </aside>

                    {/* ── Main Content ── */}
                    <div className="flex-1 min-w-0">

                        {/* Top bar: results count + mobile filter button */}
                        <div className="flex items-center justify-between mb-6 gap-4">
                            <p className="text-sm text-[#717171]">
                                <span className="font-medium text-[#1A1A1A]">{totalProducts}</span> {totalProducts === 1 ? 'product' : 'products'}
                                {searchQuery && <span> for &quot;<span className="font-medium text-[#B8975A]">{searchQuery}</span>&quot;</span>}
                                {currentCategory !== 'All' && <span> in <span className="font-medium text-[#B8975A]">{currentCategory}</span></span>}
                            </p>

                            <div className="flex items-center gap-3">
                                {searchQuery && (
                                    <button
                                        onClick={clearSearch}
                                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4A4A4A] bg-[#F8F8F8] rounded-lg hover:bg-[#EBEBEB] transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                        Clear search
                                    </button>
                                )}
                                {/* Mobile filter button */}
                                <button
                                    onClick={() => setShowFilterDrawer(true)}
                                    className="lg:hidden inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[#EBEBEB] rounded-lg hover:bg-[#F8F8F8] transition-colors"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                    {activeFiltersCount > 0 && (
                                        <span className="w-5 h-5 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Active filter chips */}
                        {activeFiltersCount > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {currentCategory !== 'All' && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F0EB] text-[#1A1A1A] text-xs font-medium rounded-full">
                                        {currentCategory}
                                        <button onClick={() => handleCategoryChange('All')}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                {currentSort !== 'newest' && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F0EB] text-[#1A1A1A] text-xs font-medium rounded-full">
                                        {SORT_OPTIONS.find(s => s.value === currentSort)?.label}
                                        <button onClick={() => handleSortChange('newest')}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                {currentMinPrice && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F0EB] text-[#1A1A1A] text-xs font-medium rounded-full">
                                        Min ₹{currentMinPrice.toLocaleString()}
                                        <button onClick={() => { setLocalMinPrice(''); router.push(buildUrl({ minPrice: '', page: 1 })) }}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                {currentMaxPrice && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F0EB] text-[#1A1A1A] text-xs font-medium rounded-full">
                                        Max ₹{currentMaxPrice.toLocaleString()}
                                        <button onClick={() => { setLocalMaxPrice(''); router.push(buildUrl({ maxPrice: '', page: 1 })) }}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F0EB] text-[#1A1A1A] text-xs font-medium rounded-full">
                                        &ldquo;{searchQuery}&rdquo;
                                        <button onClick={clearSearch}><X className="w-3 h-3" /></button>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Product Grid */}
                        <AnimatePresence mode="wait">
                            {products.length === 0 ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-20 bg-[#F8F8F8] rounded-xl border border-[#EBEBEB] max-w-lg mx-auto"
                                >
                                    <div className="w-16 h-16 bg-[#F5F0EB] rounded-full flex items-center justify-center mx-auto mb-4 text-[#B8975A]">
                                        {searchQuery ? <Search className="h-8 w-8" /> : <Package className="h-8 w-8" />}
                                    </div>
                                    <p className="text-xl font-semibold text-[#1A1A1A] mb-2">No products found</p>
                                    <p className="text-[#717171] text-sm">
                                        {searchQuery
                                            ? `No results for "${searchQuery}"${currentCategory !== 'All' ? ` in ${currentCategory}` : ''}.`
                                            : `No products match your current filters.`
                                        }
                                    </p>
                                    <button
                                        onClick={clearAll}
                                        className="mt-6 px-6 py-2.5 bg-[#1A1A1A] text-white font-medium rounded-lg hover:bg-[#2C2C2C] transition-colors text-sm"
                                    >
                                        Clear all filters
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={`${currentCategory}-${currentPage}-${currentSort}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
                                >
                                    {products.map((product, index) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.04 }}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-[#EBEBEB] hover:bg-[#F8F8F8] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronLeft className="h-5 w-5 text-[#4A4A4A]" />
                                </button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNum: number
                                        if (totalPages <= 5) pageNum = i + 1
                                        else if (currentPage <= 3) pageNum = i + 1
                                        else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i
                                        else pageNum = currentPage - 2 + i
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                                                    currentPage === pageNum
                                                        ? 'bg-[#1A1A1A] text-white'
                                                        : 'border border-[#EBEBEB] text-[#4A4A4A] hover:bg-[#F8F8F8]'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        )
                                    })}
                                </div>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-[#EBEBEB] hover:bg-[#F8F8F8] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronRight className="h-5 w-5 text-[#4A4A4A]" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Mobile Filter Drawer ── */}
            <AnimatePresence>
                {showFilterDrawer && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-[60]"
                            onClick={() => setShowFilterDrawer(false)}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed bottom-0 left-0 right-0 bg-white z-[70] rounded-t-2xl shadow-xl max-h-[85vh] overflow-y-auto"
                        >
                            <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b border-[#EBEBEB]">
                                <h2 className="text-base font-semibold text-[#1A1A1A]">
                                    Filters {activeFiltersCount > 0 && <span className="ml-2 px-2 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-full">{activeFiltersCount}</span>}
                                </h2>
                                <button onClick={() => setShowFilterDrawer(false)} className="p-2 rounded-lg hover:bg-[#F8F8F8]">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="px-5 pb-8">
                                <FilterContent />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
