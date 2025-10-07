import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import colors from './src/theme/colors';
import BackgroundImage from './src/components/BackgroundImage';

// Auth screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import UserTypeSelectScreen from './src/screens/UserTypeSelectScreen';
import ParentSignupScreen from './src/screens/ParentSignupScreen';
import NannySignupScreen from './src/screens/NannySignupScreen';

// Parent screens
import HomeScreen from './src/screens/HomeScreen';
import NannyListScreen from './src/screens/NannyListScreen';
import NannyDetailScreen from './src/screens/NannyDetailScreen';
import BookingScreen from './src/screens/BookingScreen';
import BookingsScreen from './src/screens/BookingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="UserTypeSelect" component={UserTypeSelectScreen} />
      <Stack.Screen name="ParentSignup" component={ParentSignupScreen} />
      <Stack.Screen name="NannySignup" component={NannySignupScreen} />
    </Stack.Navigator>
  );
}

// Parent Home Stack
function ParentHomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Find a Nanny' }}
      />
      <Stack.Screen 
        name="NannyList" 
        component={NannyListScreen} 
        options={{ title: 'Available Nannies' }}
      />
      <Stack.Screen 
        name="NannyDetail" 
        component={NannyDetailScreen} 
        options={{ title: 'Nanny Profile' }}
      />
      <Stack.Screen 
        name="Booking" 
        component={BookingScreen} 
        options={{ title: 'Book Nanny' }}
      />
    </Stack.Navigator>
  );
}

// Parent Main Tabs
function ParentTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey[400],
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={ParentHomeStack} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Bookings" 
        component={BookingsScreen} 
        options={{ title: 'My Bookings' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// Nanny Main Tabs (simplified for now)
function NannyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'MyJobs') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'NannyProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey[400],
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={BookingsScreen} 
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="MyJobs" 
        component={BookingsScreen} 
        options={{ title: 'My Jobs' }}
      />
      <Tab.Screen 
        name="NannyProfile" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// Main Navigation
function Navigation() {
  const { user, userType } = useAuth();

  if (!user) {
    return <AuthStack />;
  }

  if (userType === 'nanny') {
    return <NannyTabs />;
  }

  return <ParentTabs />;
}

export default function App() {
  return (
    <AuthProvider>
      <BackgroundImage variant="home">
        <StatusBar style="dark" />
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </BackgroundImage>
    </AuthProvider>
  );
}