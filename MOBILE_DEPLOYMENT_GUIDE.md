# 📱 Deploy NannyApp to iOS & Android - Complete Guide

## ✅ Good News!

Your app is built with **React Native + Expo**, which means:
- ✅ **One codebase** works on iOS, Android, AND Web
- ✅ **90% of code is shared** across platforms
- ✅ **Easy deployment** with Expo Application Services (EAS)
- ✅ **Free to build** with EAS free tier

---

## 🎯 Deployment Options

### Option 1: EAS Build (Recommended - Easiest)
- Cloud-based builds
- No Mac required for iOS builds
- Automatic code signing
- **Best for most apps**

### Option 2: Local Build
- Build on your own computer
- Requires Mac for iOS builds
- Full control over build process

---

## 🚀 RECOMMENDED: Deploy with EAS Build

### Prerequisites:
- ✅ Expo account (free)
- ✅ Apple Developer account ($99/year for iOS)
- ✅ Google Play Console account ($25 one-time for Android)

---

## Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

Then login:
```bash
eas login
```

(Create free account if you don't have one)

---

## Step 2: Configure Your Project

### 2.1 Update app.json
Open `app.json` and update:

```json
{
  "expo": {
    "name": "NannyApp",
    "slug": "nannyapp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#6366F1"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.nannyapp",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#6366F1"
      },
      "package": "com.yourcompany.nannyapp",
      "versionCode": 1,
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION"
      ]
    },
    "web": {
      "bundler": "metro",
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "YOUR_PROJECT_ID_HERE"
      }
    }
  }
}
```

### 2.2 Initialize EAS
```bash
cd c:\Users\27794\Desktop\Projects\Nandi\NannyApp
eas build:configure
```

This creates `eas.json` file.

---

## Step 3: Create App Icons & Splash Screen

### Quick Method (Automated):
1. Create a 1024x1024px icon (your app logo)
2. Save as `assets/icon.png`
3. Run:
```bash
npx expo install expo-splash-screen
```

### Or Use Free Tools:
- **Icon Generator**: https://www.appicon.co/
- **Upload your logo** → Download all sizes

---

## Step 4: Build for Android

### 4.1 Create Android Build
```bash
eas build --platform android --profile preview
```

**What happens:**
- ✅ Uploads your code to Expo servers
- ✅ Builds .APK file (10-20 minutes)
- ✅ Downloads automatically when done

### 4.2 Test APK on Your Phone
1. Download the .apk file
2. Transfer to Android phone
3. Install and test

### 4.3 Build Production Version
```bash
eas build --platform android --profile production
```

This creates .AAB file for Google Play Store.

---

## Step 5: Build for iOS

### 5.1 You Need Apple Developer Account
1. Go to: https://developer.apple.com
2. Enroll in Apple Developer Program ($99/year)
3. Wait for approval (can take 24-48 hours)

### 5.2 Create iOS Build
```bash
eas build --platform ios --profile preview
```

**What happens:**
- ✅ EAS handles all certificates automatically
- ✅ Creates .ipa file for iOS
- ✅ No Mac required!

### 5.3 Install on iPhone
1. Download .ipa file from EAS dashboard
2. Use **TestFlight** (Apple's beta testing tool)
3. Install on your iPhone

---

## Step 6: Submit to App Stores

### 🤖 ANDROID - Google Play Store

#### 6.1 Create Google Play Console Account
1. Go to: https://play.google.com/console
2. Pay $25 one-time registration fee
3. Accept agreements

#### 6.2 Create New App
1. Click **Create app**
2. Fill in details:
   - App name: **NannyApp**
   - Default language: **English**
   - App type: **Application**
   - Category: **Lifestyle** or **Parenting**
   - Free/Paid: **Free** (or paid if you charge)

#### 6.3 Upload Your App
1. Go to **Production** → **Create new release**
2. Upload the .AAB file from EAS build
3. Fill in:
   - Release name: "1.0.0"
   - Release notes: "First release"

#### 6.4 Create Store Listing
You need:
- **App icon** (512x512)
- **Screenshots** (at least 2)
- **Feature graphic** (1024x500)
- **Short description** (80 chars): "Find trusted nannies in South Africa"
- **Full description** (4000 chars):
```
NannyApp - Your Trusted Childcare Partner

Find qualified, verified nannies in your area with ease. NannyApp connects parents with experienced childcare professionals across South Africa.

Features:
✓ Browse verified nanny profiles
✓ View ratings and reviews
✓ Book instantly with transparent pricing in ZAR
✓ Secure messaging
✓ Track all bookings
✓ Rate and review nannies

For Nannies:
✓ Sign up to find work
✓ Set your own rates
✓ Flexible schedule
✓ Get paid securely

Download NannyApp today and find the perfect nanny for your family!
```

- **App category**: Lifestyle/Parenting
- **Content rating**: Fill out questionnaire
- **Privacy policy**: Required (see below)

#### 6.5 Submit for Review
- Review takes 1-7 days
- Fix any issues they report
- Once approved → LIVE on Google Play! 🎉

---

### 🍎 iOS - Apple App Store

#### 7.1 Create App Store Connect Account
1. Go to: https://appstoreconnect.apple.com
2. Use Apple Developer account credentials

#### 7.2 Create New App
1. Click **+** → **New App**
2. Fill in:
   - Platform: **iOS**
   - Name: **NannyApp**
   - Primary language: **English**
   - Bundle ID: Select the one from your build
   - SKU: **nannyapp-001**
   - User Access: **Full Access**

#### 7.3 App Information
- **Name**: NannyApp
- **Subtitle**: Find Trusted Nannies
- **Category**: Lifestyle
- **Content Rights**: Check if you have rights

#### 7.4 Pricing & Availability
- Price: **Free** (or set price)
- Availability: **All countries** or select South Africa

#### 7.5 Prepare for Submission
You need:
- **App icon** (1024x1024)
- **Screenshots**: 
  - iPhone 6.7" (1290x2796) - at least 3
  - iPad Pro 12.9" (2048x2732) - at least 2
- **App preview video** (optional but recommended)
- **Description**:
```
NannyApp - Your Trusted Childcare Partner

Find qualified, verified nannies in your area with NannyApp. We connect parents with experienced childcare professionals across South Africa.

KEY FEATURES:
• Browse verified nanny profiles with photos
• View detailed ratings and parent reviews  
• Transparent pricing in South African Rand
• Book instantly or schedule in advance
• Secure in-app messaging
• Track all your bookings
• Rate and review after each booking

FOR NANNIES:
• Sign up to find childcare work
• Set your own hourly rates
• Manage your availability
• Get paid securely
• Build your reputation with reviews

Whether you need occasional babysitting, after-school care, or a full-time nanny, NannyApp makes it easy to find trusted childcare in your neighborhood.

Download NannyApp today!
```

- **Keywords**: nanny, babysitter, childcare, parents, kids, children, south africa
- **Support URL**: Your website or email
- **Privacy Policy URL**: Required (see below)

#### 7.6 Upload Build
1. In App Store Connect, go to your app
2. Click **+ Version or Platform**
3. Select the build from EAS/TestFlight
4. Fill in:
   - Version: 1.0.0
   - Copyright: 2025 Your Company Name
   - Release type: Manual or Automatic

#### 7.7 Submit for Review
- **Age rating**: Complete questionnaire
- **Export compliance**: No (unless you add encryption)
- **Advertising identifier**: No (unless you use ads)
- Submit → Review takes 1-7 days
- Once approved → LIVE on App Store! 🎉

---

## 📸 Creating Screenshots

### Use Expo Dev Client or Emulators:

**For Android:**
1. Run: `npm run android` (if you have Android Studio)
2. Take screenshots in emulator
3. Or use actual phone screenshots

**For iOS:**
1. Run on Xcode Simulator
2. Take screenshots (Cmd+S)
3. Or use TestFlight on actual iPhone

**Quick Trick:**
Use your web version:
1. Open in browser at `http://localhost:8081`
2. Press F12 → Device toolbar
3. Select iPhone 14 Pro Max
4. Take screenshots (use Windows Snipping Tool)
5. Resize to required dimensions

---

## 🔐 Privacy Policy (Required!)

You MUST have a privacy policy URL for both stores.

### Quick Solution:
Use free generator:
1. Go to: https://www.freeprivacypolicy.com/free-privacy-policy-generator/
2. Fill in your app details
3. Generate privacy policy
4. Host on:
   - Your website
   - GitHub Pages (free)
   - Or use: https://www.termsfeed.com/

### Or Create One:
```
NannyApp Privacy Policy

Last updated: September 30, 2025

Information We Collect:
- Email address and name (for account creation)
- Phone number (optional, for contact)
- Location data (to find nearby nannies)
- Booking history
- Reviews and ratings

How We Use Information:
- To provide and improve our services
- To match parents with nannies
- To process bookings
- To send booking confirmations
- To prevent fraud

Data Sharing:
- We do not sell your personal information
- Nanny profiles are publicly visible
- Payment processing through secure third parties

Your Rights:
- Access your data
- Delete your account
- Opt out of communications

Contact: support@nannyapp.com
```

Host this somewhere and use the URL in your app store listings.

---

## 💰 Costs Summary

### One-Time Costs:
- **Google Play**: $25 (one-time)
- **Apple Developer**: $99/year

### Monthly Costs (if using EAS):
- **EAS Free Tier**: FREE (limited builds)
- **EAS Production**: $29/month (unlimited builds)

### Alternative - Build Locally (Free):
- Use your own computer
- Free forever
- Requires Mac for iOS builds

---

## 🔄 Update Process (After First Release)

### For Updates:

1. **Update version numbers**:
```json
// app.json
"version": "1.1.0",  // Increment
"ios": {
  "buildNumber": "2"  // Increment
},
"android": {
  "versionCode": 2    // Increment
}
```

2. **Build new version**:
```bash
eas build --platform all --profile production
```

3. **Submit to stores** same way as before

---

## 🎯 EAS Build Configuration

Your `eas.json` should look like:

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

## 📱 Testing Before Launch

### Internal Testing:

**Android:**
1. Use **Internal Testing** track in Play Console
2. Add testers by email
3. They download from Play Store (test version)

**iOS:**
1. Use **TestFlight**
2. Add testers by email  
3. They download from TestFlight app
4. Can have up to 10,000 beta testers!

---

## 🚀 Quick Start Commands

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Build for Android (preview/testing)
eas build --platform android --profile preview

# Build for iOS (preview/testing)
eas build --platform ios --profile preview

# Build for production (both platforms)
eas build --platform all --profile production

# Submit to Google Play
eas submit --platform android

# Submit to App Store
eas submit --platform ios
```

---

## ✅ Deployment Checklist

### Before Building:
- [ ] Firebase configured and working
- [ ] All features tested on web
- [ ] App icon created (1024x1024)
- [ ] Splash screen created
- [ ] Updated app.json with correct bundle IDs
- [ ] Privacy policy created and hosted

### For Android:
- [ ] Google Play Console account created ($25)
- [ ] EAS build completed successfully
- [ ] .AAB file downloaded
- [ ] Screenshots taken (at least 2)
- [ ] Store listing filled out
- [ ] Privacy policy URL added
- [ ] Submitted for review

### For iOS:
- [ ] Apple Developer account ($99/year)
- [ ] EAS build completed
- [ ] TestFlight tested on real iPhone
- [ ] Screenshots taken (iPhone + iPad)
- [ ] Store listing filled out
- [ ] Privacy policy URL added
- [ ] Submitted for review

### After Launch:
- [ ] Monitor reviews
- [ ] Fix bugs quickly
- [ ] Plan updates
- [ ] Collect user feedback

---

## 🆘 Common Issues

### "Build failed - signing error"
→ Make sure you have Apple Developer account set up
→ Run: `eas credentials`

### "Upload failed - Invalid bundle ID"
→ Check app.json has correct bundle identifier
→ Must match Apple Developer portal

### "Rejected - Crashes on launch"
→ Test on TestFlight first
→ Check Firebase config is correct
→ Review crash logs in App Store Connect

---

## 🎉 You're Ready!

Your NannyApp is **100% ready** for mobile deployment!

**Recommended Path:**
1. ✅ Set up Firebase (HOW_TO_ENABLE_FIREBASE.md)
2. ✅ Test thoroughly on web
3. ✅ Install EAS CLI
4. ✅ Build Android APK first (test on phone)
5. ✅ Build iOS with TestFlight (test on iPhone)
6. ✅ Create Google Play listing
7. ✅ Submit to Google Play
8. ✅ Create App Store listing  
9. ✅ Submit to App Store
10. ✅ Go LIVE! 🚀

**Total time:** 1-2 weeks (including review time)

---

## 📞 Need Help?

- **Expo Docs**: https://docs.expo.dev
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **App Store Review**: https://developer.apple.com/app-store/review/guidelines/
- **Play Console Help**: https://support.google.com/googleplay/android-developer

---

**Your React Native app works on iOS, Android, AND Web from one codebase! 🎊**
