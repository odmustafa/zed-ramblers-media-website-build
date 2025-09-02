'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Shield, CheckCircle, AlertTriangle } from 'lucide-react'

export default function AdminSetupPage() {
  const { user } = useUser()
  const [isPromoting, setIsPromoting] = useState(false)
  const [isPromoted, setIsPromoted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const promoteToAdmin = useMutation(api.users.promoteToAdmin)

  const handlePromoteToAdmin = async () => {
    if (!user) return

    setIsPromoting(true)
    setError(null)

    try {
      await promoteToAdmin()
      setIsPromoted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to promote user to admin')
    } finally {
      setIsPromoting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-zinc-900 mb-2">Authentication Required</h3>
            <p className="text-zinc-600">Please sign in to access admin setup.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">Admin Setup</h1>
          <p className="text-zinc-600">
            This is a one-time setup page to promote your account to admin status.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Promote to Admin
            </CardTitle>
            <CardDescription>
              Grant admin privileges to your account to access the admin dashboard and manage the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPromoted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Success!</h3>
                <p className="text-zinc-600 mb-6">
                  Your account has been promoted to admin status. You can now access the admin dashboard.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => window.location.href = '/admin'}
                    className="w-full bg-black text-white hover:bg-zinc-800"
                  >
                    Go to Admin Dashboard
                  </Button>
                  <p className="text-sm text-zinc-500">
                    Note: You should remove this setup page after initial configuration.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-zinc-50 p-4 rounded-lg">
                  <h4 className="font-medium text-zinc-900 mb-2">Current User Information</h4>
                  <div className="space-y-1 text-sm text-zinc-600">
                    <p><strong>Name:</strong> {user.fullName || 'Not provided'}</p>
                    <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
                    <p><strong>User ID:</strong> {user.id}</p>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <div className="text-sm text-yellow-700">
                      <p className="font-medium mb-1">Important Security Notice</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>This will grant full admin access to your account</li>
                        <li>Admin users can manage all system data and users</li>
                        <li>This setup page should be removed after initial configuration</li>
                        <li>Only promote trusted users to admin status</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePromoteToAdmin}
                  disabled={isPromoting}
                  className="w-full bg-black text-white hover:bg-zinc-800"
                >
                  {isPromoting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Promoting to Admin...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Promote to Admin
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {!isPromoted && (
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500">
              After promoting your account, you can access the admin dashboard at{' '}
              <code className="bg-zinc-100 px-2 py-1 rounded text-zinc-700">/admin</code>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
