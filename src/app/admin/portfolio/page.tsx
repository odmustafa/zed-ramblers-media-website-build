'use client'

// Force dynamic rendering to avoid SSR issues with Convex
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { Plus, Edit, Trash2, Play, ExternalLink, Eye, Star } from 'lucide-react'

const categories = [
    'Commercial',
    'Corporate',
    'Event',
    'Training',
    'Documentary',
    'Live Streaming',
    'Wedding',
    'Other'
]

const videoTypes = [
    { value: 'youtube', label: 'YouTube' },
    { value: 'vimeo', label: 'Vimeo' },
    { value: 'direct', label: 'Direct Video URL' },
    { value: 'embed', label: 'Embed Code' }
]

type VideoType = 'youtube' | 'vimeo' | 'direct' | 'embed'

interface PortfolioItem {
    _id: Id<"portfolio">
    title: string
    description: string
    category: string
    clientName?: string
    clientCompany?: string
    videoUrl: string
    videoType: VideoType
    thumbnailUrl?: string
    featured: boolean
    published: boolean
    order: number
    tags?: string[]
    _creationTime: number
}

export default function AdminPortfolioPage() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        clientName: '',
        clientCompany: '',
        videoUrl: '',
        videoType: 'youtube' as VideoType,
        thumbnailUrl: '',
        featured: false,
        published: true,
        order: 0,
        tags: [] as string[]
    })
    const [tagInput, setTagInput] = useState('')

    // Fetch portfolio items
    const portfolioItems = useQuery(api.portfolio.getAllPortfolio) || []

    // Mutations
    const addPortfolioItem = useMutation(api.portfolio.addPortfolioItem)
    const updatePortfolioItem = useMutation(api.portfolio.updatePortfolioItem)
    const deletePortfolioItem = useMutation(api.portfolio.deletePortfolioItem)

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: '',
            clientName: '',
            clientCompany: '',
            videoUrl: '',
            videoType: 'youtube',
            thumbnailUrl: '',
            featured: false,
            published: true,
            order: portfolioItems.length,
            tags: []
        })
        setTagInput('')
        setEditingItem(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const portfolioData = {
                ...formData,
                tags: formData.tags || []
            }

            if (editingItem) {
                await updatePortfolioItem({
                    id: editingItem._id,
                    ...portfolioData
                })
            } else {
                await addPortfolioItem(portfolioData)
            }

            resetForm()
            setIsAddDialogOpen(false)
        } catch (error) {
            console.error('Error saving portfolio item:', error)
        }
    }

    const handleEdit = (item: PortfolioItem) => {
        setEditingItem(item)
        setFormData({
            title: item.title,
            description: item.description,
            category: item.category,
            clientName: item.clientName || '',
            clientCompany: item.clientCompany || '',
            videoUrl: item.videoUrl,
            videoType: item.videoType,
            thumbnailUrl: item.thumbnailUrl || '',
            featured: item.featured,
            published: item.published,
            order: item.order,
            tags: item.tags || []
        })
        setIsAddDialogOpen(true)
    }

    const handleDelete = async (id: Id<"portfolio">) => {
        if (confirm('Are you sure you want to delete this portfolio item?')) {
            try {
                await deletePortfolioItem({ id })
            } catch (error) {
                console.error('Error deleting portfolio item:', error)
            }
        }
    }

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            })
            setTagInput('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        })
    }

    const getVideoThumbnail = (item: PortfolioItem) => {
        if (item.thumbnailUrl) return item.thumbnailUrl

        if (item.videoType === 'youtube') {
            const videoId = item.videoUrl.split('v=')[1]?.split('&')[0] ||
                item.videoUrl.split('/').pop()?.split('?')[0]
            return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        }

        return '/api/placeholder/300/200'
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Header */}
            <div className="bg-white border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-black">Portfolio Management</h1>
                                <p className="mt-1 text-zinc-600">Manage your video portfolio and showcase</p>
                            </div>
                            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() => {
                                            resetForm()
                                            setIsAddDialogOpen(true)
                                        }}
                                        className="bg-black text-white hover:bg-zinc-800"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Portfolio Item
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>
                                            {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                                        </DialogTitle>
                                        <DialogDescription>
                                            {editingItem ? 'Update portfolio item details' : 'Add a new video project to your portfolio'}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="title">Project Title *</Label>
                                                    <Input
                                                        id="title"
                                                        value={formData.title}
                                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                        placeholder="e.g., Tech Startup Product Launch"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="category">Category *</Label>
                                                    <Select
                                                        value={formData.category}
                                                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {categories.map((category) => (
                                                                <SelectItem key={category} value={category}>
                                                                    {category}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <Label htmlFor="clientName">Client Name</Label>
                                                    <Input
                                                        id="clientName"
                                                        value={formData.clientName}
                                                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                                        placeholder="Client name"
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="clientCompany">Client Company</Label>
                                                    <Input
                                                        id="clientCompany"
                                                        value={formData.clientCompany}
                                                        onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                                                        placeholder="Client company"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="videoType">Video Platform *</Label>
                                                    <Select
                                                        value={formData.videoType}
                                                        onValueChange={(value: VideoType) => setFormData({ ...formData, videoType: value })}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select platform" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {videoTypes.map((type) => (
                                                                <SelectItem key={type.value} value={type.value}>
                                                                    {type.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <Label htmlFor="videoUrl">Video URL *</Label>
                                                    <Input
                                                        id="videoUrl"
                                                        value={formData.videoUrl}
                                                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                                        placeholder="https://youtube.com/watch?v=..."
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                                                    <Input
                                                        id="thumbnailUrl"
                                                        value={formData.thumbnailUrl}
                                                        onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                                                        placeholder="https://example.com/thumbnail.jpg"
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="order">Display Order</Label>
                                                    <Input
                                                        id="order"
                                                        type="number"
                                                        value={formData.order}
                                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                                        placeholder="0"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="description">Project Description *</Label>
                                            <Textarea
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Describe the project, techniques used, and results achieved..."
                                                rows={4}
                                                required
                                            />
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <Label>Tags</Label>
                                            <div className="flex space-x-2 mb-2">
                                                <Input
                                                    value={tagInput}
                                                    onChange={(e) => setTagInput(e.target.value)}
                                                    placeholder="Add a tag..."
                                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                                />
                                                <Button type="button" onClick={addTag} variant="outline">
                                                    Add
                                                </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.tags.map((tag, index) => (
                                                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                                                        {tag} ×
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Options */}
                                        <div className="flex items-center space-x-6">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="featured"
                                                    checked={formData.featured}
                                                    onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                                                />
                                                <Label htmlFor="featured">Featured Project</Label>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="published"
                                                    checked={formData.published}
                                                    onCheckedChange={(checked) => setFormData({ ...formData, published: !!checked })}
                                                />
                                                <Label htmlFor="published">Published</Label>
                                            </div>
                                        </div>

                                        <div className="flex justify-end space-x-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    resetForm()
                                                    setIsAddDialogOpen(false)
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit" className="bg-black text-white hover:bg-zinc-800">
                                                {editingItem ? 'Update Portfolio Item' : 'Add Portfolio Item'}
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            {/* Portfolio Items Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid gap-6">
                    {portfolioItems.map((item) => (
                        <Card key={item._id}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-32 h-20 overflow-hidden rounded-lg">
                                            <img
                                                src={getVideoThumbnail(item)}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <Play className="h-6 w-6 text-white" />
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                                                <Badge variant="secondary">{item.category}</Badge>
                                                {item.featured && (
                                                    <Badge className="bg-yellow-500 text-black">
                                                        <Star className="h-3 w-3 mr-1" />
                                                        Featured
                                                    </Badge>
                                                )}
                                                {!item.published && (
                                                    <Badge variant="outline" className="text-zinc-500">
                                                        Draft
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="text-zinc-600 text-sm mb-2 line-clamp-2">
                                                {item.description}
                                            </p>

                                            <div className="flex items-center space-x-4 text-sm text-zinc-500">
                                                {item.clientName && (
                                                    <span>Client: {item.clientName}</span>
                                                )}
                                                {item.tags && item.tags.length > 0 && (
                                                    <span>Tags: {item.tags.join(', ')}</span>
                                                )}
                                                <span>Order: {item.order}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => window.open(item.videoUrl, '_blank')}
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            View
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-red-300 text-red-600 hover:bg-red-50"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {portfolioItems.length === 0 && (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <Play className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-zinc-900 mb-2">No Portfolio Items Yet</h3>
                                <p className="text-zinc-500 mb-6">Start building your video portfolio by adding your first project.</p>
                                <Button
                                    onClick={() => setIsAddDialogOpen(true)}
                                    className="bg-black text-white hover:bg-zinc-800"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Your First Project
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
