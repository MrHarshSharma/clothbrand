'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Shield, RotateCcw, Clock, ShoppingBag } from 'lucide-react'
import { Product } from '@/data/products'
import ProductCard from '@/components/product-card'
import RecentlyViewed from '@/components/recently-viewed'

const CATEGORY_IMAGES = {
    ethnic:      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
    western:     'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    newArrivals: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
    festive:     'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80',
    casual:      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    bridal:      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
}

export default function HomeClient({ products }: { products: Product[] }) {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section — Full Bleed Editorial */}
            <section className="relative w-full h-[90vh] min-h-[560px] overflow-hidden">
                {/* Background Image */}
                <Image
                    src="/hero-image.png"
                    alt="ClothingBrand Boutique Collection"
                    fill
                    className="object-cover object-top"
                    priority
                />

                {/* Base dark overlay across entire image */}
                <div className="absolute inset-0 bg-black/50" />
                {/* Stronger left gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Text Content */}
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="max-w-xl">
                            <span className="inline-block px-3 py-1 border border-white/40 text-white/90 text-xs font-medium tracking-widest uppercase rounded-full mb-6">
                                New Arrivals
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold drop-shadow-lg mb-5 leading-tight" style={{ color: '#ffffff' }}>
                                Wear What Feels
                                <br />
                                <span className="text-[#B8975A] italic">Like You</span>
                            </h1>
                            <p className="text-base md:text-lg text-white/90 mb-8 max-w-sm leading-relaxed drop-shadow">
                                Curated ethnic and contemporary clothing for every occasion and celebration.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/products"
                                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#1A1A1A] font-semibold rounded-lg hover:bg-[#F5F0EB] transition-colors flex items-center justify-center gap-2"
                                >
                                    Shop Now
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/gourmet"
                                    className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-white font-medium rounded-lg border border-white/50 hover:border-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                >
                                    New Arrivals
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="border-b border-[#EBEBEB]">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                        {[
                            { icon: Truck, title: 'Free Shipping', desc: 'On orders ₹999+' },
                            { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
                            { icon: RotateCcw, title: 'Easy Returns', desc: '7-day hassle-free' },
                            { icon: Clock, title: 'Fast Delivery', desc: '3-5 business days' },
                        ].map((item) => (
                            <div key={item.title} className="flex items-center gap-3 p-3">
                                <div className="w-10 h-10 rounded-full bg-[#F5F0EB] flex items-center justify-center flex-shrink-0">
                                    <item.icon className="w-5 h-5 text-[#B8975A]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#1A1A1A]">{item.title}</p>
                                    <p className="text-xs text-[#717171]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recently Viewed / You Might Be Interested In */}
            <RecentlyViewed allProducts={products} />

            {/* Featured Products */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-playfair font-semibold text-[#1A1A1A]">
                                Featured Products
                            </h2>
                            <p className="text-sm text-[#717171] mt-1">
                                Handpicked styles for you
                            </p>
                        </div>
                        <Link
                            href="/products"
                            className="hidden md:flex items-center gap-2 text-sm font-medium text-[#B8975A] hover:underline"
                        >
                            View All
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Products Grid */}
                    {products.length === 0 ? (
                        <div className="text-center py-16 bg-[#F8F8F8] rounded-lg">
                            <ShoppingBag className="w-12 h-12 text-[#717171] mx-auto mb-4" />
                            <p className="text-lg font-medium text-[#1A1A1A] mb-2">Coming Soon</p>
                            <p className="text-sm text-[#717171]">
                                Our collection is being curated. Check back soon!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                            {products.slice(0, 8).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Mobile View All */}
                    <div className="mt-8 text-center md:hidden">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white font-medium rounded-lg"
                        >
                            View All Products
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Shop by Style — Editorial Category Grid */}
            <section className="py-12 lg:py-16 bg-[#F8F8F8]">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Section Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-playfair font-semibold text-[#1A1A1A]">
                            Shop by Style
                        </h2>
                        <p className="text-sm text-[#717171] mt-1">Curated for every occasion</p>
                    </div>

                    {/* Editorial Grid: 1 large left + 2 stacked right */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">

                        {/* Large Left Tile — Ethnic Wear */}
                        <Link href="/products?category=Ethnic" className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden min-h-[380px] md:min-h-[440px] flex flex-col justify-end p-8 block">
                            <Image src={CATEGORY_IMAGES.ethnic} alt="Ethnic Wear" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                            {/* Overlays */}
                            <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 border border-[#B8975A]/60 text-[#B8975A] text-xs font-medium tracking-widest uppercase rounded-full mb-4">
                                    Featured
                                </span>
                                <h3 className="text-3xl lg:text-4xl font-playfair font-semibold mb-3 leading-tight" style={{ color: '#ffffff' }}>
                                    Ethnic<br />Wear
                                </h3>
                                <p className="text-sm text-white/80 mb-5 max-w-xs leading-relaxed">
                                    Handpicked kurtas, sarees, and suits — rooted in tradition, styled for today.
                                </p>
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-[#B8975A] transition-colors">
                                    Explore Collection
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>

                        {/* Right column — 2 stacked tiles */}
                        <div className="flex flex-col gap-4 lg:gap-5">

                            {/* Western Wear */}
                            <Link href="/products?category=Western" className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden min-h-[200px] md:min-h-[210px] flex flex-col justify-end p-6 block">
                                <Image src={CATEGORY_IMAGES.western} alt="Western Wear" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/45 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                                <div className="relative z-10">
                                    <span className="text-xs font-medium tracking-widest uppercase text-[#B8975A] mb-2 block">
                                        Trending Now
                                    </span>
                                    <h3 className="text-2xl font-playfair font-semibold mb-3" style={{ color: '#ffffff' }}>
                                        Western Wear
                                    </h3>
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white group-hover:text-[#B8975A] transition-colors">
                                        Shop Now
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>

                            {/* New Arrivals */}
                            <Link href="/gourmet" className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden min-h-[200px] md:min-h-[210px] flex flex-col justify-end p-6 block">
                                <Image src={CATEGORY_IMAGES.newArrivals} alt="New Arrivals" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/45 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                                <div className="relative z-10">
                                    <span className="text-xs font-medium tracking-widest uppercase text-[#B8975A] mb-2 block">
                                        Just Dropped
                                    </span>
                                    <h3 className="text-2xl font-playfair font-semibold mb-3" style={{ color: '#ffffff' }}>
                                        New Arrivals
                                    </h3>
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white group-hover:text-[#B8975A] transition-colors">
                                        See What&apos;s New
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Bottom row — 3 equal tiles */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 mt-4 lg:mt-5">
                        {[
                            {
                                label: 'Occasion Wear',
                                title: 'Festive & Party',
                                desc: 'Dress to impress for every celebration.',
                                href: '/products?category=Festive',
                                img: CATEGORY_IMAGES.festive,
                            },
                            {
                                label: 'Everyday Comfort',
                                title: 'Casual Wear',
                                desc: 'Relaxed styles for your daily routine.',
                                href: '/products?category=Casual',
                                img: CATEGORY_IMAGES.casual,
                            },
                            {
                                label: 'Premium Collection',
                                title: 'Bridal & Formal',
                                desc: 'Exquisite pieces for your most special moments.',
                                href: '/products?category=Bridal',
                                img: CATEGORY_IMAGES.bridal,
                            },
                        ].map((tile) => (
                            <Link
                                key={tile.title}
                                href={tile.href}
                                className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden min-h-[200px] flex flex-col justify-end p-6 block"
                            >
                                <Image src={tile.img} alt={tile.title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/45 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

                                <div className="relative z-10">
                                    <span className="text-xs font-medium tracking-widest uppercase text-[#B8975A] mb-1.5 block">
                                        {tile.label}
                                    </span>
                                    <h3 className="text-xl font-playfair font-semibold mb-1.5" style={{ color: '#ffffff' }}>
                                        {tile.title}
                                    </h3>
                                    <p className="text-xs text-white/70 mb-3 leading-relaxed">{tile.desc}</p>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white group-hover:text-[#B8975A] transition-colors">
                                        Shop Now
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-playfair font-semibold text-[#1A1A1A] mb-2">
                            Why Shop at ClothingBrand?
                        </h2>
                        <p className="text-sm text-[#717171]">
                            What makes our boutique different
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Curated Styles',
                                desc: 'Each piece is hand-selected to ensure premium quality, great fit, and timeless style.',
                            },
                            {
                                title: 'Authentic Fabrics',
                                desc: 'We source premium textiles and fabrics from trusted artisans across India.',
                            },
                            {
                                title: 'Every Occasion',
                                desc: 'From everyday casuals to festive ethnic wear — we have styles for every moment.',
                            },
                        ].map((item, index) => (
                            <div key={index} className="text-center p-6">
                                <div className="w-12 h-12 bg-[#F5F0EB] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-lg font-semibold text-[#B8975A]">{index + 1}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
                                <p className="text-sm text-[#717171] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instagram CTA */}
            <section className="py-16 lg:py-20 bg-[#F5F0EB] relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#1A1A1A]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1A1A1A]/10 rounded-full translate-x-1/3 translate-y-1/3" />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#1A1A1A]/5 rounded-full" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">
                            Join Our Community
                        </h2>
                        <p className="text-[#4A4A4A] mb-8 text-lg">
                            Follow us on Instagram for new arrivals, exclusive offers, behind-the-scenes, and styling inspiration.
                        </p>
                        <a
                            href="https://www.instagram.com/clothingbrand"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F77737] via-[#E1306C] to-[#C13584] text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            @clothingbrand
                        </a>
                        <p className="mt-6 text-[#717171] text-sm">
                            Join for daily inspiration
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
