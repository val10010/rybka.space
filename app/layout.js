import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from 'next/script';
import SchemaOrganization from "@/components/SchemaOrganization";
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
                        gtag('config', 'G-K03JMHQMNL', {
                            page_path: window.location.pathname,
                            custom_map: {
                                'dimension1': 'product_category',
                                'dimension2': 'search_term',
                                'dimension3': 'user_region'
                            }
                        });
                        
                        // Отслеживание поисковых запросов
                        function trackSearch(searchTerm) {
                            gtag('event', 'search', {
                                search_term: searchTerm,
                                page_location: window.location.href
                            });
                        }
                        
                        // Отслеживание просмотров товаров
                        function trackProductView(productData) {
                            gtag('event', 'view_item', {
                                items: [{
                                    item_id: productData.id,
                                    item_name: productData.name,
                                    item_category: 'Спортивні костюми',
                                    price: productData.price
                                }]
                            });
                        }
                    `}
                </Script>
                <Script id="hotjar" strategy="afterInteractive">
                    {`(function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:5256627,hjsv:6};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
                </Script>
            </>
        );
    };

    return (
        <html lang="uk">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#000000" />
                <link rel="apple-touch-icon" href="/images/icon-192x192.png" />
                <SchemaOrganization />
            </head>
            <body>
                <Analytics />
                <a href="#main-content" className="skip-link visually-hidden">
                    Перейти до основного вмісту
                </a>
                <Header />
                <main id="main-content" className={styles.main} role="main">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
