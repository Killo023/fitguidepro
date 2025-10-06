import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import BackgroundImage from '../components/BackgroundImage';

export default function HomeScreen({ navigation }) {
  const [searchLocation, setSearchLocation] = useState('');

  const categories = [
    { id: '1', name: 'Infant Care', icon: 'baby-outline', color: colors.categories.infant },
    { id: '2', name: 'After School', icon: 'school-outline', color: colors.categories.homework },
    { id: '3', name: 'Full Time', icon: 'time-outline', color: colors.accents.teal },
    { id: '4', name: 'Special Needs', icon: 'heart-outline', color: colors.accents.rose },
  ];

  const handleSearch = () => {
    navigation.navigate('NannyList', { location: searchLocation });
  };

  return (
    <BackgroundImage variant="home">
      <ScrollView style={styles.container}>
      {/* Hero Section */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80' }}
        style={styles.heroSection}
        imageStyle={styles.heroImageStyle}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Find Your Perfect Nanny</Text>
          <Text style={styles.heroSubtitle}>
            Trusted, verified childcare professionals in your area
          </Text>
        </View>
      </ImageBackground>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="location-outline" size={24} color={colors.primary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter your location"
            value={searchLocation}
            onChangeText={setSearchLocation}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Find Nannies</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => navigation.navigate('NannyList', { category: category.name })}
            >
              <Ionicons name={category.icon} size={32} color="#fff" />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Features */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose NannyApp?</Text>
        
        <View style={styles.featureCard}>
          <View style={[styles.featureIcon, { backgroundColor: colors.accents.emerald + '15' }]}>
            <Ionicons name="shield-checkmark" size={28} color={colors.accents.emerald} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Verified Professionals</Text>
            <Text style={styles.featureDescription}>
              All nannies are background-checked and verified
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={[styles.featureIcon, { backgroundColor: colors.accents.amber + '15' }]}>
            <Ionicons name="star" size={28} color={colors.accents.amber} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Trusted Reviews</Text>
            <Text style={styles.featureDescription}>
              Read honest reviews from other parents
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={[styles.featureIcon, { backgroundColor: colors.accents.blue + '15' }]}>
            <Ionicons name="cash-outline" size={28} color={colors.accents.blue} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Transparent Pricing</Text>
            <Text style={styles.featureDescription}>
              Clear hourly rates with no hidden fees
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <View style={[styles.statCard, { backgroundColor: colors.accents.purple + '15', borderColor: colors.accents.purple + '30' }]}>
          <Text style={[styles.statNumber, { color: colors.accents.purple }]}>1,500+</Text>
          <Text style={styles.statLabel}>Nannies</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.accents.teal + '15', borderColor: colors.accents.teal + '30' }]}>
          <Text style={[styles.statNumber, { color: colors.accents.teal }]}>10,000+</Text>
          <Text style={styles.statLabel}>Happy Families</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.accents.amber + '15', borderColor: colors.accents.amber + '30' }]}>
          <Text style={[styles.statNumber, { color: colors.accents.amber }]}>4.9★</Text>
          <Text style={styles.statLabel}>Average Rating</Text>
        </View>
      </View>
      </ScrollView>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  heroSection: {
    padding: 30,
    paddingTop: 20,
    paddingBottom: 40,
    minHeight: 180,
    justifyContent: 'center',
  },
  heroImageStyle: {
    opacity: 0.3,
  },
  heroOverlay: {
    backgroundColor: 'rgba(100, 116, 139, 0.85)',
    padding: 20,
    borderRadius: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#E0E7FF',
  },
  searchSection: {
    padding: 20,
    marginTop: -20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1F2937',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  categoryCard: {
    width: '47%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  categoryName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  featuresSection: {
    padding: 20,
    paddingTop: 10,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 30,
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
