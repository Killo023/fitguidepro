# 🧪 Test Firebase Authentication - Quick Guide

## After Setting Up Firebase Config

### 1. Restart Your App

In your terminal, press **Ctrl + C** to stop the server, then:

```bash
npm run web
```

Wait for "Web Bundled" message, then refresh browser.

---

## 2. Test Signup (Parent)

1. Go to: `http://localhost:8081`
2. Click **"Get Started"**
3. Click **"I'm a Parent"** card
4. Fill in the form:
   - Full Name: `John Doe`
   - Email: `test@example.com`
   - Phone: `+27 82 123 4567`
   - Password: `password123`
   - Confirm Password: `password123`
5. Click **"Create Account"**

### ✅ What Should Happen:
- Alert: "Account created successfully!"
- Redirects to Login screen
- Check Firebase Console → Authentication → Users
- You should see your new user!

---

## 3. Check Firebase Console

### Authentication Tab:
1. Go to Firebase Console: https://console.firebase.google.com
2. Select your NannyApp project
3. Click **Authentication** in sidebar
4. Click **Users** tab
5. **You should see:** `test@example.com` with UID

### Firestore Tab:
1. Click **Firestore Database** in sidebar
2. You should see **users** collection
3. Click to expand → See your user document
4. Should contain:
   - uid
   - email
   - userType: "parent"
   - fullName: "John Doe"
   - phone
   - createdAt

---

## 4. Test Login

1. Go back to app → Click **"Sign In"**
2. Enter:
   - Email: `test@example.com`
   - Password: `password123`
3. Click **"Sign In"**

### ✅ What Should Happen:
- Alert: "Welcome back, John Doe!"
- App loads to Parent Dashboard (Home screen)
- You're now logged in!

---

## 5. Test Nanny Signup

1. Logout (or use incognito window)
2. Click **"I'm a Nanny - Sign Up to Work"**
3. Fill in:
   - Full Name: `Mary Smith`
   - Email: `nanny@example.com`  
   - Phone: `+27 83 456 7890`
   - Years of Experience: `5`
   - Hourly Rate: `80`
   - Password: `password123`
   - Confirm Password: `password123`
4. Click **"Create Nanny Profile"**

### ✅ Check Firebase:
- Authentication → Users → Should see `nanny@example.com`
- Firestore → users → Should see new document with:
  - userType: "nanny"
  - experience: 5
  - hourlyRate: 80
  - rating: 0
  - reviews: 0

---

## 6. Test Nanny Login

1. Click **"Sign In"**
2. Email: `nanny@example.com`
3. Password: `password123`
4. **Should load Nanny Dashboard** (different tabs!)

---

## 🆘 Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"
**Fix:**
- Check `src/config/firebase.js`
- Make sure you pasted YOUR actual values from Firebase Console
- Values should NOT have quotes like "YOUR_API_KEY"
- Should be actual strings like "AIzaSyABcd..."

### Error: "Missing or insufficient permissions (Firestore)"
**Fix:**
1. Firebase Console → Firestore Database
2. Click **Rules** tab
3. Should say:
```
allow read, write: if request.time < timestamp.date(2025, 11, 1);
```
4. If not, change to test mode and publish

### Error: "Network request failed"
**Fix:**
- Check internet connection
- Try refreshing browser
- Check browser console (F12) for details

### User created but can't see in Firebase
**Fix:**
- Refresh Firebase Console page
- Wait 5 seconds and check again
- Check browser console for errors

---

## ✅ Success Checklist

After testing, you should have:
- [ ] Created Firebase project
- [ ] Enabled Email/Password auth
- [ ] Enabled Firestore database
- [ ] Updated firebase.js with YOUR config
- [ ] Restarted app
- [ ] Signed up as Parent - SUCCESS
- [ ] Saw user in Firebase Console
- [ ] Logged in as Parent - SUCCESS
- [ ] Signed up as Nanny - SUCCESS
- [ ] Logged in as Nanny - SUCCESS
- [ ] See different dashboards for Parent vs Nanny

---

## 🎉 When It Works

You'll have:
- ✅ Real user accounts stored in Firebase
- ✅ Persistent login (stays logged in)
- ✅ Different experiences for Parents vs Nannies
- ✅ User data saved to Firestore
- ✅ Ready for mobile deployment

---

## 📊 What Gets Stored

### Parent User:
```json
{
  "uid": "abc123...",
  "email": "test@example.com",
  "userType": "parent",
  "fullName": "John Doe",
  "phone": "+27 82 123 4567",
  "createdAt": "2025-09-30T..."
}
```

### Nanny User:
```json
{
  "uid": "xyz789...",
  "email": "nanny@example.com",
  "userType": "nanny",
  "fullName": "Mary Smith",
  "phone": "+27 83 456 7890",
  "experience": 5,
  "hourlyRate": 80,
  "rating": 0,
  "reviews": 0,
  "verified": false,
  "createdAt": "2025-09-30T..."
}
```

---

**Follow Steps 1-6 above and you'll have REAL authentication working in 10 minutes! 🚀**
