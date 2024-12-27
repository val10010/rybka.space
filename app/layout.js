import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from 'next/script';
import "./globals.scss";
import styles from "./page.module.scss";

export const metadata = {
    title: "Купити жіночі спортивні костюми | Rybka Space",
    description: "⭐ Великий вибір жіночих спортивних костюмів в інтернет-магазині Rybka Space ✅ Висока якість ✅ Швидка доставка по Україні ✅ Приємні ціни ✅ Зручна оплата",
    keywords: "жіночі спортивні костюми, спортивний одяг для жінок, купити спортивний костюм, жіночий спортивний костюм, спортивні костюми україна, модний спортивний одяг",
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

    return (
        <html lang="uk">
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
