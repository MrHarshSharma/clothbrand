'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Heart, ShieldCheck, Users, Sparkles, ArrowRight, Award, Shirt, Clock } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

// Animated Counter Component
function AnimatedCounter({
    value,
    suffix = '',
    duration = 2000
}: {
    value: number
    suffix?: string
    duration?: number
}) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (!isInView) return

        let startTime: number
        let animationFrame: number

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)

            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * value))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            } else {
                setCount(value)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrame)
    }, [isInView, value, duration])

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    )
}

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-[#F5F0EB] pt-16 pb-16 md:pt-24 md:pb-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-2 bg-white text-[#B8975A] text-sm font-medium rounded-full mb-6">
                                Since 1986
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight">
                                Our Heritage, <span className="text-[#B8975A]">Your Style</span>
                            </h1>
                            <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed">
                                Elevated style rooted in tradition. A refined expression of fashion and heritage — dressing generations since 1986.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center p-4">
                                <Image
                                    src="/logo.png"
                                    alt="Shivshakti Boutique"
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-[#1A1A1A] text-white p-6 rounded-xl shadow-lg hidden md:block">
                                <p className="text-3xl font-bold">38+</p>
                                <p className="text-sm opacity-90">Years of Style</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">The Shivshakti Journey</h2>
                            <div className="w-16 h-1 bg-[#B8975A] rounded-full" />
                            <div className="text-[#4A4A4A] space-y-4 leading-relaxed">
                                <p>
                                    Shivshakti was born in Nagpur in 1986 — a name built on trust, quality, and a genuine love for the people we serve. Over nearly four decades, we have woven ourselves into the fabric of this city, earning the loyalty of families across generations.
                                </p>
                                <p>
                                    In 2015, we brought that same passion into the world of boutique fashion. What began as a small curated collection soon grew into a full-fledged clothing boutique — stocking handpicked ethnic wear, contemporary styles, and everything in between, sourced directly from skilled artisans and weavers across India.
                                </p>
                                <p>
                                    Today, Shivshakti is more than a store. It is a place where tradition meets style, where every kurta, saree, and outfit tells a story. We believe clothing should feel as good as it looks — and we curate every piece with that belief at heart.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-[#F8F8F8] border-y border-[#EBEBEB]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: 38, suffix: "+", label: "Years of Trust" },
                            { value: 10000, suffix: "+", label: "Happy Customers" },
                            { value: 500, suffix: "+", label: "Styles Curated" },
                            { value: 100, suffix: "%", label: "Quality Assured" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <p className="text-3xl md:text-4xl font-bold text-[#B8975A]">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2000} />
                                </p>
                                <p className="text-[#717171] mt-1">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">What We Stand For</h2>
                        <p className="text-[#717171] max-w-2xl mx-auto">
                            Our values shape every piece we stock, every fabric we choose, and every customer we dress.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <ShieldCheck className="h-7 w-7" />,
                                title: "Authentic Quality",
                                description: "We work directly with weavers, artisans, and trusted textile suppliers — so every piece that reaches you meets our standard of quality."
                            },
                            {
                                icon: <Heart className="h-7 w-7" />,
                                title: "Thoughtful Curation",
                                description: "Every style in our boutique is hand-selected with an eye for craftsmanship, wearability, and lasting appeal. No fast fashion, only pieces worth keeping."
                            },
                            {
                                icon: <Users className="h-7 w-7" />,
                                title: "Customer First",
                                description: "From helping you find the right size to styling advice for a special occasion — our customers are at the heart of everything we do."
                            }
                        ].map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="p-8 rounded-xl bg-[#F8F8F8] border border-[#EBEBEB] hover:border-[#B8975A]/20 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-[#F5F0EB] rounded-xl flex items-center justify-center mb-6 text-[#B8975A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors duration-300">
                                    {v.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[#1A1A1A]">{v.title}</h3>
                                <p className="text-[#717171] leading-relaxed">
                                    {v.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 md:py-24 bg-[#F8F8F8]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Why Shop at Shivshakti?</h2>
                            <p className="text-[#4A4A4A] mb-8 leading-relaxed">
                                We are not just a clothing store — we are a boutique built on four decades of trust. Here is what sets us apart from the rest.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { icon: <Award className="h-5 w-5" />, text: "Hand-selected styles sourced directly from Indian weavers and artisans" },
                                    { icon: <Shirt className="h-5 w-5" />, text: "Premium fabrics — cotton, silk, linen, and heritage handloom textiles" },
                                    { icon: <Clock className="h-5 w-5" />, text: "Fast, careful delivery so your outfit arrives in perfect condition" },
                                    { icon: <Heart className="h-5 w-5" />, text: "Personalized styling guidance — because every body and occasion is unique" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-10 h-10 bg-[#1A1A1A] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <p className="text-[#4A4A4A]">{item.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-[1/1] rounded-2xl overflow-hidden shadow-lg bg-white"
                        >
                            <Image
                                src="/logo.png"
                                alt="Shivshakti Boutique Collection"
                                fill
                                className="object-contain p-4"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-[#1A1A1A]">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Sparkles className="h-10 w-10 text-[#B8975A] mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dressed in Excellence</h2>
                            <p className="text-white/70 text-lg mb-8 leading-relaxed">
                                Thoughtfully curated, beautifully crafted, and defined by uncompromising quality in every stitch. Find your style at Shivshakti.
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white font-semibold rounded-lg hover:bg-[#2C2C2C] transition-colors"
                            >
                                Explore Collections <ArrowRight className="h-5 w-5" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
