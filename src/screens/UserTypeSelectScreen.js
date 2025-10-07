import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UserTypeSelectScreen({ navigation, route }) {
  const { action } = route.params; // 'signup' or other actions

  const handleSelectType = (type) => {
    if (type === 'parent') {
      navigation.navigate('ParentSignup');
    } else {
      navigation.navigate('NannySignup');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#1F2937" />
      </TouchableOpacity>

      <Text style={styles.title}>Join as a Parent or Nanny?</Text>
      <Text style={styles.subtitle}>Choose your account type to get started</Text>

      <View style={styles.cardsContainer}>
        {/* Parent Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleSelectType('parent')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="home" size={48} color="#6366F1" />
          </View>
          <Text style={styles.cardTitle}>I'm a Parent</Text>
          <Text style={styles.cardDescription}>
            Find trusted nannies for your children
          </Text>
          <View style={styles.features}>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>Browse verified nannies</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>Book instantly</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>Track bookings</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Nanny Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleSelectType('nanny')}
        >
          <View style={[styles.iconContainer, styles.nannyIcon]}>
            <Ionicons name="briefcase" size={48} color="#10B981" />
          </View>
          <Text style={styles.cardTitle}>I'm a Nanny</Text>
          <Text style={styles.cardDescription}>
            Find work and earn money caring for children
          </Text>
          <View style={styles.features}>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>Set your own rates</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>Flexible schedule</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>Get paid securely</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginPrompt}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginPromptText}>
          Already have an account? <Text style={styles.loginLink}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 30,
  },
  cardsContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  nannyIcon: {
    backgroundColor: '#ECFDF5',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 20,
  },
  features: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#4B5563',
  },
  loginPrompt: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
  loginPromptText: {
    color: '#6B7280',
    fontSize: 14,
  },
  loginLink: {
    color: '#6366F1',
    fontWeight: 'bold',
  },
});
