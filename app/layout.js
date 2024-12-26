import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from 'next/script';
import "./globals.scss";
import styles from "./page.module.scss";

export const metadata = {
    title: "Rybka Space | Стильний жіночий одяг | Casual костюми",
    description: "Інтернет-магазин стильного жіночого одягу Rybka Space ✅ Модні костюми в стилі casual ✅ Висока якість ✅ Швидка доставка ✅ Приємні ціни",
    keywords: "жіночий одяг, casual костюми, модний одяг, жіночі костюми, інтернет магазин одягу, купити жіночий одяг",
    alternates: {
        canonical: 'https://rybka.space',
        languages: {
            'uk': 'https://rybka.space'
        }
    },
    verification: {
        google: 'cC-cUeg7EzhhRc8HKzvNBwzU1zBro8xgdf9Lc-ABfpM',
    },
    openGraph: {
        title: 'Rybka Space | Стильний жіночий одяг | Casual костюми',
        description: 'Інтернет-магазин стильного жіночого одягу Rybka Space ✅ Модні костюми в стилі casual ✅ Висока якість ✅ Швидка доставка ✅ Приємні ціни',
        type: 'website',
        locale: 'uk_UA',
        url: 'https://rybka.space',
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

    return (
        <html lang="uk">
        <Analytics/>
        <body>
        <Header/>
        <main className={styles.main}>
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
