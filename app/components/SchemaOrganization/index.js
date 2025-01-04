import reviews from '@/mocks/reviews.json';

const SchemaOrganization = () => {
    const { reviews: reviewsList } = reviews;
    const hasReviews = reviewsList && reviewsList.length > 0;
    const averageRating = hasReviews 
        ? (reviewsList.reduce((acc, review) => acc + review.rating, 0) / reviewsList.length).toFixed(1)
        : null;

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Rybka Space",
        "url": "https://rybkaspace.com",
        "logo": {
            "@type": "ImageObject",
            "url": "https://rybkaspace.com/images/logo.svg",
            "width": "180",
            "height": "60"
        },
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
            "contactType": "customer support",
            "email": "support@rybkaspace.com",
            "availableLanguage": ["Ukrainian"]
        },
        "sameAs": [
            "https://www.instagram.com/rybka.space",
            "https://www.facebook.com/profile.php?id=61566339753971",
            "https://www.tiktok.com/@rybka.space"
        ],
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
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "UAH",
            "lowPrice": "1360",
            "highPrice": "1800",
            "offerCount": "50",
            "offers": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": "Спортивний костюм жіночий",
                        "description": "Високоякісний спортивний костюм для активних жінок",
                        "brand": {
                            "@type": "Brand",
                            "name": "Rybka Space"
                        }
                    },
                    "price": "1360",
                    "priceCurrency": "UAH",
                    "availability": "https://schema.org/InStock",
                    "url": "https://rybkaspace.com/product/24"
                }
            ]
        }
    };

    if (hasReviews) {
        organizationSchema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "reviewCount": reviewsList.length.toString(),
            "bestRating": "5",
            "worstRating": "1"
        };
        
        organizationSchema.review = reviewsList.map(review => ({
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating.toString(),
                "bestRating": "5",
                "worstRating": "1"
            },
            "author": {
                "@type": "Person",
                "name": review.author
            },
            "datePublished": review.date,
            "reviewBody": review.text
        }));
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema)
            }}
        />
    );
};

export default SchemaOrganization;
