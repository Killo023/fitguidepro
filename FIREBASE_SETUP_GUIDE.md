# 🔥 Firebase Setup Guide - Complete Instructions

## Step 1: Create Firebase Project (5 minutes)

### 1.1 Go to Firebase Console
1. Visit: **https://console.firebase.google.com**
2. Click **"Add project"** or **"Create a project"**

### 1.2 Create Your Project
1. **Project name:** `NannyApp` (or your preferred name)
2. Click **Continue**
3. **Google Analytics:** Toggle OFF (optional, not needed initially)
4. Click **Create project**
5. Wait 30 seconds for setup
6. Click **Continue** when done

---

## Step 2: Register Your Web App

### 2.1 Add Web App
1. In Firebase console, click **Web icon** (</> symbol)
2. **App nickname:** `NannyApp Web`
3. **Don't check** "Also set up Firebase Hosting"
4. Click **Register app**

### 2.2 Copy Your Config
You'll see code like this:

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

**COPY THIS!** You'll need it in Step 4.

---

## Step 3: Enable Authentication

### 3.1 Setup Email/Password Auth
1. In Firebase console sidebar, click **Authentication**
2. Click **Get started**
3. Click **Sign-in method** tab
4. Click **Email/Password**
5. **Enable** the top toggle (Email/Password)
6. Click **Save**

### 3.2 Enable Google Sign-In (Optional)
1. In **Sign-in method** tab, click **Google**
2. **Enable** toggle
3. Enter **Project support email** (your email)
4. Click **Save**

---

## Step 4: Enable Firestore Database

### 4.1 Create Firestore Database
1. In Firebase console sidebar, click **Firestore Database**
2. Click **Create database**
3. **Choose location:** `nam5 (us-central)` or closest to South Africa
4. Click **Next**

### 4.2 Set Security Rules
**Choose:** Start in **test mode** (for development)
- This allows read/write for 30 days
- Click **Enable**

### 4.3 Production Rules (Later)
When ready for production, update rules in Firestore → Rules tab:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Nanny profiles are publicly readable
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

---

## Step 5: Enable Cloud Storage (For Photo Uploads)

### 5.1 Setup Storage
1. In Firebase console sidebar, click **Storage**
2. Click **Get started**
3. **Start in test mode** (for development)
4. Click **Next**
5. **Choose location:** Same as Firestore
6. Click **Done**

---

## Step 6: Update Your App Config

### 6.1 Open Firebase Config File
Open: `src/config/firebase.js`

### 6.2 Replace Placeholder Values
Replace `YOUR_API_KEY`, `YOUR_PROJECT_ID`, etc. with values from Step 2.2:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX",           // ← Your actual values
  authDomain: "nannyapp-xxxxx.firebaseapp.com",
  projectId: "nannyapp-xxxxx",
  storageBucket: "nannyapp-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

### 6.3 Save the File

---

## Step 7: Update Auth Context to Use Firebase

I've already created the service file (`src/services/authService.js`).

Now update `src/context/AuthContext.js`:

```javascript
import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { signInUser, signUpUser, signOutUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userData = await getCurrentUserData(firebaseUser.uid);
        if (userData.success) {
          setUser(userData.data);
          setUserType(userData.data.userType);
        }
      } else {
        // User is signed out
        setUser(null);
        setUserType(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const result = await signInUser(email, password);
    if (result.success) {
      setUser(result.user);
      setUserType(result.user.userType);
    }
    return result;
  };

  const logout = async () => {
    const result = await signOutUser();
    if (result.success) {
      setUser(null);
      setUserType(null);
    }
    return result;
  };

  const signup = async (userData, type) => {
    // This will be called from signup screens with email/password
    return { success: true }; // Signup screens handle Firebase directly
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## Step 8: Test Your Setup

### 8.1 Restart Your App
```bash
npm run web
```

### 8.2 Try Signing Up
1. Go to Welcome → Get Started → I'm a Parent
2. Fill in form with real email/password
3. Click "Create Account"
4. Check Firebase Console → Authentication → Users
5. You should see your new user!

### 8.3 Check Firestore
1. Firebase Console → Firestore Database
2. You should see `users` collection
3. Click to see your user document with all data!

---

## 🎉 What You Can Do Now

### ✅ Real Authentication
- Users sign up with email/password
- Login with credentials
- Password reset emails
- Google/Facebook sign-in (if enabled)

### ✅ Data Storage
- User profiles stored in Firestore
- Parent data: name, email, phone, children
- Nanny data: experience, rate, specialties, availability
- Bookings collection (next step)
- Reviews collection (next step)

### ✅ File Storage
- Upload nanny profile photos
- Upload verification documents
- Store booking receipts

---

## 🔒 Security Best Practices

### For Production:
1. **Update Firestore Rules** (see Step 4.3)
2. **Enable App Check** - Prevent API abuse
3. **Set up rate limiting** - Prevent spam signups
4. **Add email verification** - Verify user emails
5. **Secure API keys** - Use environment variables

---

## 📊 Database Structure

Your Firestore will have these collections:

```
users/
  ├── {userId}/
  │   ├── uid: "abc123"
  │   ├── email: "user@email.com"
  │   ├── userType: "parent" or "nanny"
  │   ├── fullName: "John Doe"
  │   ├── phone: "+27 82 123 4567"
  │   └── ... (other user data)

bookings/
  ├── {bookingId}/
  │   ├── parentId: "userId"
  │   ├── nannyId: "userId"
  │   ├── date: "2025-10-15"
  │   ├── startTime: "09:00"
  │   ├── endTime: "17:00"
  │   ├── status: "pending"
  │   └── total: 680

reviews/
  ├── {reviewId}/
  │   ├── nannyId: "userId"
  │   ├── parentId: "userId"
  │   ├── rating: 5
  │   ├── comment: "Great nanny!"
  │   └── date: "2025-10-16"
```

---

## 🆘 Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"
- Double-check your Firebase config values
- Make sure you copied them correctly from Firebase console

### Error: "Firebase: Missing or insufficient permissions"
- Go to Firestore → Rules
- Make sure you're in "test mode" for development

### Error: "Network request failed"
- Check your internet connection
- Firebase might be blocked by firewall

### Can't see users in Firebase Console
- Wait a few seconds and refresh
- Check Authentication → Users tab

---

## 🚀 Next Steps

After Firebase is working:

1. **Add booking creation** to Firestore
2. **Real-time updates** for new bookings
3. **Push notifications** when booked
4. **Payment integration** (Stripe/PayFast)
5. **Photo uploads** for nanny profiles
6. **Review system** after bookings

---

## 💰 Firebase Free Tier Limits

**More than enough for your app:**

- ✅ **Authentication:** 50,000 users/month
- ✅ **Firestore:** 50,000 reads/day, 20,000 writes/day
- ✅ **Storage:** 5GB total, 1GB/day downloads
- ✅ **Hosting:** 10GB storage, 360MB/day bandwidth

---

**Follow these steps and your app will have REAL authentication and database! 🎉**

**Start with Step 1 and let me know when you have your Firebase config values!**
