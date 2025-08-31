'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // Load Google Analytics script
        const script = document.createElement('script')
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
        script.async = true
        document.head.appendChild(script)

        // Initialize gtag
        window.dataLayer = window.dataLayer || []
        function gtag(...args: any[]) {
            window.dataLayer.push(args)
        }
        gtag('js', new Date())
        gtag('config', measurementId, {
            page_title: document.title,
            page_location: window.location.href,
        })

        // Track page views
        gtag('config', measurementId, {
            page_path: pathname + searchParams.toString(),
        })

        return () => {
            // Cleanup
            const existingScript = document.querySelector(`script[src*="googletagmanager"]`)
            if (existingScript) {
                document.head.removeChild(existingScript)
            }
        }
    }, [measurementId])

    // Track page changes
    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', measurementId, {
                page_path: pathname + searchParams.toString(),
            })
        }
    }, [pathname, searchParams, measurementId])

    return null
}

// Extend Window interface for TypeScript
declare global {
    interface Window {
        dataLayer: any[]
        gtag: (...args: any[]) => void
    }
}
