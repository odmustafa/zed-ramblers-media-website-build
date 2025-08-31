'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react'

interface SEOIssue {
    type: 'error' | 'warning' | 'info' | 'success'
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
    recommendation: string
}

export function SEOAnalysis() {
    const [seoIssues, setSeoIssues] = useState<SEOIssue[]>([])

    useEffect(() => {
        // Analyze current page for SEO issues
        const analyzeSEO = () => {
            const issues: SEOIssue[] = []

            // Check title tag
            const title = document.title
            if (!title) {
                issues.push({
                    type: 'error',
                    title: 'Missing Page Title',
                    description: 'The page does not have a title tag',
                    impact: 'high',
                    recommendation: 'Add a descriptive title tag under 60 characters'
                })
            } else if (title.length > 60) {
                issues.push({
                    type: 'warning',
                    title: 'Title Too Long',
                    description: `Title is ${title.length} characters (recommended: 50-60)`,
                    impact: 'medium',
                    recommendation: 'Shorten the title while keeping it descriptive'
                })
            }

            // Check meta description
            const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content')
            if (!metaDesc) {
                issues.push({
                    type: 'error',
                    title: 'Missing Meta Description',
                    description: 'No meta description found',
                    impact: 'high',
                    recommendation: 'Add a meta description between 120-160 characters'
                })
            } else if (metaDesc.length > 160) {
                issues.push({
                    type: 'warning',
                    title: 'Meta Description Too Long',
                    description: `Description is ${metaDesc.length} characters (recommended: 120-160)`,
                    impact: 'medium',
                    recommendation: 'Shorten the meta description to fit within limits'
                })
            }

            // Check for H1 tag
            const h1Tags = document.querySelectorAll('h1')
            if (h1Tags.length === 0) {
                issues.push({
                    type: 'error',
                    title: 'Missing H1 Tag',
                    description: 'No H1 heading found on the page',
                    impact: 'high',
                    recommendation: 'Add exactly one H1 tag with your main keyword'
                })
            } else if (h1Tags.length > 1) {
                issues.push({
                    type: 'warning',
                    title: 'Multiple H1 Tags',
                    description: `Found ${h1Tags.length} H1 tags (recommended: 1)`,
                    impact: 'medium',
                    recommendation: 'Use only one H1 tag per page'
                })
            }

            // Check for images without alt text
            const images = document.querySelectorAll('img')
            const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'))
            if (imagesWithoutAlt.length > 0) {
                issues.push({
                    type: 'warning',
                    title: 'Images Missing Alt Text',
                    description: `${imagesWithoutAlt.length} images found without alt attributes`,
                    impact: 'medium',
                    recommendation: 'Add descriptive alt text to all images for accessibility and SEO'
                })
            }

            // Check for structured data
            const structuredData = document.querySelectorAll('script[type="application/ld+json"]')
            if (structuredData.length === 0) {
                issues.push({
                    type: 'info',
                    title: 'No Structured Data Found',
                    description: 'Consider adding JSON-LD structured data for rich snippets',
                    impact: 'low',
                    recommendation: 'Add Organization, LocalBusiness, or Service schema markup'
                })
            } else {
                issues.push({
                    type: 'success',
                    title: 'Structured Data Detected',
                    description: `Found ${structuredData.length} structured data blocks`,
                    impact: 'low',
                    recommendation: 'Structured data is properly implemented'
                })
            }

            // Check for Open Graph tags
            const ogTags = document.querySelectorAll('meta[property^="og:"]')
            if (ogTags.length === 0) {
                issues.push({
                    type: 'warning',
                    title: 'Missing Open Graph Tags',
                    description: 'No Open Graph meta tags found',
                    impact: 'medium',
                    recommendation: 'Add Open Graph tags for better social media sharing'
                })
            }

            // Check page load speed (basic check)
            const loadTime = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
            if (loadTime && loadTime.loadEventEnd - loadTime.fetchStart > 3000) {
                issues.push({
                    type: 'warning',
                    title: 'Slow Page Load',
                    description: `Page load time: ${((loadTime.loadEventEnd - loadTime.fetchStart) / 1000).toFixed(2)}s`,
                    impact: 'medium',
                    recommendation: 'Optimize images, use caching, and minimize render-blocking resources'
                })
            }

            setSeoIssues(issues)
        }

        // Run analysis after page loads
        if (document.readyState === 'complete') {
            analyzeSEO()
        } else {
            window.addEventListener('load', analyzeSEO)
            return () => window.removeEventListener('load', analyzeSEO)
        }
    }, [])

    const getIcon = (type: string) => {
        switch (type) {
            case 'error':
                return <XCircle className="h-5 w-5 text-red-500" />
            case 'warning':
                return <AlertTriangle className="h-5 w-5 text-yellow-500" />
            case 'info':
                return <Info className="h-5 w-5 text-blue-500" />
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />
            default:
                return <Info className="h-5 w-5 text-gray-500" />
        }
    }

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'high':
                return 'bg-red-100 text-red-800'
            case 'medium':
                return 'bg-yellow-100 text-yellow-800'
            case 'low':
                return 'bg-blue-100 text-blue-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    if (seoIssues.length === 0) {
        return null
    }

    const errorCount = seoIssues.filter(issue => issue.type === 'error').length
    const warningCount = seoIssues.filter(issue => issue.type === 'warning').length

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Card className="w-96 max-h-96 overflow-hidden">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">SEO Analysis</CardTitle>
                        <div className="flex space-x-2">
                            {errorCount > 0 && (
                                <Badge className="bg-red-100 text-red-800">
                                    {errorCount} errors
                                </Badge>
                            )}
                            {warningCount > 0 && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                    {warningCount} warnings
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="max-h-80 overflow-y-auto">
                    <div className="space-y-3">
                        {seoIssues.map((issue, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                {getIcon(issue.type)}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-sm text-black">{issue.title}</h4>
                                        <Badge className={`text-xs ${getImpactColor(issue.impact)}`}>
                                            {issue.impact}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">{issue.description}</p>
                                    <p className="text-xs text-blue-600">{issue.recommendation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
