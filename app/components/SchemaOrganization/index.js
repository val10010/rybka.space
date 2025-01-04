import reviews from '@/mocks/reviews.json';

const SchemaOrganization = () => {
    const calculateAggregateRating = () => {
        const ratings = reviews.reviews.map(review => review.rating);
        const averageRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
        return {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "reviewCount": reviews.reviews.length.toString(),
            "bestRating": "5",
            "worstRating": "1"
        };
    };

    const formatReviews = () => {
        return reviews.reviews.map(review => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": review.author
            },
            "datePublished": review.date,
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating.toString()
            },
            "reviewBody": review.text
        }));
    };

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
        "aggregateRating": calculateAggregateRating(),
        "review": formatReviews()
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
    );
};

export default SchemaOrganization;
