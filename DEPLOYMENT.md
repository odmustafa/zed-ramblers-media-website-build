# Deployment Guide - Ramblers Media Website

## ✅ Convex Deployment - COMPLETED

Convex has been successfully deployed with:
- ✅ Portfolio data (7 authentic Ramblers Media videos with thumbnails)
- ✅ Equipment inventory (cameras, lenses, audio, lighting, accessories)
- ✅ Testimonials data
- ✅ All database functions deployed and working
- ✅ Environment variables configured for Vercel deployment

## 🚀 Vercel Deployment

### Required Environment Variables

You need to set these environment variables in your Vercel dashboard:

#### 1. Clerk Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cHJvdmVuLXJlaW5kZWVyLTQxLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_raOP0mtFO70nWgpbCaogWM093o4Ul3LmltZ9mIUx5X
CLERK_JWT_ISSUER_DOMAIN=https://proven-reindeer-41.clerk.accounts.dev
CLERK_WEBHOOK_SECRET=whsec_pq2p9G/0/Z9Tjb0CzYdMUaH8Gn4JV418
```

#### 2. Convex Database
```
NEXT_PUBLIC_CONVEX_URL=https://quiet-cormorant-893.convex.cloud
CONVEX_DEPLOYMENT=dev:quiet-cormorant-893
```

#### 3. Environment
```
NODE_ENV=production
```

### Steps to Deploy

1. **Set Environment Variables in Vercel**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Copy all variables from `.env.production` file
   - Set them for **Production**, **Preview**, and **Development** environments

2. **Webhook Configuration** (Already configured):
   - Clerk webhook is already set up with the provided secret
   - Webhook endpoint: `/api/webhooks/clerk`

3. **Deploy**:
   - Push your code to the connected Git repository
   - Vercel will automatically deploy
   - The build should complete successfully with the fixed Convex client

### 📊 What's Deployed:

#### Convex Database:
- **Portfolio**: 7 authentic Ramblers Media videos with thumbnails
- **Equipment**: Complete rental inventory (cameras, lenses, audio, lighting)
- **Testimonials**: Customer testimonials and reviews
- **Users**: Clerk authentication integration
- **Contact**: Contact form submissions

#### Features Ready:
- ✅ Portfolio showcase with real Vimeo videos
- ✅ Equipment rental system
- ✅ User authentication (Clerk)
- ✅ Admin dashboard
- ✅ Contact forms
- ✅ Responsive design
- ✅ SEO optimization

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
