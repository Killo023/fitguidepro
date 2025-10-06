# 🔥 Firebase Quick Setup - Get Your App Working in 10 Minutes

## ⚡ What You Need To Do

Your app is already configured to use Firebase - you just need to connect YOUR Firebase project!

---

## 📋 Step-by-Step Setup

### Step 1: Create Firebase Project (3 minutes)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Click **"Add project"** or **"Create a project"**

2. **Create Your Project**
   - **Project name:** Type `NannyApp` (or any name you like)
   - Click **Continue**
   - **Google Analytics:** Turn it OFF (not needed for now)
   - Click **Create project**
   - Wait 30 seconds...
   - Click **Continue**

---

### Step 2: Register Web App (2 minutes)

1. **Add Web App**
   - You'll see icons for iOS, Android, Web, Unity
   - Click the **Web icon** (`</>` symbol)

2. **Register App**
   - **App nickname:** Type `NannyApp Web`
   - **Don't check** "Firebase Hosting" checkbox
   - Click **Register app**

3. **Copy Your Config** 🚨 IMPORTANT!
   - You'll see JavaScript code like this:
   
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "nannyapp-xxxxx.firebaseapp.com",
     projectId: "nannyapp-xxxxx",
     storageBucket: "nannyapp-xxxxx.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:xxxxxxxxxxxxx"
   };
   ```
   
   - **COPY these 6 lines!** You'll need them in Step 5
   - Click **Continue to console**

---

### Step 3: Enable Email Authentication (2 minutes)

1. **Open Authentication**
   - In the left sidebar, click **"Authentication"**
   - Click **"Get started"** button

2. **Enable Email/Password**
   - Click the **"Sign-in method"** tab at the top
   - Click **"Email/Password"** in the list
   - Toggle **"Email/Password"** to ON (blue)
   - Click **"Save"**

---

### Step 4: Create Firestore Database (2 minutes)

1. **Open Firestore**
   - In the left sidebar, click **"Firestore Database"**
   - Click **"Create database"** button

2. **Choose Location**
   - **Location:** Choose the one closest to you (e.g., `us-central` or `europe-west`)
   - Click **"Next"**

3. **Set Security Rules**
   - Select **"Start in test mode"** (we'll secure it later)
   - Click **"Enable"**
   - Wait 30-60 seconds for database to be created

---

### Step 5: Update Your App Config (1 minute)

1. **Open the config file**
   - In your code editor, open: `src/config/firebase.js`

2. **Replace the placeholder values**
   - You'll see this:
   
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```
   
   - Replace with YOUR values from Step 2 (the ones you copied)
   - Make sure to keep the quotes `""`
   - **Save the file**

**Example of what it should look like:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123def456ghi789jkl012mno",
  authDomain: "nannyapp-a1b2c.firebaseapp.com",
  projectId: "nannyapp-a1b2c",
  storageBucket: "nannyapp-a1b2c.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:abc123def456"
};
```

---

### Step 6: Restart Your App

Stop your current dev server (press `Ctrl+C` in terminal) and restart:

```bash
npm run web
```

---

## 🎉 Test That It Works!

### Test 1: Create a Parent Account

1. In your app, click **"Get Started"**
2. Click **"I'm a Parent"** card
3. Fill in:
   - **Full Name:** Test Parent
   - **Email:** test@example.com
   - **Phone:** 0123456789
   - **Password:** password123
   - **Confirm Password:** password123
4. Click **"Create Account"**
5. ✅ You should see: **"Account created successfully!"**

### Test 2: Verify in Firebase Console

1. Go back to Firebase Console
2. Click **"Authentication"** in sidebar
3. Click **"Users"** tab
4. ✅ You should see `test@example.com` in the list!

### Test 3: Check Database

1. In Firebase Console, click **"Firestore Database"**
2. Click on the **"users"** collection
3. ✅ You should see your user's data (name, email, phone, etc.)!

### Test 4: Login

1. In your app, click back/sign in
2. Enter:
   - **Email:** test@example.com
   - **Password:** password123
3. Click **"Sign In"**
4. ✅ You should be logged in and see the home screen!

---

## ✅ You're Done! Here's What Works Now:

- ✅ Parent signup
- ✅ Nanny signup
- ✅ Login (email & password)
- ✅ Logout
- ✅ Password reset
- ✅ User data stored in Firestore
- ✅ Session persistence (stays logged in)

---

## 🆘 Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
**Problem:** Wrong API credentials
**Solution:** 
- Check `src/config/firebase.js`
- Make sure you copied YOUR values from Firebase Console (Step 2)
- Don't use the example values - use your actual project values

### "Missing or insufficient permissions"
**Problem:** Firestore rules are too strict
**Solution:**
- Go to Firestore Database → Rules tab
- Make sure it says:
  ```
  allow read, write: if request.time < timestamp.date(2025, 2, 6);
  ```
- This allows read/write for testing (it's in test mode)

### "User created but no data in Firestore"
**Problem:** Firestore wasn't created or is offline
**Solution:**
- Check that Step 4 was completed
- Check browser console for errors (F12 → Console tab)
- Make sure internet connection is working

### Don't see "Create Account" button / App not loading
**Problem:** App might have errors
**Solution:**
- Check terminal for errors
- Press F12 in browser → Console tab → look for errors
- Try clearing browser cache (Ctrl+Shift+Delete)
- Restart dev server: `Ctrl+C` then `npm run web`

### "Network request failed"
**Problem:** Can't connect to Firebase
**Solution:**
- Check internet connection
- Make sure firebaseConfig is correct in `src/config/firebase.js`
- Wait a few seconds and try again

---

## 🔐 Before Going Live (Production)

When you're ready to publish your app, update Firestore security rules:

1. Go to **Firestore Database** → **Rules** tab
2. Replace with these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Nanny profiles are publicly readable (for browsing)
    match /users/{userId} {
      allow read: if resource.data.userType == 'nanny';
    }
    
    // Bookings
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

---

## 📚 Learn More

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)

---

## 🎯 Summary Checklist

Before asking for help, verify:

- ✅ Firebase project created
- ✅ Web app registered in Firebase
- ✅ Email/Password authentication enabled
- ✅ Firestore database created (in test mode)
- ✅ Config values copied to `src/config/firebase.js`
- ✅ Config values are YOUR project's values (not placeholders)
- ✅ App restarted after updating config
- ✅ Browser doesn't show errors (check F12 → Console)

**Still stuck?** Check the browser console (F12) for error messages - they usually tell you exactly what's wrong!

---

Happy coding! 🎉 Your NannyApp authentication is now fully functional!

