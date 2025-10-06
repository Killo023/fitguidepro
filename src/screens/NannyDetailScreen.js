import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NannyDetailScreen({ navigation, route }) {
  const { nanny } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Image source={{ uri: nanny.image }} style={styles.profileImage} />
        <View style={styles.headerInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{nanny.name}</Text>
            {nanny.verified && (
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            )}
          </View>
          <Text style={styles.location}>{nanny.location}</Text>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FCD34D" />
            <Text style={styles.rating}>{nanny.rating}</Text>
            <Text style={styles.reviews}>({nanny.reviews} reviews)</Text>
          </View>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Ionicons name="briefcase-outline" size={24} color="#6366F1" />
          <Text style={styles.statValue}>{nanny.experience} years</Text>
          <Text style={styles.statLabel}>Experience</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="location-outline" size={24} color="#6366F1" />
          <Text style={styles.statValue}>{nanny.distance} km</Text>
          <Text style={styles.statLabel}>Distance</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="people-outline" size={24} color="#6366F1" />
          <Text style={styles.statValue}>{nanny.age} years</Text>
          <Text style={styles.statLabel}>Age</Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bioText}>{nanny.bio}</Text>
      </View>

      {/* Languages */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        <View style={styles.tagsContainer}>
          {nanny.languages.map((language, index) => (
            <View key={index} style={styles.tag}>
              <Ionicons name="language-outline" size={16} color="#6366F1" />
              <Text style={styles.tagText}>{language}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Specialties */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specialties & Skills</Text>
        <View style={styles.tagsContainer}>
          {nanny.specialties.map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Availability */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Availability</Text>
        <View style={styles.availabilityContainer}>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <View
              key={day}
              style={[
                styles.dayBadge,
                nanny.availability.includes(day) && styles.dayBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  nanny.availability.includes(day) && styles.dayTextActive,
                ]}
              >
                {day.substring(0, 3)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Pricing */}
      <View style={styles.priceSection}>
        <View>
          <Text style={styles.priceLabel}>Hourly Rate</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>R{nanny.hourlyRate}</Text>
            <Text style={styles.priceUnit}>/hour</Text>
          </View>
        </View>
      </View>

      {/* Book Button */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate('Booking', { nanny })}
      >
        <Text style={styles.bookButtonText}>Book {nanny.name.split(' ')[0]}</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerCard: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  reviews: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 1,
    gap: 10,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  bioText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  tagText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '500',
  },
  specialtyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  specialtyText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  dayBadgeActive: {
    backgroundColor: '#6366F1',
  },
  dayText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  dayTextActive: {
    color: '#fff',
  },
  priceSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  priceUnit: {
    fontSize: 16,
    color: '#6B7280',
  },
  bookButton: {
    backgroundColor: '#6366F1',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
