# 🚨 URGENT: Fix Vercel Deployment - Complete Guide

## Current Issues

### ❌ Issue 1: Repetitive Meal Plans
**Root Cause**: Missing `GOOGLE_GENAI_API_KEY` in Vercel environment variables

### ❌ Issue 2: Firebase Connection Error
**Error**: `POST https://securetoken.googleapis.com/v1/token?key=... net::ERR_INTERNET_DISCONNECTED`
**Root Cause**: Network connectivity or browser blocking Firebase

---

## 🔧 IMMEDIATE FIX - Step by Step

### Step 1: Get Google AI API Key (5 minutes)

1. **Visit**: https://aistudio.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click**: "Create API Key" 
4. **Select**: Create API key in new project (or existing)
5. **Copy** the key (starts with `AIza...`)
6. **Important**: Keep this key secure!

### Step 2: Add API Key to Vercel (3 minutes)

#### Via Vercel Dashboard (Easiest):

1. **Go to**: https://vercel.com/dashboard
2. **Select** your "Fitguide Pro" or "nextn" project
3. **Click**: Settings (top navigation)
4. **Click**: Environment Variables (left sidebar)
5. **Click**: "Add New" button
6. **Enter**:
   ```
   Key:   GOOGLE_GENAI_API_KEY
   Value: [Paste your API key here]
   ```
7. **Check**: ✅ Production, ✅ Preview, ✅ Development
8. **Click**: Save

### Step 3: Redeploy Your Application (2 minutes)

**After adding the API key, you MUST redeploy:**

1. **Go to**: Deployments tab (in your project)
2. **Find**: Latest deployment (commit: 571df2e)
3. **Click**: The ⋮ (three dots) menu
4. **Select**: "Redeploy"
5. **Uncheck**: "Use existing Build Cache" (important!)
6. **Click**: "Redeploy" button
7. **Wait**: 2-3 minutes for deployment to complete

### Step 4: Fix Firefox/Browser Connection Issue

**For the Firebase `ERR_INTERNET_DISCONNECTED` error:**

#### Option A: Clear Browser Cache
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page

#### Option B: Disable Ad Blockers
1. Disable uBlock, AdBlock, or similar extensions
2. Refresh the page

#### Option C: Try Different Browser
1. Test in Chrome, Edge, or Firefox incognito mode
2. This helps identify if extensions are blocking

#### Option D: Check Firewall/Network
1. Temporarily disable firewall
2. Try on different network (mobile hotspot)
3. Check if corporate/school network blocks Firebase

---

## ✅ Verification Steps

### Test 1: Check API Key is Set

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Confirm you see:
   ```
   GOOGLE_GENAI_API_KEY = •••••••••••••• (hidden)
   Environments: Production, Preview, Development
   ```

### Test 2: Verify New Deployment

1. Go to Deployments tab
2. Check the STATUS is "Ready" (green checkmark)
3. Check the CREATED time is recent (within last 5 minutes)
4. Check the deployment uses the latest commit (571df2e)

### Test 3: Test Meal Plan Generation

1. **Visit** your Vercel URL (https://your-app.vercel.app)
2. **Login/Signup** (after fixing browser issue)
3. **Create** a fitness goal:
   - Goal: Weight Loss
   - Calories: 2000
   - Diet: Balanced
4. **Click**: "Generate Meal Plan for Monday"
5. **Wait**: 3-5 seconds for AI generation
6. **Verify**: You see detailed meals with ingredients

### Test 4: Verify Daily Variety

1. **Generate**: Meal plan for Monday → Note the meals
2. **Generate**: Meal plan for Tuesday → Should be DIFFERENT
3. **Generate**: Meal plan for Wednesday → Should be DIFFERENT again

✅ **Success**: Each day has unique meals with different cuisines!

---

## 📊 Expected Results

### Before Fix (Current):
```
❌ Monday:    Oatmeal, Grilled Chicken Salad, Salmon
❌ Tuesday:   Oatmeal, Grilled Chicken Salad, Salmon (SAME!)
❌ Wednesday: Oatmeal, Grilled Chicken Salad, Salmon (SAME!)

Status: AI not working due to missing API key
```

### After Fix:
```
✅ Monday:    Greek Yogurt Parfait, Sea Bass Tabbouleh, Lamb Chops
✅ Tuesday:   Tofu Scramble, Teriyaki Beef, Miso Salmon (DIFFERENT!)
✅ Wednesday: Huevos Rancheros, Fajita Bowl, Shrimp Tacos (DIFFERENT!)

Status: AI working with variety enabled!
```

---

## 🔍 Troubleshooting

### Problem: API Key Added but Still Not Working

**Solution 1**: Force full rebuild
```bash
# Delete deployment cache
1. Go to Vercel → Settings → General
2. Scroll to "Build & Development Settings"
3. Clear build cache (if option available)
4. Redeploy again
```

**Solution 2**: Check build logs
```bash
1. Go to Deployments → Click latest
2. View "Build Logs"
3. Look for errors like:
   - "Missing GOOGLE_GENAI_API_KEY"
   - "Authentication failed"
   - "API quota exceeded"
```

### Problem: Firebase Error Persists

**Check Network Tab**:
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Look for failed requests to `googleapis.com`
5. Check the error details

**Common Fixes**:
- **CORS Error**: Firebase config issue (already correct in code)
- **DNS Error**: Network/ISP blocking Google services
- **Timeout**: Slow connection or firewall
- **403 Forbidden**: API key restrictions or quota

### Problem: "Invalid API Key" Error

**Check These**:
1. API key copied correctly (no extra spaces)
2. API key is for Google AI (Gemini), not Firebase
3. Gemini API is enabled in Google Cloud Console
4. No rate limits or quota exceeded

### Problem: Deployment Fails

**Check**:
1. Build logs for errors
2. Ensure Node.js version is compatible (18.x or higher)
3. Verify all dependencies are installed
4. Check `package.json` scripts are correct

---

## 🎯 Quick Checklist

- [ ] Get Google AI API Key from https://aistudio.google.com/app/apikey
- [ ] Add `GOOGLE_GENAI_API_KEY` to Vercel Environment Variables
- [ ] Select all environments (Production, Preview, Development)
- [ ] Redeploy from Vercel Dashboard (uncheck build cache)
- [ ] Wait for deployment to complete (green checkmark)
- [ ] Clear browser cache / disable ad blockers
- [ ] Test Firebase login works
- [ ] Generate meal plan for Monday
- [ ] Verify meals are detailed and specific
- [ ] Generate meal plan for Tuesday
- [ ] Confirm Tuesday meals are DIFFERENT from Monday
- [ ] Success! 🎉

---

## 📞 Alternative: Local Testing First

If Vercel deployment is problematic, test locally first:

1. **Create `.env.local`** in project root:
   ```bash
   GOOGLE_GENAI_API_KEY=your_actual_api_key_here
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Visit**: http://localhost:9002

4. **Test meal generation** locally

5. **Once working locally**, then deploy to Vercel

---

## 🚀 Summary

**The core issue**: Your Vercel deployment doesn't have the Google AI API key configured, so the AI can't generate varied meal plans.

**The solution**: 
1. Get API key from Google AI Studio
2. Add to Vercel environment variables
3. Redeploy application
4. Fix browser/network issues for Firebase

**Time required**: ~10 minutes total

**Result**: Unique, varied meal plans for each day of the week! 🎉

---

**Created**: October 9, 2025  
**Priority**: 🔴 URGENT  
**Status**: ⏳ Awaiting API Key Configuration

