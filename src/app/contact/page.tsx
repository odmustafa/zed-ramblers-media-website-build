'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Layout from '@/components/layout/Layout'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    company: z.string().optional(),
    serviceType: z.string().min(1, 'Please select a service type'),
    projectType: z.string().optional(),
    timeline: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().min(10, 'Please provide more details about your project'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            company: '',
            serviceType: '',
            projectType: '',
            timeline: '',
            budget: '',
            message: '',
        },
    })

    // Always call hooks unconditionally
    const submitContactRequest = useMutation(api.contact.submitContactRequest)

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        try {
            if (typeof window === 'undefined') {
                throw new Error('Client not ready')
            }
            await submitContactRequest({
                name: data.name,
                email: data.email,
                phone: data.phone || '',
                company: data.company || '',
                message: data.message,
                serviceType: data.serviceType,
                projectType: data.projectType || '',
                timeline: data.timeline || '',
                budget: data.budget || '',
            })
            setIsSubmitted(true)
            form.reset()
        } catch (error) {
            console.error('Error submitting contact request:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Get Your Project Started
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                            Ready to bring your vision to life? Let&apos;s discuss your video production needs
                            and create something extraordinary together.
                        </p>
                        <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>Response within 24 hours</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                <span>Free consultation</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Start Your Project</CardTitle>
                                        <CardDescription>
                                            Fill out the form below and we&apos;ll get back to you within 24 hours with a customized proposal.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {isSubmitted ? (
                                            <div className="text-center py-8">
                                                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                                <h3 className="text-xl font-semibold text-black mb-2">Thank You!</h3>
                                                <p className="text-gray-600 mb-4">
                                                    We&apos;ve received your inquiry and will get back to you within 24 hours.
                                                </p>
                                                <Button
                                                    onClick={() => setIsSubmitted(false)}
                                                    variant="outline"
                                                    className="border-black text-black hover:bg-black hover:text-white"
                                                >
                                                    Submit Another Request
                                                </Button>
                                            </div>
                                        ) : (
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                    {/* Contact Information */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="name"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Full Name *</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Your full name" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="email"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Email Address *</FormLabel>
                                                                    <FormControl>
                                                                        <Input type="email" placeholder="your.email@company.com" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="phone"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Phone Number</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="(214) 555-0123" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="company"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Company</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Your company name" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    {/* Project Details */}
                                                    <FormField
                                                        control={form.control}
                                                        name="serviceType"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Service Type *</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select a service" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="corporate">Corporate Video Production</SelectItem>
                                                                        <SelectItem value="commercial">Commercial Advertising</SelectItem>
                                                                        <SelectItem value="training">Training & Educational Videos</SelectItem>
                                                                        <SelectItem value="event">Live Event Coverage</SelectItem>
                                                                        <SelectItem value="documentary">Documentary Production</SelectItem>
                                                                        <SelectItem value="social">Social Media Content</SelectItem>
                                                                        <SelectItem value="equipment">Equipment Rental</SelectItem>
                                                                        <SelectItem value="other">Other</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="projectType"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Project Type</FormLabel>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Type" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <SelectItem value="new">New Project</SelectItem>
                                                                            <SelectItem value="update">Update Existing</SelectItem>
                                                                            <SelectItem value="revision">Content Revision</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="timeline"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Timeline</FormLabel>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Timeline" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <SelectItem value="rush">ASAP (Rush)</SelectItem>
                                                                            <SelectItem value="1month">Within 1 Month</SelectItem>
                                                                            <SelectItem value="3months">Within 3 Months</SelectItem>
                                                                            <SelectItem value="6months">Within 6 Months</SelectItem>
                                                                            <SelectItem value="planning">Still Planning</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="budget"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Budget Range</FormLabel>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Budget" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <SelectItem value="under5k">Under $5,000</SelectItem>
                                                                            <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                                                                            <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                                                                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                                                            <SelectItem value="over100k">Over $100,000</SelectItem>
                                                                            <SelectItem value="discuss">Let&apos;s Discuss</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name="message"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Project Details *</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder="Tell us about your project goals, target audience, key messages, and any specific requirements..."
                                                                        className="min-h-[120px]"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <Button
                                                        type="submit"
                                                        className="w-full bg-black text-white hover:bg-gray-800"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                                Sending...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Send className="h-4 w-4 mr-2" />
                                                                Send Request
                                                            </>
                                                        )}
                                                    </Button>
                                                </form>
                                            </Form>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-8">
                                {/* Contact Details */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Phone className="h-5 w-5 mr-2" />
                                            Get In Touch
                                        </CardTitle>
                                        <CardDescription>
                                            Multiple ways to reach our team for your video production needs.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-start space-x-3">
                                            <Mail className="h-5 w-5 text-black mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-black">Email</h4>
                                                <p className="text-gray-600">info@ramblersmedia.com</p>
                                                <p className="text-sm text-gray-500">Response within 24 hours</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Phone className="h-5 w-5 text-black mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-black">Phone</h4>
                                                <p className="text-gray-600">(214) 555-RAMB</p>
                                                <p className="text-sm text-gray-500">Mon-Fri, 8AM-6PM CST</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <MapPin className="h-5 w-5 text-black mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-black">Location</h4>
                                                <p className="text-gray-600">Dallas, Texas</p>
                                                <p className="text-sm text-gray-500">Serving TX and nationwide</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Why Choose Us */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Why Choose Ramblers Media?</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                                <div>
                                                    <h4 className="font-semibold text-black">15+ Years Experience</h4>
                                                    <p className="text-sm text-gray-600">Award-winning team with proven track record</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                                <div>
                                                    <h4 className="font-semibold text-black">Government Contractor</h4>
                                                    <p className="text-sm text-gray-600">Fully compliant with federal contracting requirements</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                                <div>
                                                    <h4 className="font-semibold text-black">End-to-End Production</h4>
                                                    <p className="text-sm text-gray-600">From concept to delivery, we handle everything</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                                <div>
                                                    <h4 className="font-semibold text-black">Bilingual Support</h4>
                                                    <p className="text-sm text-gray-600">English and Spanish language services</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Response Promise */}
                                <Card className="bg-gradient-to-br from-black to-gray-800 text-white">
                                    <CardContent className="p-6">
                                        <div className="text-center">
                                            <Clock className="h-12 w-12 text-white mx-auto mb-4" />
                                            <h3 className="text-xl font-bold mb-2">Quick Response Guarantee</h3>
                                            <p className="text-gray-300 mb-4">
                                                We respond to all inquiries within 24 hours and provide detailed project proposals within 48 hours.
                                            </p>
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div>
                                                    <div className="text-2xl font-bold">24h</div>
                                                    <div className="text-sm text-gray-400">Initial Response</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold">48h</div>
                                                    <div className="text-sm text-gray-400">Detailed Proposal</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold">1W</div>
                                                    <div className="text-sm text-gray-400">Project Kickoff</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}