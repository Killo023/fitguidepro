# AI Meal Generation Fix - 500 Error Resolution

## Problem Identified
The 500 Internal Server Error when generating meals with AI was caused by:
1. Missing Genkit Next.js API route integration
2. Incorrect server action implementation
3. Missing proper environment variable configuration

## Changes Made

### 1. Created Genkit API Route (`src/app/api/genkit/route.ts`)
- Added proper Next.js API route handler using `@genkit-ai/next`
- Configured CORS for both development and production
- Imported all AI flows to register them properly

### 2. Updated Next.js Configuration (`next.config.ts`)
- Added `serverComponentsExternalPackages` for Genkit packages
- This prevents bundling issues with Genkit in production

### 3. Fixed Meal Suggestions Component (`src/components/meal-suggestions.tsx`)
- Replaced direct server action calls with API route calls
- Updated to use fetch with proper error handling
- Removed unused server action import

### 4. Updated Genkit Configuration (`src/ai/genkit.ts`)
- Added explicit API key configuration
- Ensures environment variable is properly loaded

## Required Environment Variable

**CRITICAL**: You must set the `GOOGLE_GENAI_API_KEY` environment variable in Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Fitguide Pro project
3. Navigate to: **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Name**: `GOOGLE_GENAI_API_KEY`
   - **Value**: [Your Google AI API key from https://ai.google.dev/]
   - **Environments**: Check all (Production, Preview, Development)
6. Click **Save**

## Deployment Steps

1. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "Fix AI meal generation 500 error"
   git push
   ```

2. **Redeploy on Vercel**:
   - Go to **Deployments** tab in Vercel
   - Find latest deployment
   - Click **⋮** → **Redeploy**
   - Wait for deployment to complete

3. **Test the fix**:
   - Visit your Vercel URL
   - Create a fitness goal
   - Try generating meal plans for different days
   - Each day should now work without 500 errors ✅

## How It Works Now

1. User clicks "Generate AI Suggestions" for a day
2. Frontend sends POST request to `/api/genkit`
3. API route calls the `suggestDailyMealPlanFlow` with user data
4. Genkit processes the request using Google AI (Gemini 2.0 Flash)
5. Response is returned to frontend and displayed

## Troubleshooting

If you still get errors after deployment:

1. **Check Vercel logs**:
   - Go to Vercel Dashboard → Functions tab
   - Look for any error logs in the `/api/genkit` function

2. **Verify environment variable**:
   - Ensure `GOOGLE_GENAI_API_KEY` is set in Vercel
   - Check that the API key is valid and has proper permissions

3. **Check API key format**:
   - Should start with `AIza...`
   - No extra spaces or characters

## Files Modified
- `src/app/api/genkit/route.ts` (new)
- `next.config.ts`
- `src/components/meal-suggestions.tsx`
- `src/ai/genkit.ts`

The fix ensures proper integration between Next.js and Genkit, with correct API key handling and error management.
