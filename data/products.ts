
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
    {
        id: '1',
        name: 'Silk Embroidered Kurta',
        description: 'A beautifully hand-embroidered silk kurta with intricate floral motifs. Perfect for festive occasions and celebrations.',
        price: 2200,
        categories: ['Ethnic Wear'],
        images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0'],
        isNew: true,
    },
    {
        id: '2',
        name: 'Cotton Anarkali Suit',
        description: 'A graceful anarkali suit in breathable cotton fabric, adorned with subtle block print detailing. Elegant and comfortable.',
        price: 1800,
        categories: ['Ethnic Wear'],
        images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0'],
    },
    {
        id: '3',
        name: 'Block Print Saree',
        description: 'Handcrafted block print saree in soft cotton silk. Each piece is unique, reflecting the artistry of traditional Indian textile craft.',
        price: 3500,
        categories: ['Sarees'],
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0'],
        isNew: true,
    },
    {
        id: '4',
        name: "Men's Linen Kurta",
        description: 'A clean, minimal linen kurta for the modern man. Breathable, relaxed fit — ideal for both casual wear and festive occasions.',
        price: 1200,
        categories: ["Men's Wear"],
        images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0'],
    },
    {
        id: '5',
        name: 'Casual Palazzo Set',
        description: 'A breezy co-ord palazzo set in printed georgette. Relaxed silhouette with a contemporary ethnic feel — perfect for everyday wear.',
        price: 950,
        categories: ['Western Wear'],
        images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0'],
    },
    {
        id: '6',
        name: 'Festive Lehenga Set',
        description: 'A richly embellished lehenga choli set with mirror work and hand embroidery. Crafted for weddings, receptions, and grand celebrations.',
        price: 5500,
        categories: ['Party Wear'],
        images: ['https://images.unsplash.com/photo-1597983073493-88cd2c042b37?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0'],
        isNew: true,
    },
];
