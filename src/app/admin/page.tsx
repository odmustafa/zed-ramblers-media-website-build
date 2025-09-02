'use client'

// Force dynamic rendering to avoid SSR issues with Convex
export const dynamic = 'force-dynamic'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import {
    Users,
    Package,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle
} from 'lucide-react'

function AdminDashboardContent() {
    // Fetch dashboard data
    const equipmentCount = useQuery(api.equipment.getAllEquipment) || []
    const rentalRequests = useQuery(api.equipment.getAllRentalRequests) || []
    const contactRequests = useQuery(api.contact.getAllContactRequests) || []

    // Calculate metrics
    const totalEquipment = equipmentCount.length
    const pendingRentals = rentalRequests.filter(r => r.status === 'pending').length
    const approvedRentals = rentalRequests.filter(r => r.status === 'approved').length
    const pendingContacts = contactRequests.filter(c => c.status === 'new').length

    const stats = [
        {
            title: 'Total Equipment',
            value: totalEquipment,
            icon: Package,
            description: 'Active equipment inventory'
        },
        {
            title: 'Pending Rentals',
            value: pendingRentals,
            icon: Clock,
            description: 'Awaiting approval'
        },
        {
            title: 'Approved Rentals',
            value: approvedRentals,
            icon: CheckCircle,
            description: 'Confirmed bookings'
        },
        {
            title: 'Pending Quotes',
            value: pendingContacts,
            icon: AlertCircle,
            description: 'Quote requests'
        }
    ]

    const recentRentals = rentalRequests.slice(0, 5)
    const recentContacts = contactRequests.slice(0, 5)

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
            case 'approved':
                return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>
            case 'rejected':
                return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Header */}
            <div className="bg-white border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
                        <p className="mt-1 text-zinc-600">Manage equipment, rentals, and customer inquiries</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-600">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-zinc-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-black">{stat.value}</div>
                                <p className="text-xs text-zinc-600">{stat.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Navigation to different admin sections */}
                <div className="bg-white border border-zinc-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-black mb-4">Admin Sections</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/admin/rentals">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-black">Rental Management</h3>
                                            <p className="text-sm text-zinc-600">Approve/reject rental requests</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/admin/equipment">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-green-100 text-green-600 rounded-full p-2">
                                            <Package className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-black">Equipment Management</h3>
                                            <p className="text-sm text-zinc-600">Add/edit equipment inventory</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/admin/contacts">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-purple-100 text-purple-600 rounded-full p-2">
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-black">Contact Management</h3>
                                            <p className="text-sm text-zinc-600">Handle quote requests</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function AdminDashboard() {
    return <AdminDashboardContent />
}
