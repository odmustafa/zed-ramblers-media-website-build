'use client'

import Layout from '@/components/layout/Layout'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { SignInButton } from '@clerk/nextjs'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <AuthLoading>
                <Layout>
                    <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto"></div>
                            <p className="mt-4 text-zinc-600">Loading...</p>
                        </div>
                    </div>
                </Layout>
            </AuthLoading>

            <Unauthenticated>
                <Layout>
                    <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-black mb-4">Admin Access Required</h1>
                            <p className="text-zinc-600 mb-6">Please sign in to access the admin dashboard.</p>
                            <SignInButton mode="modal">
                                <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-zinc-800 transition-colors">
                                    Sign In
                                </button>
                            </SignInButton>
                        </div>
                    </div>
                </Layout>
            </Unauthenticated>

            <Authenticated>
                <Layout>
                    {children}
                </Layout>
            </Authenticated>
        </>
    )
}
