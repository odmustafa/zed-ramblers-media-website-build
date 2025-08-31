'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Calendar, DollarSign, Package, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Layout from '@/components/layout/Layout'
import { useQuery, useMutation, Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { SignInButton, useUser } from '@clerk/nextjs'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { useEffect } from 'react'

interface RentalRequest {
    _id: Id<"rentalRequests">
    equipmentId: Id<"equipment">
    userId: string
    startDate: number
    endDate: number
    totalPrice: number
    status: "pending" | "approved" | "rejected" | "completed"
    notes?: string
    createdAt: number
    updatedAt: number
    _creationTime: number
}

function RentalsDashboard() {
    const [activeTab, setActiveTab] = useState('all')
    const { user } = useUser()
    const ensureUser = useMutation(api.users.ensureCurrentUser)

    // Ensure user exists in Convex database when component mounts
    useEffect(() => {
        if (user) {
            ensureUser().catch(console.error)
        }
    }, [user, ensureUser])

    // Fetch rental requests data
    const rentalRequestsQuery = useQuery(api.equipment.getUserRentalRequests)
    const rentalRequests = rentalRequestsQuery || []

    // Filter rental requests based on status
    const filteredRequests = activeTab === 'all'
        ? rentalRequests
        : rentalRequests.filter(request => request.status === activeTab)

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
            case 'approved':
                return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>
            case 'rejected':
                return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
            case 'completed':
                return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Package className="h-3 w-3 mr-1" />Completed</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getStatusCounts = () => {
        const counts = {
            all: rentalRequests.length,
            pending: rentalRequests.filter(r => r.status === 'pending').length,
            approved: rentalRequests.filter(r => r.status === 'approved').length,
            rejected: rentalRequests.filter(r => r.status === 'rejected').length,
            completed: rentalRequests.filter(r => r.status === 'completed').length,
        }
        return counts
    }

    const statusCounts = getStatusCounts()

    // Show loading state while data is being fetched
    if (rentalRequestsQuery === undefined) {
        return (
            <Layout>
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="animate-pulse">
                                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-24 bg-gray-200 rounded"></div>
                                    ))}
                                </div>
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
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="px-4 py-6 sm:px-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Manage your equipment rental requests and track their status
                                </p>
                            </div>
                            <Link href="/equipment">
                                <Button className="bg-black text-white hover:bg-gray-800">
                                    <Package className="h-4 w-4 mr-2" />
                                    Browse Equipment
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{statusCounts.all}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{statusCounts.pending}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{statusCounts.approved}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{statusCounts.completed}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Rental Requests */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Rental Requests</CardTitle>
                            <CardDescription>
                                View and manage all your equipment rental requests
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-5">
                                    <TabsTrigger value="all">
                                        All ({statusCounts.all})
                                    </TabsTrigger>
                                    <TabsTrigger value="pending">
                                        Pending ({statusCounts.pending})
                                    </TabsTrigger>
                                    <TabsTrigger value="approved">
                                        Approved ({statusCounts.approved})
                                    </TabsTrigger>
                                    <TabsTrigger value="rejected">
                                        Rejected ({statusCounts.rejected})
                                    </TabsTrigger>
                                    <TabsTrigger value="completed">
                                        Completed ({statusCounts.completed})
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value={activeTab} className="mt-6">
                                    {filteredRequests.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No rental requests found</h3>
                                            <p className="text-gray-600 mb-6">
                                                {activeTab === 'all'
                                                    ? "You haven't made any rental requests yet."
                                                    : `You don't have any ${activeTab} rental requests.`
                                                }
                                            </p>
                                            <Link href="/equipment">
                                                <Button className="bg-black text-white hover:bg-gray-800">
                                                    Browse Equipment
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {filteredRequests.map((request: RentalRequest) => (
                                                <Card key={request._id} className="p-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="bg-black text-white rounded-full p-3">
                                                                <Package className="h-6 w-6" />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-lg font-semibold text-gray-900">
                                                                    Equipment ID: {request.equipmentId}
                                                                </h4>
                                                                <div className="flex items-center space-x-4 mt-1">
                                                                    <div className="flex items-center text-sm text-gray-600">
                                                                        <Calendar className="h-4 w-4 mr-1" />
                                                                        {formatDate(request.startDate)} - {formatDate(request.endDate)}
                                                                    </div>
                                                                    <div className="flex items-center text-sm text-gray-600">
                                                                        <DollarSign className="h-4 w-4 mr-1" />
                                                                        ${request.totalPrice}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-4">
                                                            {getStatusBadge(request.status)}
                                                            <div className="text-right">
                                                                <p className="text-sm text-gray-600">Requested</p>
                                                                <p className="text-sm font-medium">{formatDate(request._creationTime)}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {request.notes && (
                                                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                                            <p className="text-sm text-gray-700">
                                                                <strong>Notes:</strong> {request.notes}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {request.status === 'approved' && (
                                                        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                                                            <div className="flex items-center">
                                                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                                                <div>
                                                                    <p className="text-sm font-medium text-green-800">Rental Approved!</p>
                                                                    <p className="text-sm text-green-700">
                                                                        Please contact us at hello@ramblersmedia.com to arrange pickup and payment.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {request.status === 'pending' && (
                                                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                                            <div className="flex items-center">
                                                                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                                                                <div>
                                                                    <p className="text-sm font-medium text-yellow-800">Processing Request</p>
                                                                    <p className="text-sm text-yellow-700">
                                                                        We&apos;re reviewing your rental request. You&apos;ll receive an update within 24 hours.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}

// Wrapper component with authentication
function AuthenticatedRentalsDashboard() {
    return (
        <Layout>
            <AuthLoading>
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="animate-pulse">
                                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-24 bg-gray-200 rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthLoading>
            <Unauthenticated>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view your rentals</h1>
                        <SignInButton mode="modal">
                            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                </div>
            </Unauthenticated>
            <Authenticated>
                <RentalsDashboard />
            </Authenticated>
        </Layout>
    )
}

// Export the component with dynamic import to disable SSR
export default dynamic(() => Promise.resolve(AuthenticatedRentalsDashboard), {
    ssr: false
})
