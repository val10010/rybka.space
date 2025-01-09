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
        ]
    };

    if (hasReviews) {
        organizationSchema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "reviewCount": reviewsList.length
        };
        
        // Add the most recent review
        if (reviewsList.length > 0) {
            organizationSchema.review = {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": reviewsList[0].rating,
                    "bestRating": 5
                },
                "author": {
                    "@type": "Person",
                    "name": reviewsList[0].author
                }
            };
        }
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
