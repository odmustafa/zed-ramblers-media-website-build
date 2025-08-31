export function MetadataJsonLd() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ramblers Media",
        "url": "http://localhost:3000",
        "logo": "http://localhost:3000/ramblers-media-logo.svg",
        "description": "We are a full-service video production company specializing in video advertising, music videos, and film production. From concept to final cut, we bring your vision to life with compelling storytelling and high-quality production.",
        "foundingDate": "2009",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "North Hollywood",
            "addressRegion": "CA",
            "addressCountry": "US"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-765-760-0699",
            "contactType": "customer service",
            "availableLanguage": "English"
        },
        "sameAs": [
            "https://www.facebook.com/ramblersmedia",
            "https://www.instagram.com/ramblersmedia",
            "https://vimeo.com/rmp",
            "https://www.youtube.com/@ramblersmediaproductions"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Video Production Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Video Advertising",
                        "description": "Compelling video advertising content that drives engagement and results"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Music Videos",
                        "description": "Creative music video production with high-quality cinematography and storytelling"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Film Production",
                        "description": "Full-service film production from concept to final cut"
                    }
                }
            ]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
        },
        "knowsAbout": [
            "Video Production",
            "Video Advertising",
            "Music Videos",
            "Film Production",
            "Cinematography",
            "Storytelling",
            "Commercial Production"
        ]
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "http://localhost:3000/#localbusiness",
        "name": "Ramblers Media",
        "image": "http://localhost:3000/ramblers-media-logo.svg",
        "description": "We are a full-service video production company specializing in video advertising, music videos, and film production. From concept to final cut, we bring your vision to life with compelling storytelling and high-quality production.",
        "url": "http://localhost:3000",
        "telephone": "+1-765-760-0699",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "North Hollywood",
            "addressRegion": "CA",
            "postalCode": "91601",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "34.1369",
            "longitude": "-118.3774"
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Los Angeles"
            },
            {
                "@type": "State",
                "name": "California"
            },
            {
                "@type": "Country",
                "name": "United States"
            }
        ],
        "serviceType": "Video Production Services",
        "priceRange": "$$$",
        "openingHours": "Mo-Fr 08:00-18:00",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ramblers Media",
        "url": "http://localhost:3000",
        "description": "Full-service video production company in North Hollywood, CA specializing in video advertising, music videos, and film production.",
        "inLanguage": "en-US",
        "copyrightHolder": {
            "@type": "Organization",
            "name": "Ramblers Media"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "http://localhost:3000/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
        </>
    );
}
