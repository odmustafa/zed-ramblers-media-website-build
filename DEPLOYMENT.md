# Deployment Guide - Ramblers Media Website

## Vercel Deployment

### Required Environment Variables

You need to set these environment variables in your Vercel dashboard:

#### 1. Clerk Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain.clerk.accounts.dev
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

#### 2. Convex Database
```
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
CONVEX_DEPLOYMENT=dev:your-convex-deployment
```

#### 3. Environment
```
NODE_ENV=production
```

### Steps to Deploy

1. **Set Environment Variables in Vercel**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add all the variables listed above

2. **Get Clerk Webhook Secret**:
   - Go to Clerk Dashboard → Webhooks
   - Create a new webhook pointing to: `https://your-domain.vercel.app/api/webhooks/clerk`
   - Copy the webhook secret and add it as `CLERK_WEBHOOK_SECRET`

3. **Deploy**:
   - Push your code to the connected Git repository
   - Vercel will automatically deploy

### Troubleshooting

#### "Client created with undefined deployment address"
- Ensure `NEXT_PUBLIC_CONVEX_URL` is set in Vercel environment variables
- Make sure the variable name is exactly `NEXT_PUBLIC_CONVEX_URL`

#### Webhook Errors
- Verify `CLERK_WEBHOOK_SECRET` is set correctly
- Check that the webhook URL in Clerk matches your deployment URL

#### Build Failures
- Check all environment variables are set in Vercel
- Ensure no typos in variable names
- Verify all secrets are valid and not expired
