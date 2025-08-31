'use client'

// Force dynamic rendering to avoid SSR issues with Convex
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Layout from '@/components/layout/Layout'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'
import {
    Play,
    ExternalLink,
    Calendar,
    User,
    Building,
    Tag,
    Filter,
    Grid3X3,
    List
} from 'lucide-react'

interface PortfolioItem {
    _id: Id<"portfolio">
    title: string
    description: string
    category: string
    clientName?: string
    clientCompany?: string
    videoUrl: string
    videoType: 'youtube' | 'vimeo' | 'direct' | 'embed'
    thumbnailUrl?: string
    featured: boolean
    published: boolean
    order: number
    tags: string[]
    updatedAt: number
    _creationTime: number
}

export default function PortfolioPage() {
    const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null)
    const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [isClient, setIsClient] = useState(false)

    // Avoid SSR issues with Convex hooks
    // Always call hooks unconditionally
    const portfolioItemsQuery = useQuery(api.portfolio.getPublishedPortfolio)
    const categoriesQuery = useQuery(api.portfolio.getPortfolioCategories)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // Use the data only after client-side mount
    const portfolioItems = isClient ? (portfolioItemsQuery || []) : []
    const categories = isClient ? (categoriesQuery || []) : []

    // Filter portfolio items by category
    const filteredItems = selectedCategory === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === selectedCategory)

    const getVideoEmbedUrl = (item: PortfolioItem) => {
        if (item.videoType === 'youtube') {
            const videoId = item.videoUrl.split('v=')[1]?.split('&')[0] ||
                item.videoUrl.split('/').pop()?.split('?')[0]
            return `https://www.youtube.com/embed/${videoId}`
        } else if (item.videoType === 'vimeo') {
            const videoId = item.videoUrl.split('/').pop()
            return `https://player.vimeo.com/video/${videoId}`
        }
        return item.videoUrl
    }

    const getVideoThumbnail = (item: PortfolioItem) => {
        if (item.thumbnailUrl) return item.thumbnailUrl

        if (item.videoType === 'youtube') {
            const videoId = item.videoUrl.split('v=')[1]?.split('&')[0] ||
                item.videoUrl.split('/').pop()?.split('?')[0]
            return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        }

        // Default placeholder
        return '/api/placeholder/400/225'
    }

    // Show loading state while component is mounting
    if (!isClient) {
        return (
            <Layout>
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="animate-pulse">
                            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-12"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-64 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                Our Work
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                                Discover our portfolio of exceptional video productions, from corporate communications to creative storytelling
                            </p>
                            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>Latest Projects</span>
                                </div>
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    <span>Client Stories</span>
                                </div>
                                <div className="flex items-center">
                                    <Play className="h-4 w-4 mr-2" />
                                    <span>Video Showcase</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Controls */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-6">
                            {/* Category Filters */}
                            <div className="flex items-center space-x-4">
                                <Filter className="h-5 w-5 text-gray-400" />
                                <div className="flex space-x-2 overflow-x-auto">
                                    <Button
                                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setSelectedCategory('all')}
                                        className="whitespace-nowrap"
                                    >
                                        All Projects
                                    </Button>
                                    {categories.map((category) => (
                                        <Button
                                            key={category}
                                            variant={selectedCategory === category ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setSelectedCategory(category)}
                                            className="whitespace-nowrap"
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Portfolio Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredItems.map((item) => (
                                <Card key={item._id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={getVideoThumbnail(item)}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <Button
                                                onClick={() => {
                                                    setSelectedVideo(item)
                                                    setIsVideoDialogOpen(true)
                                                }}
                                                className="bg-white text-black hover:bg-gray-200"
                                                size="lg"
                                            >
                                                <Play className="h-6 w-6 mr-2" />
                                                Watch Video
                                            </Button>
                                        </div>
                                        {item.featured && (
                                            <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">
                                                Featured
                                            </Badge>
                                        )}
                                    </div>

                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                {item.category}
                                            </Badge>
                                            {item.clientName && (
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <User className="h-4 w-4 mr-1" />
                                                    {item.clientName}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-semibold text-black mb-2 line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {item.description}
                                        </p>

                                        {item.tags && item.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {item.tags.slice(0, 3).map((tag, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        <Tag className="h-3 w-3 mr-1" />
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {item.tags.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{item.tags.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedVideo(item)
                                                    setIsVideoDialogOpen(true)
                                                }}
                                            >
                                                <Play className="h-4 w-4 mr-2" />
                                                Watch
                                            </Button>

                                            {item.videoUrl && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => window.open(item.videoUrl, '_blank')}
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        /* List View */
                        <div className="space-y-6">
                            {filteredItems.map((item) => (
                                <Card key={item._id} className="overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
                                            <div className="flex-shrink-0 mb-4 lg:mb-0">
                                                <div className="relative w-full lg:w-64 aspect-video overflow-hidden rounded-lg">
                                                    <img
                                                        src={getVideoThumbnail(item)}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                                        <Button
                                                            onClick={() => {
                                                                setSelectedVideo(item)
                                                                setIsVideoDialogOpen(true)
                                                            }}
                                                            className="bg-white text-black hover:bg-gray-200"
                                                        >
                                                            <Play className="h-5 w-5 mr-2" />
                                                            Play
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                            {item.category}
                                                        </Badge>
                                                        {item.featured && (
                                                            <Badge className="bg-yellow-500 text-black">
                                                                Featured
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    {item.clientName && (
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <Building className="h-4 w-4 mr-1" />
                                                            {item.clientCompany || item.clientName}
                                                        </div>
                                                    )}
                                                </div>

                                                <h3 className="text-2xl font-semibold text-black mb-2">
                                                    {item.title}
                                                </h3>

                                                <p className="text-gray-600 mb-4">
                                                    {item.description}
                                                </p>

                                                {item.tags && item.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {item.tags.map((tag, index) => (
                                                            <Badge key={index} variant="outline" className="text-xs">
                                                                <Tag className="h-3 w-3 mr-1" />
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex items-center space-x-4">
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedVideo(item)
                                                            setIsVideoDialogOpen(true)
                                                        }}
                                                        className="bg-black text-white hover:bg-gray-800"
                                                    >
                                                        <Play className="h-4 w-4 mr-2" />
                                                        Watch Video
                                                    </Button>

                                                    {item.videoUrl && (
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => window.open(item.videoUrl, '_blank')}
                                                        >
                                                            <ExternalLink className="h-4 w-4 mr-2" />
                                                            View Source
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {filteredItems.length === 0 && (
                        <div className="text-center py-16">
                            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                <Play className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
                            <p className="text-gray-600 mb-8">
                                {selectedCategory === 'all'
                                    ? "Our portfolio is being updated. Check back soon!"
                                    : `No projects found in the "${selectedCategory}" category.`
                                }
                            </p>
                            {selectedCategory !== 'all' && (
                                <Button
                                    onClick={() => setSelectedCategory('all')}
                                    className="bg-black text-white hover:bg-gray-800"
                                >
                                    View All Projects
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {/* Video Modal */}
                <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
                    <DialogContent className="max-w-4xl w-full">
                        <DialogHeader>
                            <DialogTitle className="text-2xl">{selectedVideo?.title}</DialogTitle>
                            <DialogDescription>
                                {selectedVideo?.clientName && (
                                    <span>Client: {selectedVideo.clientName}</span>
                                )}
                                {selectedVideo?.clientCompany && selectedVideo.clientName && (
                                    <span> • {selectedVideo.clientCompany}</span>
                                )}
                            </DialogDescription>
                        </DialogHeader>

                        {selectedVideo && (
                            <div className="space-y-6">
                                <div className="aspect-video w-full">
                                    <iframe
                                        src={getVideoEmbedUrl(selectedVideo)}
                                        className="w-full h-full rounded-lg"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                            {selectedVideo.category}
                                        </Badge>
                                        {selectedVideo.featured && (
                                            <Badge className="bg-yellow-500 text-black">
                                                Featured Project
                                            </Badge>
                                        )}
                                    </div>

                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedVideo.description}
                                    </p>

                                    {selectedVideo.tags && selectedVideo.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {selectedVideo.tags.map((tag: string, index: number) => (
                                                <Badge key={index} variant="outline">
                                                    <Tag className="h-3 w-3 mr-1" />
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </Layout>
    )
}
