import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { signUpUser } from '../services/authService';
import BackgroundImage from '../components/BackgroundImage';

export default function ParentSignupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      if (Platform.OS === 'web') {
        window.alert('Please fill in all required fields');
      } else {
        Alert.alert('Error', 'Please fill in all required fields');
      }
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      if (Platform.OS === 'web') {
        window.alert('Passwords do not match');
      } else {
        Alert.alert('Error', 'Passwords do not match');
      }
      return;
    }

    try {
      const userData = {
        fullName: formData.fullName,
        name: formData.fullName,
        phone: formData.phone,
      };

      const result = await signUpUser(formData.email, formData.password, userData, 'parent');
      
      if (result.success) {
        if (Platform.OS === 'web') {
          window.alert('✅ Account created successfully!');
          navigation.navigate('Login');
        } else {
          Alert.alert('Success', 'Account created successfully!', [
            { text: 'OK', onPress: () => navigation.navigate('Login') }
          ]);
        }
      } else {
        if (Platform.OS === 'web') {
          window.alert(`Signup Failed\n\n${result.error}`);
        } else {
          Alert.alert('Signup Failed', result.error);
        }
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert('Error: An error occurred during signup');
      } else {
        Alert.alert('Error', 'An error occurred during signup');
      }
      console.error(error);
    }
  };

  return (
    <BackgroundImage variant="signup">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Ionicons name="home" size={48} color="#6366F1" />
          <Text style={styles.title}>Sign Up as a Parent</Text>
          <Text style={styles.subtitle}>Find trusted care for your children</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              value={formData.fullName}
              onChangeText={(text) => setFormData({ ...formData, fullName: text })}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address *"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password *"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password *"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By signing up, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 56,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  signupButton: {
    backgroundColor: '#6366F1',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  termsText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 18,
  },
  termsLink: {
    color: '#6366F1',
    fontWeight: '600',
  },
});
