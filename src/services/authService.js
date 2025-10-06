import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Sign up a new user
export const signUpUser = async (email, password, userData, userType) => {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, {
      displayName: userData.fullName || userData.name,
    });

    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email,
      userType: userType, // 'parent' or 'nanny'
      ...userData,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        userType: userType,
        ...userData,
      },
    };
  } catch (error) {
    console.error('Signup error:', error);
    
    // Provide user-friendly error messages
    let errorMessage = error.message;
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already registered. Please sign in instead or use a different email.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Please enter a valid email address.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters long.';
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Sign in existing user
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          ...userData,
        },
      };
    } else {
      // User exists in Auth but not in Firestore - create basic profile
      console.log('User profile not found in Firestore, creating basic profile...');
      
      const basicUserData = {
        uid: user.uid,
        email: user.email,
        userType: 'parent', // Default to parent
        fullName: user.displayName || 'User',
        createdAt: new Date().toISOString(),
      };
      
      // Try to create the profile
      try {
        await setDoc(doc(db, 'users', user.uid), basicUserData);
        console.log('Basic profile created successfully');
        
        return {
          success: true,
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            ...basicUserData,
          },
        };
      } catch (profileError) {
        console.error('Could not create profile:', profileError);
        throw new Error('User profile not found. Please sign up again.');
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    
    // Provide user-friendly error messages
    let errorMessage = 'Invalid email or password';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email. Please sign up first.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password. Please try again.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Please enter a valid email address.';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = 'This account has been disabled. Please contact support.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed login attempts. Please try again later.';
    } else if (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions')) {
      errorMessage = 'Database permissions error. Please update Firestore security rules in Firebase Console.';
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Signout error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent!',
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Get current user data
export const getCurrentUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return {
        success: true,
        data: userDoc.data(),
      };
    } else {
      return {
        success: false,
        error: 'User not found',
      };
    }
  } catch (error) {
    console.error('Get user error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};