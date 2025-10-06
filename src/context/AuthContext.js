import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { signInUser, signOutUser, getCurrentUserData } from '../services/authService';

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
    // Signup is handled directly in signup screens via signUpUser
    // This is kept for compatibility
    return { success: true };
  };

  if (loading) {
    // You can return a loading screen here
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, userType, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};