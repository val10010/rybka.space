export default function SchemaProduct({ product }) {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `${product.name} ${product.currentColor}`,
        "description": product.info.desc,
        "image": product.images.map(img => `https://rybkaspace.com/images/products/${product.id}/${img}.jpg`),
        "sku": `RS-${product.id}`,
        "offers": {
            "@type": "Offer",
            "url": `https://rybkaspace.com/product/${product.id}`,
            "priceCurrency": "UAH",
            "price": product.price,
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            "itemCondition": "https://schema.org/NewCondition",
            "availability": product.disabled ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
        },
        "brand": {
            "@type": "Brand",
            "name": "Rybka Space"
        },
        "material": product.info.material.join(", "),
        "size": product.grid.sizes.join(", ")
    };

    if (product.oldPrice) {
        schemaData.offers = {
            ...schemaData.offers,
            "priceSpecification": {
                "@type": "PriceSpecification",
                "price": product.oldPrice,
                "priceCurrency": "UAH"
            }
        };
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
