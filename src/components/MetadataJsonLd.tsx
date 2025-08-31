export function MetadataJsonLd() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ramblers Media",
        "url": "http://localhost:3000",
        "logo": "http://localhost:3000/ramblers-media-logo.svg",
        "description": "Premier Dallas-based video production company specializing in corporate communications, government contracts, and professional filming services.",
        "foundingDate": "2009",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dallas",
            "addressRegion": "TX",
            "addressCountry": "US"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-214-555-0123",
            "contactType": "customer service",
            "availableLanguage": "English"
        },
        "sameAs": [
            "https://www.facebook.com/ramblersmedia",
            "https://www.instagram.com/ramblersmedia",
            "https://www.linkedin.com/company/ramblersmedia",
            "https://www.youtube.com/@ramblersmedia"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Video Production Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Corporate Video Production",
                        "description": "Professional corporate video production services for businesses and organizations"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Government Contract Services",
                        "description": "Specialized video production services for government agencies and contracts"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Equipment Rental",
                        "description": "Professional video equipment rental with delivery and setup services"
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
            "Corporate Communications",
            "Government Contracts",
            "Professional Filming",
            "Video Equipment Rental",
            "Live Event Streaming",
            "Commercial Production"
        ]
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "http://localhost:3000/#localbusiness",
        "name": "Ramblers Media",
        "image": "http://localhost:3000/ramblers-media-logo.svg",
        "description": "Premier Dallas-based video production company specializing in corporate communications, government contracts, and professional filming services.",
        "url": "http://localhost:3000",
        "telephone": "+1-214-555-0123",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "1234 Media Drive",
            "addressLocality": "Dallas",
            "addressRegion": "TX",
            "postalCode": "75201",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "32.7767",
            "longitude": "-96.7970"
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Dallas"
            },
            {
                "@type": "State",
                "name": "Texas"
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
        "description": "Professional video production company in Dallas, TX specializing in corporate communications and government contracts.",
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
