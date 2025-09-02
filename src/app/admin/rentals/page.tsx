'use client'

// Force dynamic rendering to avoid SSR issues with Convex
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import {
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    Phone,
    Mail,
    MapPin,
    DollarSign,
    Package
} from 'lucide-react'

interface RentalRequest {
    _id: Id<"rentalRequests">
    equipmentId: Id<"equipment">
    equipmentName?: string
    userId: string
    userEmail?: string
    startDate: number
    endDate: number
    quantity?: number
    totalPrice: number
    totalCost?: number
    status: "pending" | "approved" | "rejected" | "completed"
    specialRequests?: string
    billingAddress?: string
    phone?: string
    notes?: string
    createdAt: number
    updatedAt: number
    _creationTime: number
}

export default function AdminRentalsPage() {
    const [selectedRental, setSelectedRental] = useState<RentalRequest | null>(null)
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

    // Fetch rental requests
    const rentalRequests = useQuery(api.equipment.getAllRentalRequests) || []

    // Mutations
    const updateRentalStatus = useMutation(api.equipment.updateRentalRequestStatus)

    const handleStatusUpdate = async (id: Id<"rentalRequests">, status: 'approved' | 'rejected') => {
        try {
            await updateRentalStatus({ id, status })
        } catch (error) {
            console.error('Error updating rental status:', error)
        }
    }

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

    const formatDate = (dateTimestamp: number) => {
        return new Date(dateTimestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const calculateDays = (startDate: number, endDate: number) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const pendingRentals = rentalRequests.filter(r => r.status === 'pending')
    const approvedRentals = rentalRequests.filter(r => r.status === 'approved')
    const rejectedRentals = rentalRequests.filter(r => r.status === 'rejected')

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Header */}
            <div className="bg-white border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-black">Rental Management</h1>
                        <p className="mt-1 text-zinc-600">Review and manage equipment rental requests</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-600">Pending Requests</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-black">{pendingRentals.length}</div>
                            <p className="text-xs text-zinc-600">Awaiting approval</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-600">Approved</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-black">{approvedRentals.length}</div>
                            <p className="text-xs text-zinc-600">Confirmed bookings</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-600">Rejected</CardTitle>
                            <XCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-black">{rejectedRentals.length}</div>
                            <p className="text-xs text-zinc-600">Declined requests</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Rental Requests */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {rentalRequests.length > 0 ? (
                        rentalRequests.map((rental) => {
                            const days = calculateDays(rental.startDate, rental.endDate)
                            const subtotal = rental.totalPrice

                            return (
                                <Card key={rental._id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="bg-black text-white rounded-full p-2">
                                                            <Package className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-black">Equipment Rental #{rental._id.slice(-8)}</h3>
                                                            <div className="flex items-center space-x-4 mt-1">
                                                                <span className="text-sm text-zinc-600">Rental Request</span>
                                                                {getStatusBadge(rental.status)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-black">${rental.totalPrice}</div>
                                                        <div className="text-sm text-zinc-600">
                                                            {days} day{days !== 1 ? 's' : ''} rental period
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="h-4 w-4 text-zinc-400" />
                                                        <div>
                                                            <div className="text-sm font-medium text-black">Dates</div>
                                                            <div className="text-sm text-zinc-600">
                                                                {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <DollarSign className="h-4 w-4 text-zinc-400" />
                                                        <div>
                                                            <div className="text-sm font-medium text-black">Rate</div>
                                                            <div className="text-sm text-zinc-600">${(rental.totalPrice / days).toFixed(2)}/day</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <Package className="h-4 w-4 text-zinc-400" />
                                                        <div>
                                                            <div className="text-sm font-medium text-black">Quantity</div>
                                                            <div className="text-sm text-zinc-600">1 unit</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Contact Info */}
                                                <div className="flex items-center space-x-6 text-sm text-zinc-600">
                                                    <div className="flex items-center space-x-1">
                                                        <span>User ID: {rental.userId.slice(-8)}</span>
                                                    </div>
                                                </div>

                                                {/* Notes */}
                                                {rental.notes && (
                                                    <div className="mt-4 p-3 bg-zinc-50 rounded-lg">
                                                        <div className="text-sm font-medium text-black mb-1">Notes</div>
                                                        <div className="text-sm text-zinc-600">{rental.notes}</div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col space-y-2 ml-6">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedRental(rental)
                                                        setIsDetailDialogOpen(true)
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Details
                                                </Button>

                                                {rental.status === 'pending' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700"
                                                            onClick={() => handleStatusUpdate(rental._id, 'approved')}
                                                        >
                                                            <CheckCircle className="h-4 w-4 mr-2" />
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="border-red-300 text-red-600 hover:bg-red-50"
                                                            onClick={() => handleStatusUpdate(rental._id, 'rejected')}
                                                        >
                                                            <XCircle className="h-4 w-4 mr-2" />
                                                            Reject
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                    ) : (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <Calendar className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-zinc-900 mb-2">No Rental Requests</h3>
                                <p className="text-zinc-500">Rental requests will appear here once customers submit them.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Detail Dialog */}
            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Rental Request Details</DialogTitle>
                        <DialogDescription>Detailed information about the rental request</DialogDescription>
                    </DialogHeader>

                    {selectedRental && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-black mb-2">Equipment Details</h4>
                                    <div className="space-y-2 text-sm">
                                        <div><strong>Name:</strong> {selectedRental.equipmentName}</div>
                                        <div><strong>Quantity:</strong> {selectedRental.quantity}</div>
                                        <div><strong>Total Price:</strong> ${selectedRental.totalPrice}</div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-black mb-2">Rental Period</h4>
                                    <div className="space-y-2 text-sm">
                                        <div><strong>Start Date:</strong> {formatDate(selectedRental.startDate)}</div>
                                        <div><strong>End Date:</strong> {formatDate(selectedRental.endDate)}</div>
                                        <div><strong>Duration:</strong> {calculateDays(selectedRental.startDate, selectedRental.endDate)} days</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-black mb-2">Customer Information</h4>
                                <div className="space-y-2 text-sm">
                                    <div><strong>User ID:</strong> {selectedRental.userId}</div>
                                    <div><strong>Email:</strong> {selectedRental.userEmail}</div>
                                    {selectedRental.phone && <div><strong>Phone:</strong> {selectedRental.phone}</div>}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-black mb-2">Billing Address</h4>
                                <div className="text-sm text-zinc-600 whitespace-pre-line">
                                    {selectedRental.billingAddress}
                                </div>
                            </div>

                            {selectedRental.specialRequests && (
                                <div>
                                    <h4 className="font-medium text-black mb-2">Special Requests</h4>
                                    <div className="text-sm text-zinc-600">
                                        {selectedRental.specialRequests}
                                    </div>
                                </div>
                            )}

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-black">Total Amount:</span>
                                    <span className="text-xl font-bold text-black">${selectedRental.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
