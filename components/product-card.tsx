'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Product } from '@/data/products'

export default function ProductCard({ product }: { product: Product }) {
    const [isHovered, setIsHovered] = useState(false)
    const [wishlisted, setWishlisted] = useState(false)

    const hasSecondImage = product.images && product.images.length > 1

    const getPrice = () => {
        if ((product as any).product_type === 'variable' && (product as any).variations?.length) {
            const prices = (product as any).variations.map((v: any) => v.price)
            const minPrice = Math.min(...prices)
            const maxPrice = Math.max(...prices)
            if (minPrice === maxPrice) return { min: `₹${minPrice.toLocaleString()}`, max: null }
            return { min: `₹${minPrice.toLocaleString()}`, max: `₹${maxPrice.toLocaleString()}` }
        }
        return { min: `₹${product.price.toLocaleString()}`, max: null }
    }

    const getSizes = (): string[] => {
        const variations = (product as any).variations
        if (!variations?.length) return []
        return variations.map((v: any) => v.name as string)
    }

    const priceInfo = getPrice()
    const sizes = getSizes()
    const visibleSizes = sizes.slice(0, 4)
    const extraSizes = sizes.length - 4

    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#D4D4D4]">

                {/* Image Container */}
                <div
                    className="relative aspect-[3/4] bg-[#F8F8F8] overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Primary image */}
                    <Image
                        src={product.images?.[0] || '/placeholder-product.png'}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-500 ${
                            hasSecondImage && isHovered
                                ? 'opacity-0 scale-100'
                                : 'opacity-100 group-hover:scale-105'
                        }`}
                    />

                    {/* Secondary image on hover */}
                    {hasSecondImage && (
                        <Image
                            src={product.images[1]}
                            alt={product.name}
                            fill
                            className={`object-cover transition-opacity duration-500 ${
                                isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    )}

                    {/* NEW badge */}
                    {product.isNew && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-semibold tracking-widest rounded">
                            NEW
                        </span>
                    )}

                    {/* Wishlist button */}
                    <button
                        onClick={(e) => { e.preventDefault(); setWishlisted(w => !w) }}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 ${
                            wishlisted
                                ? 'bg-[#FEF2F2] opacity-100'
                                : 'bg-white opacity-0 group-hover:opacity-100'
                        }`}
                        aria-label="Wishlist"
                    >
                        <Heart
                            className={`w-4 h-4 transition-colors ${
                                wishlisted ? 'text-[#E53E3E] fill-[#E53E3E]' : 'text-[#717171]'
                            }`}
                        />
                    </button>

                    {/* Size chips — slide up on hover */}
                    {visibleSizes.length > 0 && (
                        <div className={`absolute bottom-0 left-0 right-0 px-3 pb-3 pt-8 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 ${
                            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        }`}>
                            <div className="flex flex-wrap gap-1.5">
                                {visibleSizes.map((size) => (
                                    <span
                                        key={size}
                                        className="px-2 py-0.5 bg-white/90 text-[#1A1A1A] text-[10px] font-semibold rounded"
                                    >
                                        {size}
                                    </span>
                                ))}
                                {extraSizes > 0 && (
                                    <span className="px-2 py-0.5 bg-white/60 text-[#1A1A1A] text-[10px] rounded">
                                        +{extraSizes}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-3 lg:p-4">
                    {/* Category */}
                    {product.categories?.[0] && (
                        <p className="text-[10px] text-[#B8975A] uppercase tracking-widest mb-1 font-medium">
                            {product.categories[0]}
                        </p>
                    )}

                    {/* Name */}
                    <h3
                        className="text-sm font-medium mb-2 line-clamp-1 group-hover:text-[#B8975A] transition-colors"
                        style={{ color: '#1A1A1A' }}
                    >
                        {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-[#1A1A1A]">
                            {priceInfo.min}
                        </span>
                        {priceInfo.max && (
                            <span className="text-xs text-[#717171]">– {priceInfo.max}</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
