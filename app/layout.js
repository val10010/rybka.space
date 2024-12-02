import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from 'next/script';
import "./globals.scss";
import styles from "./page.module.scss";

export const metadata = {
    title: "rybka.space",
    description: "твій особистий space краси та комфорту"
};

export default function RootLayout({ children }) {
    const isDev = process.env.NODE_ENV === 'development';

    const Analytics = () => {
        if (isDev) return null;

        return (
            <>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-EKSSB3ELFW"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-EKSSB3ELFW');
                    `}
                </Script>
            </>
        );
    };

    return (
        <html lang="uk">
        <body>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-16799720217"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-16799720217');
            `}
        </Script>
        <Analytics />
        <Header/>
        <main className={styles.main}>
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
