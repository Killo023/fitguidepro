# Environment Variables Setup

## Required Environment Variables

Your Fitguide Pro application requires the following environment variable to be configured in Vercel:

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
GOOGLE_GENAI_API_KEY=your_actual_api_key_here
```

Then run your development server:
```bash
npm run dev
```

---

## Vercel Production Setup

### Add Environment Variable in Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Fitguide Pro project
3. Navigate to: **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Name**: `GOOGLE_GENAI_API_KEY`
   - **Value**: [Your API key]
   - **Environments**: Check all (Production, Preview, Development)
6. Click **Save**

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

