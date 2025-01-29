import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '../../i18n/routing';
import Header from "@/components/header";
import Footer from "@/components/footer";
import TelegramButton from "@/components/TelegramButton";
import Script from 'next/script';
import SchemaOrganization from "@/components/SchemaOrganization";

import "../globals.scss";
import styles from "./page.module.scss";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

async function getMessages(locale) {
    try {
        return (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }
}

export async function generateMetadata({ params: { locale } }) {
    const messages = await getMessages(locale);

    return {
        title: messages.meta.title,
        description: messages.meta.description,
        keywords: messages.meta.keywords,
        alternates: {
            canonical: 'https://rybkaspace.com',
            languages: {
                'uk-UA': 'https://rybkaspace.com/uk',
                'ru-RU': 'https://rybkaspace.com/ru',
            },
        },
        verification: {
            google: 'cC-cUeg7EzhhRc8HKzvNBwzU1zBro8xgdf9Lc-ABfpM',
        },
        openGraph: {
            title: messages.meta.title,
            description: messages.meta.description,
            type: 'website',
            locale: locale === 'uk' ? 'uk_UA' : 'ru_RU',
            url: 'https://rybkaspace.com',
            siteName: 'Rybka Space',
            images: [
                {
                    url: 'https://rybkaspace.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: messages.meta.title,
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
            title: messages.meta.title,
            description: messages.meta.description,
            images: ['https://rybkaspace.com/og-image.jpg'],
        }
    };
}

export default async function LocaleLayout({children, params: {locale}}) {
    // Validate the incoming `locale` parameter
    if (!routing.locales.includes(locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    const messages = await getMessages(locale);

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <div className={styles.wrapper}>
                        <Header />
                        <main className={styles.main}>
                            {children}
                        </main>
                        <Footer />
                        <TelegramButton />
                    </div>
                    {/*<Script*/}
                    {/*    src="https://www.googletagmanager.com/gtag/js?id=G-K03JMHQMNL"*/}
                    {/*/>*/}
                    {/*<Script id="google-analytics" strategy="afterInteractive">*/}
                    {/*    {`*/}
                    {/*    window.dataLayer = window.dataLayer || [];*/}
                    {/*    function gtag(){dataLayer.push(arguments);}*/}
                    {/*    gtag('js', new Date());*/}
                    {/*    gtag('config', 'G-K03JMHQMNL', {*/}
                    {/*        page_path: window.location.pathname,*/}
                    {/*        custom_map: {*/}
                    {/*            'dimension1': 'product_category',*/}
                    {/*            'dimension2': 'search_term',*/}
                    {/*            'dimension3': 'user_region'*/}
                    {/*        }*/}
                    {/*    });*/}
                    {/*    */}
                    {/*    // Отслеживание поисковых запросов*/}
                    {/*    function trackSearch(searchTerm) {*/}
                    {/*        gtag('event', 'search', {*/}
                    {/*            search_term: searchTerm,*/}
                    {/*            page_location: window.location.href*/}
                    {/*        });*/}
                    {/*    }*/}
                    {/*    */}
                    {/*    // Отслеживание просмотров товаров*/}
                    {/*    function trackProductView(productData) {*/}
                    {/*        gtag('event', 'view_item', {*/}
                    {/*            items: [{*/}
                    {/*                item_id: productData.id,*/}
                    {/*                item_name: productData.name.uk,*/}
                    {/*                item_category: 'Спортивні костюми',*/}
                    {/*                price: productData.price*/}
                    {/*            }]*/}
                    {/*        });*/}
                    {/*    }*/}
                    {/*`}*/}
                    {/*</Script>*/}
                    <SchemaOrganization />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
