'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { Authenticated, Unauthenticated, AuthLoading, useMutation } from 'convex/react'
import { SignInButton } from '@clerk/nextjs'
import { api } from '../../../convex/_generated/api'
import { useEffect } from 'react'

function DashboardContent() {
  const { user } = useUser()
  const ensureUser = useMutation(api.users.ensureCurrentUser)

  // Ensure user exists in Convex database when component mounts
  useEffect(() => {
    if (user) {
      ensureUser().catch(console.error)
    }
  }, [user, ensureUser])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-black">Dashboard</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Welcome to your dashboard, {user?.firstName || user?.username || 'User'}!
            </h2>
            <p className="text-gray-600">
              This is where you&apos;ll be able to manage your equipment rentals and view your account information.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <>
      <AuthLoading>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </AuthLoading>

      <Unauthenticated>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Ramblers Media</h1>
            <p className="text-gray-600 mb-6">Sign in to access your dashboard</p>
            <SignInButton mode="modal">
              <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <DashboardContent />
      </Authenticated>
    </>
  )
}
