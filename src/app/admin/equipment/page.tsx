'use client'

// Force dynamic rendering to avoid SSR issues with Convex
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { Plus, Edit, Trash2, Package } from 'lucide-react'

const categories = ['Camera', 'Lens', 'Lighting', 'Audio', 'Support']

interface Equipment {
    _id: Id<"equipment">
    name: string
    category: string
    pricePerDay: number
    pricePerWeek: number
    pricePerMonth: number
    description: string
    specifications?: string
    imageUrl?: string
    availability: boolean
    _creationTime: number
}

export default function AdminEquipmentPage() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)
    const [isClient, setIsClient] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        specifications: '',
        imageUrl: ''
    })

    // Always call hooks unconditionally
    const equipmentQuery = useQuery(api.equipment.getAllEquipment)
    const addEquipment = useMutation(api.equipment.addEquipment)
    const updateEquipment = useMutation(api.equipment.updateEquipment)
    const deleteEquipment = useMutation(api.equipment.deleteEquipment)

    // Avoid SSR issues with Convex hooks
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Use the data only after client-side mount
    const equipment = isClient ? (equipmentQuery || []) : []

    const resetForm = () => {
        setFormData({
            name: '',
            category: '',
            price: '',
            description: '',
            specifications: '',
            imageUrl: ''
        })
        setEditingEquipment(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (!isClient) {
                throw new Error('Client not ready')
            }

            const pricePerDay = parseFloat(formData.price)
            const equipmentData = {
                name: formData.name,
                category: formData.category,
                pricePerDay: pricePerDay,
                pricePerWeek: pricePerDay * 5, // 5 days discount
                pricePerMonth: pricePerDay * 20, // 20 days discount
                description: formData.description,
                specifications: formData.specifications,
                imageUrl: formData.imageUrl || undefined,
                availability: true
            }

            if (editingEquipment) {
                await updateEquipment({
                    id: editingEquipment._id,
                    ...equipmentData
                })
            } else {
                await addEquipment(equipmentData)
            }

            resetForm()
            setIsAddDialogOpen(false)
        } catch (error) {
            console.error('Error saving equipment:', error)
        }
    }

    const handleEdit = (equipment: Equipment) => {
        setEditingEquipment(equipment)
        setFormData({
            name: equipment.name,
            category: equipment.category,
            price: equipment.pricePerDay.toString(),
            description: equipment.description || '',
            specifications: equipment.specifications || '',
            imageUrl: equipment.imageUrl || ''
        })
        setIsAddDialogOpen(true)
    }

    const handleDelete = async (id: Id<"equipment">) => {
        if (confirm('Are you sure you want to delete this equipment?')) {
            try {
                if (!isClient) {
                    throw new Error('Client not ready')
                }
                await deleteEquipment({ id })
            } catch (error) {
                console.error('Error deleting equipment:', error)
            }
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Header */}
            <div className="bg-white border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-black">Equipment Management</h1>
                                <p className="mt-1 text-zinc-600">Manage your equipment inventory</p>
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
                                        Add Equipment
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>
                                            {editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
                                        </DialogTitle>
                                        <DialogDescription>
                                            {editingEquipment ? 'Update equipment details' : 'Add a new equipment item to your inventory'}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name">Equipment Name *</Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="e.g., Sony A7S III"
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
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="price">Daily Rate ($)</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    step="0.01"
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    placeholder="150.00"
                                                />
                                            </div>

                                        </div>

                                        <div>
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Describe the equipment features and capabilities..."
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="specifications">Technical Specifications</Label>
                                            <Textarea
                                                id="specifications"
                                                value={formData.specifications}
                                                onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                                                placeholder="List technical specs, dimensions, weight, etc..."
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="imageUrl">Image URL</Label>
                                            <Input
                                                id="imageUrl"
                                                value={formData.imageUrl}
                                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                                placeholder="https://example.com/image.jpg"
                                            />
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
                                                {editingEquipment ? 'Update Equipment' : 'Add Equipment'}
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            {/* Equipment List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid gap-6">
                    {equipment.map((item) => (
                        <Card key={item._id}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-black text-white rounded-full p-2">
                                            <Package className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-black">{item.name}</h3>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <Badge variant="secondary">{item.category}</Badge>
                                                <span className="text-sm text-zinc-600">${item.pricePerDay}/day</span>
                                            </div>
                                            {item.description && (
                                                <p className="text-sm text-zinc-600 mt-2 max-w-2xl">{item.description}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
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

                    {equipment.length === 0 && (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <Package className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-zinc-900 mb-2">No Equipment Yet</h3>
                                <p className="text-zinc-500 mb-6">Get started by adding your first equipment item.</p>
                                <Button
                                    onClick={() => setIsAddDialogOpen(true)}
                                    className="bg-black text-white hover:bg-zinc-800"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Your First Equipment
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
