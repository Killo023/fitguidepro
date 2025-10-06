# 🚀 Quick Start Guide - NannyApp

## Step-by-Step Setup (5 minutes)

### 1️⃣ Install Dependencies

Open your terminal in the NannyApp folder and run:

```bash
npm install
```

Wait for all packages to download (this may take 2-3 minutes).

### 2️⃣ Download Expo Go on Your Phone

**Android:**
- Open Google Play Store
- Search for "Expo Go"
- Install the app

**iOS:**
- Open App Store
- Search for "Expo Go"  
- Install the app

### 3️⃣ Start the Development Server

In your terminal, run:

```bash
npm start
```

You'll see a QR code appear in your terminal and a browser window will open.

### 4️⃣ Open the App on Your Phone

**Android:**
1. Open the Expo Go app
2. Tap "Scan QR Code"
3. Point your camera at the QR code in your terminal
4. Wait for the app to load (first time may take 30-60 seconds)

**iOS:**
1. Open your Camera app (not Expo Go)
2. Point it at the QR code
3. Tap the notification that appears
4. The app will open in Expo Go

### 5️⃣ Start Using the App! 🎉

The app is now running on your phone! Any changes you make to the code will automatically refresh on your device.

## 📱 Testing the App

Try these features:

1. **Home Screen**
   - Tap "Find Nannies" button
   - Browse by category cards

2. **Nanny List**
   - Sort by Distance, Rating, or Price
   - Tap any nanny to view details

3. **Nanny Details**
   - View full profile
   - Tap "Book [Name]" button

4. **Booking**
   - Fill in date, time, and address
   - See the total cost calculated
   - Tap "Confirm Booking"

5. **My Bookings Tab**
   - View your bookings
   - See booking status

6. **Profile Tab**
   - View user profile
   - See children information

## 🔧 Troubleshooting

### "Unable to resolve module..."
```bash
npm install
npm start -- --clear
```

### App won't load on phone
- Make sure your phone and computer are on the same WiFi network
- Try shaking your phone and tapping "Reload"

### QR code won't scan
- Use the manual connection: type the URL shown in terminal into Expo Go

### Port already in use
```bash
npm start -- --port 19001
```

## 💡 Development Tips

### Hot Reload
- Save any file and the app automatically updates
- Shake your phone to open the developer menu
- Press 'r' in terminal to reload

### Viewing Logs
- Check your terminal for console.log output
- Shake phone → "Debug Remote JS" for Chrome debugging

### Changing Code
- Edit files in `src/screens/` to modify screens
- Edit `src/data/mockData.js` to change nanny data
- Colors and styles are in each file's `StyleSheet.create()`

## 📊 Sample Data

The app comes with:
- **5 sample nannies** with different skills and rates
- **2 sample bookings** (confirmed and pending)
- **1 sample user profile** with 2 children

To add more nannies, edit: `src/data/mockData.js`

## 🎨 Customization Ideas

1. **Change the theme color**
   - Find `#6366F1` (purple) in all files
   - Replace with your color (e.g., `#10B981` for green)

2. **Add more categories**
   - Edit `HomeScreen.js`
   - Add items to the `categories` array

3. **Modify pricing**
   - Edit `hourlyRate` in `mockData.js`
   - Currency format is already set to ZAR (R)

## 🌐 Next Steps

### Connect to a Backend
1. Set up Firebase or Supabase (both have free tiers)
2. Replace mock data with API calls
3. Add authentication

### Add Payments
1. Integrate PayFast (popular in South Africa)
2. Or use Stripe/PayPal for international payments

### Publish Your App
1. Build with `expo build`
2. Submit to Google Play Store / Apple App Store
3. See: https://docs.expo.dev/distribution/introduction/

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev)
- [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

---

## 🆘 Need Help?

Common commands:

```bash
# Start the app
npm start

# Clear cache and restart
npm start -- --clear

# View on Android emulator
npm run android

# View on iOS simulator (Mac only)
npm run ios
```

**You're all set! Enjoy building your Nanny App! 🎉**
