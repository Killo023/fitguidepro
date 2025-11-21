# Environment Variables Setup

## Required Environment Variables

Your Fitguide Pro application requires the following environment variables to be configured:

### Firebase Configuration (REQUIRED)

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**How to get your Firebase config:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon ⚙️ → **Project settings**
4. Scroll down to "Your apps" section
5. Copy the config values from the Firebase SDK snippet

### Google AI API Key (REQUIRED)

```bash
GOOGLE_GENAI_API_KEY=your_api_key_here
```

**How to get your API key:**

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create a new API key or use an existing one
4. Copy the key (format: `AIza...`)

---

## Local Development Setup

Create a `.env.local` file in your project root:

```bash
# .env.local (DO NOT COMMIT THIS FILE)

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Google AI (Gemini) API Key
GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
```

Then run your development server:
```bash
npm run dev
```

---

## Vercel Production Setup

### Add Environment Variables in Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Fitguide Pro project
3. Navigate to: **Settings** → **Environment Variables**
4. Click **Add New** for each variable below:

**Firebase Configuration:**
- `NEXT_PUBLIC_FIREBASE_API_KEY` = Your Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` = Your Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` = Your Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` = Your Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = Your messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` = Your Firebase app ID
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` = Your measurement ID (optional)

**Google AI API:**
- `GOOGLE_GENAI_API_KEY` = Your Google AI API key

5. For each variable:
   - **Environments**: Check all (Production, Preview, Development)
   - Click **Save**

### Redeploy Your Application:

1. Go to **Deployments** tab
2. Find latest deployment
3. Click **⋮** → **Redeploy**
4. Wait for deployment to complete

Your AI meal plan generation will now work correctly!

---

## Testing

After setting up the API key:

1. Visit your Vercel URL
2. Create a fitness goal
3. Generate meal plans for different days
4. Each day should have unique, varied meals ✅

---

## Security Notes

- ⚠️ Never commit `.env` or `.env.local` files to Git
- ✅ Only use `.env.example` for documentation
- ✅ The `.gitignore` file prevents accidental commits
- ✅ Vercel environment variables are secure and encrypted

