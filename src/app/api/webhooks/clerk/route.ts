import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { api } from '../../../../../convex/_generated/api'
import { ConvexHttpClient } from 'convex/browser'

export async function POST(req: Request) {
  // Initialize Convex client
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
  if (!convexUrl) {
    console.error('NEXT_PUBLIC_CONVEX_URL is not set')
    return new Response('Server configuration error', { status: 500 })
  }

  const convex = new ConvexHttpClient(convexUrl)

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set')
    return new Response('Server configuration error', { status: 500 })
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.text()

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    try {
      await convex.mutation(api.users.createOrUpdateUser, {
        clerkId: evt.data.id,
        email: evt.data.email_addresses[0]?.email_address || '',
        firstName: evt.data.first_name || undefined,
        lastName: evt.data.last_name || undefined,
      })
    } catch (error) {
      console.error('Error syncing user to Convex:', error)
      return new Response('Error syncing user', { status: 500 })
    }
  }

  return new Response('', { status: 200 })
}
