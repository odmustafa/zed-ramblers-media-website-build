'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Calendar, X, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import EquipmentCalendar from './EquipmentCalendar'

const rentalSchema = z.object({
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    specialRequests: z.string().optional(),
    billingAddress: z.string().min(5, 'Billing address is required'),
    phone: z.string().min(10, 'Phone number is required'),
}).refine((data) => {
    const start = new Date(data.startDate)
    const end = new Date(data.endDate)
    return end > start
}, {
    message: "End date must be after start date",
    path: ["endDate"],
})

type RentalFormData = z.infer<typeof rentalSchema>

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

interface RentalRequestFormProps {
    equipment: Equipment
    isOpen: boolean
    onClose: () => void
}

export default function RentalRequestForm({ equipment, isOpen, onClose }: RentalRequestFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)

    // Convex mutation for submitting rental requests
    const submitRentalRequest = useMutation(api.equipment.addRentalRequest)

    const form = useForm<RentalFormData>({
        resolver: zodResolver(rentalSchema),
        defaultValues: {
            startDate: '',
            endDate: '',
            quantity: 1,
            specialRequests: '',
            billingAddress: '',
            phone: '',
        },
    })

    const calculateTotalPrice = (startDate: string, endDate: string, quantity: number) => {
        if (!startDate || !endDate) return 0

        const start = new Date(startDate)
        const end = new Date(endDate)
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

        if (days <= 0) return 0

        // Calculate based on rental period
        let pricePerDay = equipment.pricePerDay
        if (days >= 30) {
            pricePerDay = equipment.pricePerMonth / 30
        } else if (days >= 7) {
            pricePerDay = equipment.pricePerWeek / 7
        }

        return Math.round(pricePerDay * days * quantity * 100) / 100
    }

    const watchedValues = form.watch()
    const totalPrice = calculateTotalPrice(watchedValues.startDate, watchedValues.endDate, watchedValues.quantity)

    const handleCalendarDateSelect = (startDate: Date, endDate: Date) => {
        form.setValue('startDate', startDate.toISOString().split('T')[0])
        form.setValue('endDate', endDate.toISOString().split('T')[0])
        setShowCalendar(false)
    }

    const onSubmit = async (data: RentalFormData) => {
        setIsSubmitting(true)

        try {
            await submitRentalRequest({
                equipmentId: equipment._id,
                startDate: new Date(data.startDate).getTime(),
                endDate: new Date(data.endDate).getTime(),
                totalPrice: totalPrice,
                notes: `Quantity: ${data.quantity}, Phone: ${data.phone}, Address: ${data.billingAddress}, Special Requests: ${data.specialRequests || 'None'}`,
            })

            setIsSubmitted(true)
            setTimeout(() => {
                onClose()
                setIsSubmitted(false)
                form.reset()
            }, 3000)
        } catch (error) {
            console.error('Error submitting rental request:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSubmitted) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md">
                    <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-black mb-2">Request Submitted!</h3>
                        <p className="text-gray-600 mb-4">
                            Your rental request has been submitted successfully. We&apos;ll contact you within 24 hours to confirm availability and next steps.
                        </p>
                        <p className="text-sm text-gray-500">
                            You can close this window now.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Rent {equipment.name}
                    </DialogTitle>
                    <DialogDescription>
                        Fill out the form below to request this equipment rental. We&apos;ll contact you to confirm availability.
                    </DialogDescription>
                </DialogHeader>

                {/* Equipment Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h4 className="font-semibold text-black">{equipment.name}</h4>
                            <Badge variant="outline" className="mt-1">{equipment.category}</Badge>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Daily: ${equipment.pricePerDay}</p>
                            <p className="text-sm text-gray-600">Weekly: ${equipment.pricePerWeek}</p>
                            <p className="text-sm text-gray-600">Monthly: ${equipment.pricePerMonth}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">{equipment.description}</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Date Selection */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date *</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} min={new Date().toISOString().split('T')[0]} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date *</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} min={watchedValues.startDate || new Date().toISOString().split('T')[0]} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Calendar View Toggle */}
                        <div className="flex justify-center">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowCalendar(!showCalendar)}
                                className="flex items-center gap-2"
                            >
                                <Calendar className="h-4 w-4" />
                                {showCalendar ? 'Hide Calendar' : 'Show Availability Calendar'}
                            </Button>
                        </div>

                        {/* Calendar Component */}
                        {showCalendar && (
                            <div className="mt-4">
                                <EquipmentCalendar
                                    equipmentId={equipment._id}
                                    onDateSelect={handleCalendarDateSelect}
                                />
                            </div>
                        )}

                        {/* Quantity */}
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity *</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select quantity" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="4">4</SelectItem>
                                            <SelectItem value="5">5+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Contact Information */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+1 (555) 123-4567" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="billingAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Billing Address *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123 Main St, City, State, ZIP" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Special Requests */}
                        <FormField
                            control={form.control}
                            name="specialRequests"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Special Requests or Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Any special requirements, delivery instructions, or additional notes..."
                                            className="min-h-20"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Price Summary */}
                        {totalPrice > 0 && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-black">Estimated Total:</span>
                                    <span className="text-2xl font-bold text-black">${totalPrice.toFixed(2)}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    * Final price may vary based on exact dates and availability
                                </p>
                            </div>
                        )}

                        {/* Terms */}
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-gray-700">
                                    <p className="font-semibold mb-1">Important Terms:</p>
                                    <ul className="space-y-1 text-xs">
                                        <li>• 50% deposit required to confirm booking</li>
                                        <li>• Full payment due 7 days before rental start</li>
                                        <li>• Cancellation policy: 48 hours notice for full refund</li>
                                        <li>• Equipment must be returned in original condition</li>
                                        <li>• Insurance and liability coverage required</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-black text-white hover:bg-gray-800"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Rental Request'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
