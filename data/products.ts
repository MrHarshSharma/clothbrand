
export interface Product {
    id: string | number;
    name: string;
    description: string;
    price: number;
    categories: string[];
    images: string[];
    isNew?: boolean;
    product_type?: 'simple' | 'variable';
    variations?: Array<{
        id: string;
        name: string;
        price: number;
        stock?: number;
        sku?: string;
        is_default?: boolean;
    }>;
}

export const products: Product[] = [
    // ── Skincare ──────────────────────────────────────────
    {
        id: '1',
        name: 'Vitamin C Brightening Serum',
        description: JSON.stringify({
            productDescription: 'A lightweight, fast-absorbing serum packed with 15% Vitamin C to brighten skin tone, reduce dark spots, and boost radiance. Suitable for all skin types.',
            productDetails: '• 30ml / 1 fl oz\n• Dermatologist tested\n• Cruelty free & vegan\n• Paraben free\n• Suitable for all skin types',
            ingredients: 'Ascorbic Acid (Vitamin C) 15%, Niacinamide 5%, Hyaluronic Acid, Ferulic Acid, Tocopherol (Vitamin E), Aqua',
            howToUse: 'Apply 3–4 drops onto clean, dry skin every morning. Gently pat into face and neck. Follow with moisturizer and SPF for best results.',
        }),
        price: 599,
        categories: ['Skincare'],
        images: [
            'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?fm=jpg&q=60&w=800',
            'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?fm=jpg&q=60&w=800',
        ],
        isNew: true,
    },
    {
        id: '2',
        name: 'Hydrating Moisturizer SPF 30',
        description: JSON.stringify({
            productDescription: 'A daily moisturizer with broad-spectrum SPF 30 protection. Deeply hydrates for up to 24 hours while shielding your skin from sun damage.',
            productDetails: '• 50ml / 1.7 fl oz\n• SPF 30 broad spectrum\n• Non-greasy, lightweight formula\n• Dermatologist tested\n• Cruelty free',
            ingredients: 'Zinc Oxide, Titanium Dioxide, Glycerin, Shea Butter, Hyaluronic Acid, Aloe Vera Extract, Niacinamide, Aqua',
            howToUse: 'Apply generously to face and neck every morning as the last step of your skincare routine. Reapply every 2 hours when outdoors.',
        }),
        price: 449,
        categories: ['Skincare'],
        images: [
            'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?fm=jpg&q=60&w=800',
            'https://images.unsplash.com/photo-1556228578-8c89e6adf883?fm=jpg&q=60&w=800',
        ],
    },
    {
        id: '3',
        name: 'Niacinamide Foaming Face Wash',
        description: JSON.stringify({
            productDescription: 'A gentle foaming cleanser with 5% Niacinamide that minimizes pores, controls oil, and leaves skin feeling clean and refreshed without over-drying.',
            productDetails: '• 100ml / 3.4 fl oz\n• 5% Niacinamide\n• Sulfate free\n• pH balanced\n• Suitable for oily & combination skin',
            ingredients: 'Niacinamide 5%, Zinc PCA, Cocamidopropyl Betaine, Glycerin, Salicylic Acid 0.5%, Aloe Vera, Aqua',
            howToUse: 'Wet face with water. Apply a small amount and lather into a gentle foam. Massage over face for 60 seconds, then rinse thoroughly. Use twice daily.',
        }),
        price: 299,
        categories: ['Skincare'],
        images: [
            'https://images.unsplash.com/photo-1556228578-8c89e6adf883?fm=jpg&q=60&w=800',
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?fm=jpg&q=60&w=800',
        ],
        isNew: true,
    },

    // ── Makeup ────────────────────────────────────────────
    {
        id: '4',
        name: 'HD Full Coverage Foundation',
        description: JSON.stringify({
            productDescription: 'A buildable, long-wear liquid foundation that delivers flawless full coverage. Lightweight formula blends seamlessly for a natural, skin-like finish that lasts 16 hours.',
            productDetails: '• 30ml / 1 fl oz\n• 16-hour wear\n• Oil free & non-comedogenic\n• Available in 4 shades\n• Dermatologist tested',
            ingredients: 'Cyclopentasiloxane, Dimethicone, Water, Titanium Dioxide, Iron Oxides, Glycerin, Niacinamide, Tocopheryl Acetate',
            howToUse: 'Apply with a damp sponge or foundation brush starting from the center of the face and blending outward. Build coverage as needed. Set with powder for longer wear.',
        }),
        price: null as unknown as number,
        categories: ['Makeup'],
        images: [
            'https://images.unsplash.com/photo-1604654894610-df63bc536371?fm=jpg&q=60&w=800',
            'https://images.unsplash.com/photo-1503236823255-94609f598e71?fm=jpg&q=60&w=800',
        ],
        isNew: true,
        product_type: 'variable',
        variations: [
            { id: 'v1', name: 'Ivory', price: 699, stock: 20, is_default: true },
            { id: 'v2', name: 'Beige', price: 699, stock: 15 },
            { id: 'v3', name: 'Caramel', price: 699, stock: 18 },
            { id: 'v4', name: 'Mocha', price: 699, stock: 12 },
        ],
    },
    {
        id: '5',
        name: '12-Pan Eyeshadow Palette',
        description: JSON.stringify({
            productDescription: 'A versatile palette with 12 highly pigmented shades — from soft neutrals to bold smoky tones. Blendable, long-lasting, and buildable for every eye look.',
            productDetails: '• 12 shades — 8 matte, 4 shimmer\n• Net weight: 14.4g\n• Long-lasting up to 10 hours\n• Cruelty free & vegan\n• Mirror included',
            ingredients: 'Mica, Talc, Magnesium Stearate, Dimethicone, Iron Oxides, Ultramarines, Carmine, Titanium Dioxide',
            howToUse: 'Apply lighter shades on the lid as a base. Build intensity with darker tones in the crease. Use shimmer shades on the inner corner for a pop. Blend well for a seamless finish.',
        }),
        price: 799,
        categories: ['Makeup'],
        images: [
            'https://images.unsplash.com/photo-1596462502278-27bfdc403348?fm=jpg&q=60&w=800',
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?fm=jpg&q=60&w=800',
        ],
    },
    {
        id: '6',
        name: 'Precision Liquid Eyeliner',
        description: JSON.stringify({
            productDescription: 'An ultra-fine tip liquid eyeliner for sharp, precise lines. Smudge-proof, waterproof, and long-lasting formula for all-day wear without fading.',
            productDetails: '• 1.2ml\n• Ultra-fine 0.1mm tip\n• Waterproof & smudge-proof\n• 24-hour wear\n• Quick-dry formula',
            ingredients: 'Water, Acrylates Copolymer, Carbon Black (CI 77266), Glycerin, Propylene Glycol, Phenoxyethanol',
            howToUse: 'Starting from the inner corner, draw a thin line along the lash line. For a winged look, extend the line upward at the outer corner. Allow to dry before opening eyes fully.',
        }),
        price: 199,
        categories: ['Makeup'],
        images: [
            'https://images.unsplash.com/photo-1583241475880-083f84372725?fm=jpg&q=60&w=800',
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?fm=jpg&q=60&w=800',
        ],
    },

    // ── Lip Color ─────────────────────────────────────────
    {
        id: '7',
        name: 'Velvet Matte Lipstick',
        description: JSON.stringify({
            productDescription: 'A rich, creamy matte lipstick with intense color payoff in a single swipe. Comfortable to wear, non-drying formula infused with Vitamin E that lasts up to 8 hours.',
            productDetails: '• 3.5g\n• 8-hour wear\n• Non-drying matte formula\n• Infused with Vitamin E\n• Available in 4 shades',
            ingredients: 'Isododecane, Trimethylsiloxysilicate, Dimethicone, Vitamin E (Tocopherol), Caprylic/Capric Triglyceride, Iron Oxides, Mica',
            howToUse: 'Line lips first for a defined look. Apply directly from the bullet, starting at the cupids bow and filling inward. Blot with tissue for a more matte finish. Reapply as needed.',
        }),
        price: null as unknown as number,
        categories: ['Lip Color'],
        images: [
            'https://images.unsplash.com/photo-1631214499066-c0e3f1f2a8d5?fm=jpg&q=60&w=800',
            'https://images.unsplash.com/photo-1526045612212-70caf35c14df?fm=jpg&q=60&w=800',
        ],
        isNew: true,
        product_type: 'variable',
        variations: [
            { id: 'v1', name: 'Ruby Red', price: 299, stock: 25, is_default: true },
            { id: 'v2', name: 'Nude Pink', price: 299, stock: 30 },
            { id: 'v3', name: 'Berry Plum', price: 299, stock: 20 },
            { id: 'v4', name: 'Coral', price: 299, stock: 18 },
        ],
    },
    {
        id: '8',
        name: 'Glossy Lip Tint',
        description: JSON.stringify({
            productDescription: 'A sheer, buildable lip tint with a high-shine glossy finish. Infused with Vitamin E and Jojoba Oil for soft, moisturized lips all day long.',
            productDetails: '• 5ml\n• High-shine finish\n• Moisturizing formula\n• Non-sticky\n• Cruelty free & vegan',
            ingredients: 'Polybutene, Hydrogenated Polyisobutene, Octyldodecanol, Jojoba Seed Oil, Vitamin E, Castor Oil, Flavor',
            howToUse: 'Apply directly from the wand to lips. Layer for more color intensity or wear alone over bare lips for a natural glossy look. Reapply as desired throughout the day.',
        }),
        price: 249,
        categories: ['Lip Color'],
        images: [
            'https://images.unsplash.com/photo-1586495777744-4e6232bf2a0b?fm=jpg&q=60&w=800',
            'https://images.unsplash.com/photo-1631214499066-c0e3f1f2a8d5?fm=jpg&q=60&w=800',
        ],
    },

    // ── Everyday Essentials ───────────────────────────────
    {
        id: '9',
        name: 'BB Cream with SPF 25',
        description: JSON.stringify({
            productDescription: 'An all-in-one BB cream that moisturizes, primes, covers blemishes, and protects with SPF 25. Lightweight tinted formula for an effortless, no-makeup makeup look.',
            productDetails: '• 30ml / 1 fl oz\n• SPF 25 PA++\n• 5-in-1: Moisturizer, Primer, Coverage, SPF, Glow\n• Available in 3 shades\n• Dermatologist tested',
            ingredients: 'Zinc Oxide, Titanium Dioxide, Glycerin, Niacinamide, Hyaluronic Acid, Centella Asiatica Extract, Iron Oxides, Aqua',
            howToUse: 'Apply a small amount to clean, moisturized skin. Blend with fingertips or a sponge starting from the center of the face outward. Build for more coverage if desired.',
        }),
        price: null as unknown as number,
        categories: ['Everyday'],
        images: [
            'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?fm=jpg&q=60&w=800',
            'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?fm=jpg&q=60&w=800',
        ],
        product_type: 'variable',
        variations: [
            { id: 'v1', name: 'Light', price: 399, stock: 20, is_default: true },
            { id: 'v2', name: 'Medium', price: 399, stock: 25 },
            { id: 'v3', name: 'Tan', price: 399, stock: 18 },
        ],
    },
    {
        id: '10',
        name: 'Translucent Setting Powder',
        description: JSON.stringify({
            productDescription: 'A finely milled translucent powder that sets makeup, controls shine, and minimizes the appearance of pores for a smooth, airbrushed, long-lasting finish.',
            productDetails: '• 8g\n• Translucent — suits all skin tones\n• Controls oil for up to 8 hours\n• Finely milled, lightweight formula\n• Cruelty free',
            ingredients: 'Silica, Talc, Nylon-12, Dimethicone, Lauroyl Lysine, Magnesium Myristate, Bismuth Oxychloride',
            howToUse: 'Using a fluffy powder brush, lightly dust over face after applying foundation or BB cream. Focus on the T-zone to control shine. Can also be used for touch-ups throughout the day.',
        }),
        price: 349,
        categories: ['Everyday'],
        images: [
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?fm=jpg&q=60&w=800',
            'https://images.unsplash.com/photo-1571781565036-d3f759be73e4?fm=jpg&q=60&w=800',
        ],
        isNew: true,
    },
]
