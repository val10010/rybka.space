import reviewsData from '@/mocks/reviews.json';

export default function SchemaProduct({ product }) {
    const { reviews } = reviewsData;
    const hasReviews = reviews && reviews.length > 0;
    const averageRating = hasReviews 
        ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
        : null;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `${product.name} ${product.currentColor}`,
        "description": product.info.desc,
        "image": product.images.map(img => `https://rybkaspace.com/images/products/${product.id}/${img}.jpg`),
        "sku": `RS-${product.id}`,
        "mpn": `RSP-${product.id}-${product.currentColor}`,
        "brand": {
            "@type": "Brand",
            "name": "Rybka Space"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://rybkaspace.com/product/${product.id}`,
            "priceCurrency": "UAH",
            "price": product.price,
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            "itemCondition": "https://schema.org/NewCondition",
            "availability": product.disabled ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Rybka Space"
            }
        }
    };

    if (hasReviews) {
        schemaData.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "reviewCount": reviews.length,
            "bestRating": "5",
            "worstRating": "1"
        };
        
        schemaData.review = reviews.map(review => ({
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
                __html: JSON.stringify(schemaData)
            }}
        />
    );
}
