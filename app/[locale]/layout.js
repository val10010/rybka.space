import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from 'next/script';
import SchemaOrganization from "@/components/SchemaOrganization";

import "../globals.scss";
import styles from "./page.module.scss";

export function generateStaticParams() {
    return [{locale: 'uk'}, {locale: 'ru'}];
}

export async function generateMetadata({ params: { locale } }) {
    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return {
        title: messages.common.title,
        description: messages.common.description,
        keywords: "жіночі спортивні костюми, спортивний одяг для жінок, купити спортивний костюм, жіночий спортивний костюм, спортивні костюми україна, модний спортивний одяг, спортивні костюми Ізмаїл, жіночий одяг, спортивний стиль",
        alternates: {
            canonical: 'https://rybkaspace.com',
            languages: {
                'uk': 'https://rybkaspace.com',
                'ru': 'https://rybkaspace.com/ru'
            }
        },
        verification: {
            google: 'cC-cUeg7EzhhRc8HKzvNBwzU1zBro8xgdf9Lc-ABfpM',
        },
        openGraph: {
            title: messages.common.title,
            description: messages.common.description,
            type: 'website',
            locale: locale === 'uk' ? 'uk_UA' : 'ru_RU',
            url: 'https://rybkaspace.com',
            siteName: 'Rybka Space',
            images: [
                {
                    url: 'https://rybkaspace.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: messages.common.title,
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
            title: messages.common.title,
            description: messages.common.description,
            images: ['https://rybkaspace.com/og-image.jpg'],
        }
    };
}

export default async function LocaleLayout({children, params: {locale}}) {
    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <div className={styles.wrapper}>
                        <Header />
                        <main className={styles.main}>
                            {children}
                        </main>
                        <Footer />
                    </div>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX`}
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-XXXXXXXX');
                        `}
                    </Script>
                    <SchemaOrganization />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
