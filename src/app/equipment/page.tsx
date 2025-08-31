'use client'

// Force dynamic rendering to avoid SSR issues with Convex
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Camera, Lightbulb, Mic, Monitor, Settings, Truck, ArrowRight, Star, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Layout from '@/components/layout/Layout'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'
import RentalRequestForm from '@/components/RentalRequestForm'

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
  createdAt: number
  updatedAt: number
  _creationTime: number
}

// Map category names to icons
const categoryIcons = {
  'Camera': Camera,
  'Lens': Settings,
  'Lighting': Lightbulb,
  'Audio': Mic,
  'Support': Truck,
}

export default function EquipmentPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const [isRentalFormOpen, setIsRentalFormOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Always call hooks unconditionally
  const allEquipmentQuery = useQuery(api.equipment.getAllEquipment)
  const submitRentalRequest = useMutation(api.equipment.addRentalRequest)

  // Avoid SSR issues with Convex hooks
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Use the data only after client-side mount
  const allEquipment = isClient ? (allEquipmentQuery || []) : []

  // Get unique categories from equipment data
  const categories = [...new Set(allEquipment.map((item: Equipment) => item.category))]

  // Filter and search equipment
  const filteredEquipment = allEquipment.filter((item: Equipment) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort equipment
  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price-low':
        return a.pricePerDay - b.pricePerDay
      case 'price-high':
        return b.pricePerDay - a.pricePerDay
      default:
        return 0
    }
  })

  const handleRentalRequest = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
    setIsRentalFormOpen(true)
  }

  const handleCloseRentalForm = () => {
    setIsRentalFormOpen(false)
    setSelectedEquipment(null)
  }

  // Show loading state while component is mounting
  if (!isClient) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-16"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-96 bg-gray-200 rounded"></div>
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Professional Equipment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            In‑house pro kit. Ready for travel. Complete production packages for any project.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              Request Equipment Package
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Complete production solutions from concept to delivery</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Corporate Communications</h3>
              <p className="text-gray-600 text-sm">Executive interviews, training videos, and internal communications.</p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Event Coverage</h3>
              <p className="text-gray-600 text-sm">Live streaming, multi-camera coverage, and event documentation.</p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Training Videos</h3>
              <p className="text-gray-600 text-sm">Process explainers, safety videos, and instructional content.</p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Equipment Rental</h3>
              <p className="text-gray-600 text-sm">Professional gear rental with full technical support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Equipment Inventory</h2>
            <p className="text-xl text-gray-600">Professional gear ready for your next production</p>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-black text-white' : ''}
              >
                All Equipment ({allEquipment.length})
              </Button>
              {categories.map((category: string) => {
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Settings
                const count = allEquipment.filter((item: Equipment) => item.category === category).length
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'bg-black text-white' : ''}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {category} ({count})
                  </Button>
                )
              })}
            </div>

            {/* Sort Options */}
            <div className="flex justify-center">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Equipment Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedEquipment.map((item: Equipment) => (
              <div key={item._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">{item.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <Badge variant={item.availability ? 'default' : 'secondary'} className={item.availability ? 'bg-green-100 text-green-800' : ''}>
                    {item.availability ? 'Available' : 'In Use'}
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                {item.specifications && (
                  <p className="text-gray-500 text-xs mb-4">{item.specifications}</p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Daily:</span>
                    <span className="font-semibold text-black">${item.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Weekly:</span>
                    <span className="font-semibold text-black">${item.pricePerWeek}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly:</span>
                    <span className="font-semibold text-black">${item.pricePerMonth}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-black text-white hover:bg-gray-800"
                  disabled={!item.availability}
                  onClick={() => handleRentalRequest(item)}
                >
                  {item.availability ? 'Request Rental' : 'Currently Unavailable'}
                </Button>
              </div>
            ))}
          </div>

          {/* Custom Package CTA */}
          <div className="text-center mt-16">
            <div className="bg-black text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Need a Custom Package?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We can create custom equipment packages tailored to your specific production needs.
                Contact us for a personalized quote and equipment recommendations.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Rental Process</h2>
            <p className="text-xl text-gray-600">Simple, professional equipment rental in 3 easy steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">1</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Request</h3>
              <p className="text-gray-600">Tell us about your project and equipment needs through our contact form.</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">2</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Confirm</h3>
              <p className="text-gray-600">We&apos;ll confirm availability and send you a detailed quote with all terms.</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">3</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Deliver</h3>
              <p className="text-gray-600">Equipment delivered to your location with full setup and training support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Request Form Modal */}
      {selectedEquipment && (
        <RentalRequestForm
          equipment={selectedEquipment}
          isOpen={isRentalFormOpen}
          onClose={handleCloseRentalForm}
        />
      )}
    </Layout>
  )
}
