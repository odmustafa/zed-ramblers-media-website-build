'use client'

// Force dynamic rendering to avoid SSR issues with Convex
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Layout from '@/components/layout/Layout'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import {
    Users,
    Mail,
    Phone,
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    Send,
    Archive,
    DollarSign,
    Check,
    X
} from 'lucide-react'

interface ContactRequest {
    _id: Id<"contactRequests">
    name: string
    email: string
    phone?: string
    company?: string
    message: string
    serviceType: string
    projectType?: string
    timeline?: string
    budget?: string
    status: "new" | "contacted" | "quoted" | "won" | "lost"
    _creationTime: number
}

export default function AdminContactsPage() {
    const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(null)
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
    const [isClient, setIsClient] = useState(false)

    // Always call hooks unconditionally
    const contactRequestsQuery = useQuery(api.contact.getAllContactRequests)
    const updateContactStatus = useMutation(api.contact.updateContactRequestStatus)

    // Avoid SSR issues with Convex hooks
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Use the data only after client-side mount
    const contactRequests = isClient ? (contactRequestsQuery || []) : []

    const handleStatusUpdate = async (id: Id<"contactRequests">, status: "new" | "contacted" | "quoted" | "won" | "lost") => {
        try {
            if (!isClient) {
                throw new Error('Client not ready')
            }
            await updateContactStatus({ id, status })
        } catch (error) {
            console.error('Error updating contact status:', error)
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new':
                return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
            case 'contacted':
                return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Send className="h-3 w-3 mr-1" />Contacted</Badge>
            case 'quoted':
                return <Badge variant="secondary" className="bg-green-100 text-green-800"><DollarSign className="h-3 w-3 mr-1" />Quoted</Badge>
            case 'won':
                return <Badge variant="secondary" className="bg-green-100 text-green-800"><Check className="h-3 w-3 mr-1" />Won</Badge>
            case 'lost':
                return <Badge variant="secondary" className="bg-red-100 text-red-800"><X className="h-3 w-3 mr-1" />Lost</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const pendingContacts = contactRequests.filter(c => c.status === 'new')
    const respondedContacts = contactRequests.filter(c => c.status === 'contacted')
    const archivedContacts = contactRequests.filter(c => c.status === 'won' || c.status === 'lost')

    // Show loading state while component is mounting
    if (!isClient) {
        return (
            <Layout>
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                            <div className="h-96 bg-gray-200 rounded"></div>
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
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="py-6">
                            <h1 className="text-3xl font-bold text-black">Contact Management</h1>
                            <p className="mt-1 text-gray-600">Manage quote requests and customer inquiries</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Pending Quotes</CardTitle>
                                <Clock className="h-4 w-4 text-yellow-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-black">{pendingContacts.length}</div>
                                <p className="text-xs text-gray-600">Awaiting response</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Responded</CardTitle>
                                <CheckCircle className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-black">{respondedContacts.length}</div>
                                <p className="text-xs text-gray-600">Quotes sent</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">Archived</CardTitle>
                                <Archive className="h-4 w-4 text-gray-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-black">{archivedContacts.length}</div>
                                <p className="text-xs text-gray-600">Completed requests</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Contact Requests */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {contactRequests.length > 0 ? (
                            contactRequests.map((contact) => (
                                <Card key={contact._id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="bg-black text-white rounded-full p-2">
                                                            <Users className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-black">{contact.name}</h3>
                                                            <div className="flex items-center space-x-4 mt-1">
                                                                <span className="text-sm text-gray-600">{contact.serviceType}</span>
                                                                {getStatusBadge(contact.status)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right text-sm text-gray-600">
                                                        {formatDate(contact._creationTime)}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div className="flex items-center space-x-2">
                                                        <Mail className="h-4 w-4 text-gray-400" />
                                                        <div>
                                                            <div className="text-sm font-medium text-black">Email</div>
                                                            <div className="text-sm text-gray-600">{contact.email}</div>
                                                        </div>
                                                    </div>

                                                    {contact.phone && (
                                                        <div className="flex items-center space-x-2">
                                                            <Phone className="h-4 w-4 text-gray-400" />
                                                            <div>
                                                                <div className="text-sm font-medium text-black">Phone</div>
                                                                <div className="text-sm text-gray-600">{contact.phone}</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                    {contact.company && (
                                                        <div>
                                                            <div className="text-sm font-medium text-black">Company</div>
                                                            <div className="text-sm text-gray-600">{contact.company}</div>
                                                        </div>
                                                    )}

                                                    {contact.timeline && (
                                                        <div>
                                                            <div className="text-sm font-medium text-black">Timeline</div>
                                                            <div className="text-sm text-gray-600">{contact.timeline}</div>
                                                        </div>
                                                    )}

                                                    {contact.budget && (
                                                        <div>
                                                            <div className="text-sm font-medium text-black">Budget</div>
                                                            <div className="text-sm text-gray-600">{contact.budget}</div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Project Details */}
                                                <div>
                                                    <div className="text-sm font-medium text-black mb-2">Project Details</div>
                                                    <div className="text-sm text-gray-600 line-clamp-3">
                                                        {contact.message}
                                                    </div>
                                                </div>

                                                {/* Additional Details */}
                                                {contact.projectType && (
                                                    <div className="mt-4">
                                                        <div className="text-sm font-medium text-black mb-1">Project Type</div>
                                                        <div className="text-sm text-gray-600">{contact.projectType}</div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col space-y-2 ml-6">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedContact(contact)
                                                        setIsDetailDialogOpen(true)
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Details
                                                </Button>

                                                {contact.status === 'new' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            className="bg-blue-600 hover:bg-blue-700"
                                                            onClick={() => handleStatusUpdate(contact._id, 'contacted')}
                                                        >
                                                            <Send className="h-4 w-4 mr-2" />
                                                            Mark Responded
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="border-gray-300 text-gray-600 hover:bg-gray-50"
                                                            onClick={() => handleStatusUpdate(contact._id, 'quoted')}
                                                        >
                                                            <Archive className="h-4 w-4 mr-2" />
                                                            Archive
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Contact Requests</h3>
                                    <p className="text-gray-500">Contact requests will appear here once customers submit them.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Detail Dialog */}
                <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Contact Request Details</DialogTitle>
                            <DialogDescription>Detailed information about the quote request</DialogDescription>
                        </DialogHeader>

                        {selectedContact && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-black mb-3">Contact Information</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="text-sm font-medium text-gray-600">Name</div>
                                                <div className="text-sm text-black">{selectedContact.name}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-600">Email</div>
                                                <div className="text-sm text-black">{selectedContact.email}</div>
                                            </div>
                                            {selectedContact.phone && (
                                                <div>
                                                    <div className="text-sm font-medium text-gray-600">Phone</div>
                                                    <div className="text-sm text-black">{selectedContact.phone}</div>
                                                </div>
                                            )}
                                            {selectedContact.company && (
                                                <div>
                                                    <div className="text-sm font-medium text-gray-600">Company</div>
                                                    <div className="text-sm text-black">{selectedContact.company}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-black mb-3">Project Information</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="text-sm font-medium text-gray-600">Service Type</div>
                                                <div className="text-sm text-black">{selectedContact.serviceType}</div>
                                            </div>
                                            {selectedContact.projectType && (
                                                <div>
                                                    <div className="text-sm font-medium text-gray-600">Project Type</div>
                                                    <div className="text-sm text-black">{selectedContact.projectType}</div>
                                                </div>
                                            )}
                                            {selectedContact.timeline && (
                                                <div>
                                                    <div className="text-sm font-medium text-gray-600">Timeline</div>
                                                    <div className="text-sm text-black">{selectedContact.timeline}</div>
                                                </div>
                                            )}
                                            {selectedContact.budget && (
                                                <div>
                                                    <div className="text-sm font-medium text-gray-600">Budget</div>
                                                    <div className="text-sm text-black">{selectedContact.budget}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-black mb-3">Project Details</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                            {selectedContact.message}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-600">Submitted: {formatDate(selectedContact._creationTime)}</span>
                                            </div>
                                            <div>{getStatusBadge(selectedContact.status)}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {selectedContact.status === 'new' && (
                                    <div className="flex justify-end space-x-2 pt-4 border-t">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleStatusUpdate(selectedContact._id, 'quoted')}
                                        >
                                            <Archive className="h-4 w-4 mr-2" />
                                            Archive
                                        </Button>
                                        <Button
                                            className="bg-blue-600 hover:bg-blue-700"
                                            onClick={() => handleStatusUpdate(selectedContact._id, 'contacted')}
                                        >
                                            <Send className="h-4 w-4 mr-2" />
                                            Mark as Responded
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </Layout>
    )
}
