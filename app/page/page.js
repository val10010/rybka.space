import Products from './components/products';

export const metadata = {
    title: 'Жіночі спортивні костюми | Rybka.Space',
    description: 'Великий вибір жіночих спортивних костюмів. Якісні матеріали, стильний дизайн, комфортні ціни.',
    openGraph: {
        title: 'Жіночі спортивні костюми | Rybka.Space',
        description: 'Великий вибір жіночих спортивних костюмів. Якісні матеріали, стильний дизайн, комфортні ціни.',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Жіночі спортивні костюми',
            },
        ],
    }
};

export default function Page() {
    return <Products />;
}
