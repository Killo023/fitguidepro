# 🚀 Vercel Deployment Guide - Fix Missing AI Configuration

## ⚠️ Current Issue

Your Vercel deployment is showing the **OLD behavior** (repetitive meal plans) because:

1. ❌ **Missing Google AI API Key** - The AI needs `GOOGLE_GENAI_API_KEY` to work
2. ❌ **Environment variables not configured in Vercel**
3. ✅ Code changes are pushed to GitHub (commit 571df2e)

Without the API key, the AI can't generate personalized, varied meal plans!

---

## 🔧 Step-by-Step Fix

### Step 1: Get Your Google AI API Key

1. Go to **[Google AI Studio](https://ai.google.dev/)**
2. Click **"Get API Key"** 
3. Create a new API key or use an existing one
4. Copy the API key (it looks like: `AIza...`)

### Step 2: Add Environment Variables to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Click on your **Fitguide Pro** project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:
   ```
   Name:  GOOGLE_GENAI_API_KEY
   Value: [paste your API key here]
   ```
5. Select environments: ✅ Production, ✅ Preview, ✅ Development
6. Click **Save**

#### Option B: Via Vercel CLI (Alternative)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (if not already linked)
vercel link

# Add environment variable
vercel env add GOOGLE_GENAI_API_KEY production

# Enter your API key when prompted
```

### Step 3: Trigger a New Deployment

#### Option A: Redeploy from Dashboard

1. In Vercel Dashboard → Your Project
2. Go to **Deployments** tab
3. Find the latest deployment (commit 571df2e)
4. Click the **⋮** menu → **Redeploy**
5. Check ✅ **Use existing Build Cache** (optional)
6. Click **Redeploy**

#### Option B: Push a New Commit (Alternative)

```bash
# Make a small change to trigger deployment
git commit --allow-empty -m "Trigger Vercel redeploy with API key"
git push origin master
```

#### Option C: Via CLI (if authenticated)

```bash
vercel --prod
```

### Step 4: Verify the Deployment

1. Wait for deployment to complete (~2-3 minutes)
2. Visit your live site
3. Try generating meal plans for different days
4. Each day should now have **unique, varied meals**!

---

## ✅ Expected Results After Fix

### Before (Current - Broken):
```
Monday:    Oatmeal, Chicken Salad, Salmon
Tuesday:   Oatmeal, Chicken Salad, Salmon  ❌ Same!
Wednesday: Oatmeal, Chicken Salad, Salmon  ❌ Same!
```

### After (With API Key - Fixed):
```
Monday:    Greek Yogurt Parfait, Sea Bass Tabbouleh, Lamb Chops ✅
Tuesday:   Tofu Scramble, Teriyaki Beef, Miso Salmon ✅ Different!
Wednesday: Huevos Rancheros, Fajita Bowl, Shrimp Tacos ✅ Different!
```

---

## 🔍 Troubleshooting

### Issue: Deployment succeeds but AI still doesn't work

**Check 1: Verify API Key is Set**
```bash
# In Vercel Dashboard → Settings → Environment Variables
# Make sure GOOGLE_GENAI_API_KEY is listed
```

**Check 2: Check Vercel Build Logs**
```
1. Go to Deployments tab
2. Click on latest deployment
3. Check "Build Logs" for errors
4. Look for messages about missing environment variables
```

**Check 3: Verify API Key is Valid**
```
1. Test your API key at https://ai.google.dev/
2. Make sure it's not expired or rate-limited
3. Check that Gemini 2.0 Flash is enabled for your key
```

### Issue: "401 Unauthorized" or "API Key Invalid"

- Double-check the API key is copied correctly (no extra spaces)
- Verify the API key has Gemini API access enabled
- Try regenerating a new API key

### Issue: Meals still repetitive even with API key

- Clear browser cache and hard refresh (Ctrl+F5)
- Check that the latest commit (571df2e) is deployed
- Verify the `temperature: 1.2` change is in the deployed code

---

## 📊 How to Verify Everything Works

### Test Checklist:

1. ✅ Go to your Vercel URL
2. ✅ Set up a fitness goal (e.g., Weight Loss, 2000 cal/day)
3. ✅ Click "Generate Meal Plan for Monday"
4. ✅ Wait for AI to generate (should take 3-5 seconds)
5. ✅ Verify meals are specific and detailed
6. ✅ Click "Generate Meal Plan for Tuesday"  
7. ✅ **Confirm meals are DIFFERENT from Monday**
8. ✅ Repeat for Wednesday, Thursday, etc.
9. ✅ Each day should have unique variety!

---

## 🎯 Quick Summary

| Step | Action | Status |
|------|--------|--------|
| 1 | Get Google AI API Key | ⏳ TODO |
| 2 | Add to Vercel Environment Variables | ⏳ TODO |
| 3 | Redeploy from Vercel Dashboard | ⏳ TODO |
| 4 | Test meal plan generation | ⏳ TODO |
| 5 | Verify daily variety | ⏳ TODO |

---

## 💡 Important Notes

- **API Key Security**: Never commit `.env` files to Git (they're in `.gitignore`)
- **Cost**: Google AI offers a free tier, but monitor your usage
- **Rate Limits**: If you hit limits, consider caching or upgrading your plan
- **Deployment Time**: Changes take 2-3 minutes to deploy on Vercel

---

## 📞 Still Having Issues?

If problems persist after following this guide:

1. Check Vercel deployment logs for errors
2. Verify your Google AI API key quota/limits
3. Make sure you're testing the production URL (not a stale preview)
4. Try the development environment locally first: `npm run dev`

---

**Last Updated**: October 9, 2025  
**Related Commits**: 571df2e (Meal variety fix)  
**Status**: ⚠️ Requires API Key Configuration

