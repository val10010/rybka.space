import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from 'next/script';
import SchemaOrganization from "@/components/SchemaOrganization";

import "../globals.scss";
import styles from "./page.module.scss";

export function generateStaticParams() {
    return [{locale: 'en'}, {locale: 'uk'}];
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
