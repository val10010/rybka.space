import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from 'next/script';
import "./globals.scss";
import styles from "./page.module.scss";

export const metadata = {
    title: "Купити жіночі спортивні костюми | Rybka Space",
    description: "⭐ Великий вибір жіночих спортивних костюмів в інтернет-магазині Rybka Space ✅ Висока якість ✅ Швидка доставка по Україні ✅ Приємні ціни ✅ Зручна оплата",
    keywords: "жіночі спортивні костюми, спортивний одяг для жінок, купити спортивний костюм, жіночий спортивний костюм, спортивні костюми україна, модний спортивний одяг, спортивні костюми Ізмаїл, жіночий одяг, спортивний стиль",
    alternates: {
        canonical: 'https://rybkaspace.com',
        languages: {
            'uk': 'https://rybkaspace.com'
        }
    },
    verification: {
        google: 'cC-cUeg7EzhhRc8HKzvNBwzU1zBro8xgdf9Lc-ABfpM',
    },
    openGraph: {
        title: 'Купити жіночі спортивні костюми | Rybka Space',
        description: '⭐ Великий вибір жіночих спортивних костюмів в інтернет-магазині Rybka Space ✅ Висока якість ✅ Швидка доставка по Україні ✅ Приємні ціни ✅ Зручна оплата',
        type: 'website',
        locale: 'uk_UA',
        url: 'https://rybkaspace.com',
        siteName: 'Rybka Space',
        images: [
            {
                url: 'https://rybkaspace.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Жіночі спортивні костюми Rybka Space',
            }
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Купити жіночі спортивні костюми | Rybka Space',
        description: '⭐ Великий вибір жіночих спортивних костюмів в інтернет-магазині Rybka Space',
        images: ['https://rybkaspace.com/og-image.jpg'],
    }
};

export default function RootLayout({ children }) {
    const isDev = process.env.NODE_ENV === 'development';

    const Analytics = () => {
        if (isDev) return null;

        return (
            <>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-K03JMHQMNL"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-K03JMHQMNL');
                    `}
                </Script>
            </>
        );
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Rybka Space",
        "url": "https://rybkaspace.com",
        "logo": "https://rybkaspace.com/images/logo.svg",
        "description": "Інтернет-магазин жіночих спортивних костюмів Rybka Space. Високоякісний одяг для активних жінок.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "проспект Миру, 36",
            "addressLocality": "Ізмаїл",
            "addressRegion": "Одеська область",
            "postalCode": "68600",
            "addressCountry": "UA"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "support@rybkaspace.com",
            "availableLanguage": ["Ukrainian"]
        },
        "sameAs": [
            "https://www.instagram.com/rybka.space",
            "https://www.facebook.com/profile.php?id=61566339753971",
            "https://www.tiktok.com/@rybka.space"
        ],
        "priceRange": "₴₴",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://rybkaspace.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150"
        },
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "UAH",
            "lowPrice": "1360",
            "highPrice": "1800",
            "offerCount": "50"
        }
    };

    return (
        <html lang="uk">
        <head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#000000" />
            <link rel="apple-touch-icon" href="/images/icon-192x192.png" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </head>
        <Analytics/>
        <body>
        <a href="#main-content" className="skip-link visually-hidden">
            Перейти до основного вмісту
        </a>
        <Header/>
        <main id="main-content" className={styles.main} role="main">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
