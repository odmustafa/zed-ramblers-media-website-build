'use client'

import { useEffect } from 'react'

export function WebVitals() {
    useEffect(() => {
        // Web Vitals tracking for SEO and performance monitoring
        const reportWebVitals = (metric: { name: string; value: number; id: string }) => {
            // Send to analytics service
            console.log('Web Vitals:', metric)

            // You can send this to Google Analytics, Vercel Analytics, etc.
            // Example: gtag('event', metric.name, { value: metric.value })
        }

        // Web Vitals tracking disabled for deployment
        // You can enable this later by properly configuring web-vitals imports
        console.log('Web Vitals tracking disabled')
    }, [])

    return null
}
