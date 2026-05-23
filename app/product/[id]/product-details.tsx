'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronLeft, ShoppingBag, Minus, Plus, Check,
    ChevronRight, ChevronDown, Truck, Shield, RotateCcw,
} from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { Product } from '@/data/products'


const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0 }),
}

export default function ProductDetails({ product }: { product: Product }) {
    const { addToCartSilent, items, updateQuantity } = useCart()
    const [quantity, setQuantity] = useState(1)

    const getInitialVariation = () => {
        if (product?.product_type === 'variable' && product.variations?.length) {
            return product.variations.find(v => v.is_default) || product.variations[0]
        }
        return null
    }

    const [selectedVariation, setSelectedVariation] = useState<any>(getInitialVariation)
    const [showSuccess, setShowSuccess] = useState(false)
    const [[page, direction], setPage] = useState([0, 0])
    const [isZooming, setIsZooming] = useState(false)
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
    const [openAccordion, setOpenAccordion] = useState<string[]>(['details'])
    const [showStickyCart, setShowStickyCart] = useState(false)

    const imageContainerRef = useRef<HTMLDivElement>(null)
    const addToCartRef = useRef<HTMLDivElement>(null)

    const id = product.id.toString()

    // Sticky cart observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setShowStickyCart(!entry.isIntersecting),
            { threshold: 0 }
        )
        if (addToCartRef.current) observer.observe(addToCartRef.current)
        return () => observer.disconnect()
    }, [])

    // Track recently viewed
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                const STORAGE_KEY = 'clothingbrand_recently_viewed'
                const existing: { productId: string; viewedAt: number }[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
                const filtered = existing.filter(item => item.productId !== id)
                filtered.unshift({ productId: id, viewedAt: Date.now() })
                localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 8)))
            } catch {}
        }, 5000)
        return () => clearTimeout(timer)
    }, [id])

    // Sync quantity with cart
    useEffect(() => {
        const cartItem = items.find(item =>
            item.id.toString() === id &&
            (!selectedVariation || item.selectedVariation?.id === selectedVariation.id)
        )
        setQuantity(cartItem ? cartItem.quantity : 1)
    }, [id, items, selectedVariation])

    const paginate = (newDirection: number) => {
        if (!product?.images?.length) return
        const newPage = (page + newDirection + product.images.length) % product.images.length
        setPage([newPage, newDirection])
    }

    const imageIndex = product.images?.length ? page % product.images.length : 0

    const cartItem = items.find(item =>
        item.id.toString() === id &&
        (!selectedVariation || item.selectedVariation?.id === selectedVariation.id)
    )
    const isInCart = !!cartItem

    const handleAddToCart = () => {
        if (!product) return
        if (isInCart) {
            updateQuantity(product.id, quantity, selectedVariation?.id)
        } else {
            addToCartSilent(product, quantity, selectedVariation)
        }
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
    }

    const toggleAccordion = (key: string) =>
        setOpenAccordion(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])

    // Parse description JSON
    let description = product.description
    let details = ''
    let ingredients = ''
    let howToUse = ''
    try {
        const json = JSON.parse(product.description)
        if (typeof json === 'object' && json !== null) {
            description = json.productDescription || ''
            details = json.productDetails || ''
            ingredients = json.ingredients || ''
            howToUse = json.howToUse || ''
        }
    } catch {}

    const currentPrice = selectedVariation?.price ?? product.price ?? 0

    const ThumbnailList = ({ className }: { className?: string }) => (
        <div className={className}>
            {product.images?.map((img, idx) => (
                <button
                    key={idx}
                    onClick={() => setPage([idx, idx > imageIndex ? 1 : -1])}
                    className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all border-2 ${
                        imageIndex === idx
                            ? 'border-[#B8975A] ring-2 ring-[#B8975A]/20'
                            : 'border-[#EBEBEB] hover:border-[#B8975A]/50'
                    } w-16 h-20 lg:w-full lg:h-24`}
                >
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </button>
            ))}
        </div>
    )

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-[#F8F8F8] border-b border-[#EBEBEB]">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/products" className="text-[#717171] hover:text-[#B8975A] transition-colors">Shop</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-[#EBEBEB]" />
                        {product.categories?.[0] && (
                            <>
                                <Link href={`/products?category=${encodeURIComponent(product.categories[0])}`} className="text-[#717171] hover:text-[#B8975A] transition-colors">
                                    {product.categories[0]}
                                </Link>
                                <ChevronRight className="w-3.5 h-3.5 text-[#EBEBEB]" />
                            </>
                        )}
                        <span className="text-[#1A1A1A] font-medium truncate max-w-[200px]">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">

                    {/* ── Image Gallery ── */}
                    <div>
                        <div className="flex gap-3">
                            {/* Vertical thumbnails — desktop only */}
                            {product.images && product.images.length > 1 && (
                                <ThumbnailList className="hidden lg:flex flex-col gap-2 w-[68px] flex-shrink-0" />
                            )}

                            {/* Main Image */}
                            <div
                                ref={imageContainerRef}
                                className="relative flex-1 aspect-[3/4] bg-[#F8F8F8] rounded-2xl overflow-hidden group cursor-zoom-in"
                                onMouseMove={(e) => {
                                    if (!imageContainerRef.current) return
                                    const rect = imageContainerRef.current.getBoundingClientRect()
                                    setZoomPosition({
                                        x: ((e.clientX - rect.left) / rect.width) * 100,
                                        y: ((e.clientY - rect.top) / rect.height) * 100,
                                    })
                                }}
                                onMouseEnter={() => setIsZooming(true)}
                                onMouseLeave={() => setIsZooming(false)}
                            >
                                <AnimatePresence initial={false} custom={direction}>
                                    <motion.div
                                        key={page}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={1}
                                        onDragEnd={(_, { offset, velocity }) => {
                                            const swipe = Math.abs(offset.x) * velocity.x
                                            if (swipe < -10000) paginate(1)
                                            else if (swipe > 10000) paginate(-1)
                                        }}
                                        transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={product.images?.[imageIndex] || '/placeholder-product.png'}
                                            alt={`${product.name} ${imageIndex + 1}`}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Zoom overlay */}
                                {isZooming && (
                                    <div
                                        className="absolute inset-0 z-20 pointer-events-none"
                                        style={{
                                            backgroundImage: `url(${product.images?.[imageIndex] || '/placeholder-product.png'})`,
                                            backgroundSize: '250%',
                                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    />
                                )}

                                {/* Arrows */}
                                {product.images && product.images.length > 1 && (
                                    <>
                                        <button onClick={() => paginate(-1)} onMouseEnter={() => setIsZooming(false)} onMouseLeave={() => setIsZooming(true)}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white shadow-md text-[#4A4A4A] hover:text-[#B8975A] opacity-0 group-hover:opacity-100 transition-all">
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => paginate(1)} onMouseEnter={() => setIsZooming(false)} onMouseLeave={() => setIsZooming(true)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white shadow-md text-[#4A4A4A] hover:text-[#B8975A] opacity-0 group-hover:opacity-100 transition-all">
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </>
                                )}

                                {/* Badges */}
                                {product.isNew && (
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#1A1A1A] text-white text-[10px] font-semibold tracking-widest rounded z-30">
                                        NEW
                                    </span>
                                )}

                                {/* Counter */}
                                {product.images && product.images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1 bg-black/50 rounded-full text-white text-xs">
                                        {imageIndex + 1} / {product.images.length}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Horizontal thumbnails — mobile only */}
                        {product.images && product.images.length > 1 && (
                            <ThumbnailList className="lg:hidden flex gap-2 mt-3 overflow-x-auto pb-1" />
                        )}
                    </div>

                    {/* ── Product Info ── */}
                    <div className="lg:py-2">
                        {/* Category */}
                        {product.categories?.[0] && (
                            <p className="text-xs font-medium text-[#B8975A] uppercase tracking-widest mb-3">
                                {product.categories[0]}
                            </p>
                        )}

                        {/* Name */}
                        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3 leading-tight">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-5">
                            <span className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                                ₹{currentPrice.toLocaleString()}
                            </span>
                            {selectedVariation && (
                                <span className="text-sm text-[#717171]">({selectedVariation.name})</span>
                            )}
                        </div>

                        {/* Description */}
                        {description && (
                            <p className="text-[#4A4A4A] leading-relaxed mb-6 text-sm">{description}</p>
                        )}

                        {/* Variation / Shade Selector */}
                        {product.product_type === 'variable' && product.variations?.length && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-[#1A1A1A]">
                                        Select Shade
                                        {selectedVariation && (
                                            <span className="ml-2 font-normal text-[#717171]">— {selectedVariation.name}</span>
                                        )}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.variations.map((variation) => (
                                        <button
                                            key={variation.id}
                                            onClick={() => setSelectedVariation(variation)}
                                            className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                                                selectedVariation?.id === variation.id
                                                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                                                    : 'border-[#EBEBEB] text-[#4A4A4A] hover:border-[#B8975A]'
                                            }`}
                                        >
                                            {variation.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity + Add to Cart */}
                        <div ref={addToCartRef} className="flex items-center gap-3 mb-6">
                            <div className="flex items-center border border-[#EBEBEB] rounded-lg flex-shrink-0">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    disabled={quantity <= 1}
                                    className="p-3 hover:bg-[#F8F8F8] transition-colors text-[#4A4A4A] disabled:opacity-40"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-10 text-center font-semibold text-[#1A1A1A] text-sm">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="p-3 hover:bg-[#F8F8F8] transition-colors text-[#4A4A4A]"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 px-6 py-3.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                                    showSuccess
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-[#1A1A1A] text-white hover:bg-[#2C2C2C]'
                                }`}
                            >
                                {showSuccess ? (
                                    <><Check className="h-4 w-4" /> Added to Bag</>
                                ) : (
                                    <><ShoppingBag className="h-4 w-4" /> {isInCart ? 'Update Bag' : 'Add to Bag'}</>
                                )}
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-3 p-4 bg-[#F8F8F8] rounded-xl mb-6">
                            {[
                                { icon: Truck, title: 'Free Delivery', desc: 'Orders above ₹999' },
                                { icon: RotateCcw, title: 'Easy Returns', desc: '7-day policy' },
                                { icon: Shield, title: 'Secure Pay', desc: '100% protected' },
                            ].map(({ icon: Icon, title, desc }) => (
                                <div key={title} className="flex flex-col items-center text-center gap-1.5">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#B8975A]">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <p className="text-[11px] font-medium text-[#1A1A1A] leading-tight">{title}</p>
                                    <p className="text-[10px] text-[#717171] leading-tight">{desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Accordion — Product Details, Fabric, Care, Shipping */}
                        <div className="border-t border-[#EBEBEB]">
                            {[
                                { key: 'details', label: 'Product Details', content: details },
                                { key: 'ingredients', label: 'Key Ingredients', content: ingredients },
                                { key: 'howToUse', label: 'How to Use', content: howToUse },
                                {
                                    key: 'shipping',
                                    label: 'Shipping & Returns',
                                    content: 'Free shipping on orders above ₹999. Standard delivery in 3–5 business days.\n\nReturns accepted within 7 days of delivery. Product must be unused, unopened, and in original packaging.',
                                },
                            ]
                                .filter(item => item.content)
                                .map(({ key, label, content }) => (
                                    <div key={key} className="border-b border-[#EBEBEB]">
                                        <button
                                            onClick={() => toggleAccordion(key)}
                                            className="w-full flex items-center justify-between py-4 text-left"
                                        >
                                            <span className="text-sm font-semibold text-[#1A1A1A]">{label}</span>
                                            <ChevronDown className={`w-4 h-4 text-[#717171] flex-shrink-0 transition-transform ${openAccordion.includes(key) ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {openAccordion.includes(key) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-4 text-sm text-[#4A4A4A] leading-relaxed whitespace-pre-line">
                                                        {content}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Sticky Mobile Add to Cart ── */}
            <AnimatePresence>
                {showStickyCart && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        transition={{ type: 'tween', duration: 0.25 }}
                        className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t border-[#EBEBEB] px-4 py-3 flex items-center gap-3 shadow-lg"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#717171] truncate">{product.name}</p>
                            <p className="text-base font-bold text-[#1A1A1A]">₹{currentPrice.toLocaleString()}</p>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 flex-shrink-0 ${
                                showSuccess ? 'bg-emerald-500 text-white' : 'bg-[#1A1A1A] text-white'
                            }`}
                        >
                            {showSuccess ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingBag className="h-4 w-4" /> Add to Bag</>}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
