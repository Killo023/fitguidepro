# NannyApp - Uber for Nannies 🍼

A beautiful React Native mobile app for hiring nannies in South Africa, built with Expo. Book trusted, verified childcare professionals with transparent pricing in South African Rand (ZAR).

![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-~54.0-000020?logo=expo)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🏠 **Beautiful Home Screen** - Discover nannies by category or location
- 👶 **Verified Nannies** - Browse profiles with ratings, reviews, and specialties
- 📅 **Easy Booking** - Schedule nanny services with date, time, and location
- 💰 **Transparent Pricing** - Clear hourly rates in South African Rand (ZAR)
- 📊 **Booking Management** - Track all your appointments in one place
- 👤 **User Profile** - Manage your children's info and contact details
- ⭐ **Ratings & Reviews** - Make informed decisions based on parent feedback
- 🗺️ **Location-Based** - Find nannies near you with distance tracking

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

1. **Clone the repository** (or navigate to your project folder)
   ```bash
   cd NannyApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the Expo development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Open the Expo Go app on your phone
   - Scan the QR code displayed in your terminal or browser
   - The app will load on your device!

### Alternative Commands

- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator (Mac only)
- `npm run web` - Run in web browser

## 📱 App Structure

```
NannyApp/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js          # Main landing page
│   │   ├── NannyListScreen.js     # Browse available nannies
│   │   ├── NannyDetailScreen.js   # Detailed nanny profile
│   │   ├── BookingScreen.js       # Book a nanny service
│   │   ├── BookingsScreen.js      # View all bookings
│   │   └── ProfileScreen.js       # User profile & settings
│   └── data/
│       └── mockData.js            # Sample nannies and bookings data
├── App.js                         # Main app navigation
├── app.json                       # Expo configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🎨 Key Screens

### 1. Home Screen
- Hero section with call-to-action
- Search by location
- Browse by category (Infant Care, After School, Full Time, Special Needs)
- Feature highlights and statistics

### 2. Nanny List
- Filterable list of available nannies
- Sort by distance, rating, or price
- Quick view of ratings, specialties, and rates

### 3. Nanny Details
- Full profile with bio, experience, and languages
- Specialties and certifications
- Availability calendar
- Pricing information

### 4. Booking
- Date and time selection
- Address input
- Special instructions
- Booking summary with total cost calculation

### 5. My Bookings
- List of all bookings (confirmed, pending, completed)
- Booking details and status
- Quick actions

### 6. Profile
- User information
- Children details
- Emergency contacts
- Settings and preferences

## 💰 Pricing

All prices are displayed in **South African Rand (ZAR)**. Sample nannies have hourly rates ranging from:
- **R70 - R95 per hour**

Rates vary based on:
- Experience level
- Specializations (CPR certified, special needs, etc.)
- Languages spoken
- Certifications

## 🔧 Customization

### Adding More Nannies

Edit `src/data/mockData.js` and add new entries to the `nannies` array:

```javascript
{
  id: '6',
  name: 'Your Nanny Name',
  age: 30,
  experience: 5,
  rating: 4.8,
  reviews: 95,
  hourlyRate: 80,
  // ... more fields
}
```

### Changing Colors

The app uses a purple theme (`#6366F1`). To change the primary color, search and replace in all screen files.

### Adding Real Backend

To connect to a real backend:
1. Replace mock data imports with API calls
2. Add authentication (Firebase, Auth0, etc.)
3. Implement payment processing (Stripe, PayPal, PayFast for SA)
4. Add real-time location services

## 📦 Free Resources Used

- **Expo** - Free React Native framework
- **React Navigation** - Free navigation library
- **Expo Icons** - Free icon library
- **Avatar Images** - Pravatar (free random avatars)
- **No paid services required!** ✅

## 🌍 South African Features

- Pricing in **South African Rand (ZAR)**
- Sample locations in Johannesburg and Pretoria
- South African names and cultural diversity
- Languages: English, Zulu, Afrikaans, Sotho, Ndebele, Tswana, Xhosa

## 🛠️ Technologies

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation & routing
- **Expo Vector Icons** - Icon library
- **Expo Location** - Geolocation services

## 📝 Future Enhancements

- [ ] Real-time chat with nannies
- [ ] Push notifications
- [ ] In-app payments (PayFast integration)
- [ ] Background checks verification
- [ ] Video introduction from nannies
- [ ] Calendar integration
- [ ] Favorite nannies
- [ ] Multi-language support
- [ ] Dark mode

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 📞 Support

For issues or questions:
- Check the Expo documentation: https://docs.expo.dev
- React Native docs: https://reactnative.dev

---

**Made with ❤️ for South African families**

🚀 Happy coding! Start the app with `npm start` and scan the QR code with Expo Go!
