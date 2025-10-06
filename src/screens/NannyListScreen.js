import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { nannies } from '../data/mockData';

export default function NannyListScreen({ navigation, route }) {
  const [sortBy, setSortBy] = useState('distance');

  const sortedNannies = [...nannies].sort((a, b) => {
    if (sortBy === 'distance') return a.distance - b.distance;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
    if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
    return 0;
  });

  const renderNannyCard = ({ item }) => (
    <TouchableOpacity
      style={styles.nannyCard}
      onPress={() => navigation.navigate('NannyDetail', { nanny: item })}
    >
      <Image source={{ uri: item.image }} style={styles.nannyImage} />
      <View style={styles.nannyInfo}>
        <View style={styles.nannyHeader}>
          <Text style={styles.nannyName}>{item.name}</Text>
          {item.verified && (
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
          )}
        </View>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FCD34D" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews} reviews)</Text>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text style={styles.detailText}>{item.distance} km away</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="briefcase-outline" size={14} color="#6B7280" />
            <Text style={styles.detailText}>{item.experience} years exp</Text>
          </View>
        </View>

        <View style={styles.specialtiesContainer}>
          {item.specialties.slice(0, 2).map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>From</Text>
          <Text style={styles.price}>R{item.hourlyRate}</Text>
          <Text style={styles.priceUnit}>/hour</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <Text style={styles.filterLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.filterButton, sortBy === 'distance' && styles.filterButtonActive]}
          onPress={() => setSortBy('distance')}
        >
          <Text style={[styles.filterButtonText, sortBy === 'distance' && styles.filterButtonTextActive]}>
            Distance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, sortBy === 'rating' && styles.filterButtonActive]}
          onPress={() => setSortBy('rating')}
        >
          <Text style={[styles.filterButtonText, sortBy === 'rating' && styles.filterButtonTextActive]}>
            Rating
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, sortBy === 'price-low' && styles.filterButtonActive]}
          onPress={() => setSortBy('price-low')}
        >
          <Text style={[styles.filterButtonText, sortBy === 'price-low' && styles.filterButtonTextActive]}>
            Price ↑
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nannies List */}
      <FlatList
        data={sortedNannies}
        renderItem={renderNannyCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 10,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterButtonActive: {
    backgroundColor: '#6366F1',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#6B7280',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    padding: 15,
  },
  nannyCard: {
    flexDirection: 'row',
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
  nannyImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 15,
  },
  nannyInfo: {
    flex: 1,
  },
  nannyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 6,
  },
  nannyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  reviews: {
    fontSize: 12,
    color: '#6B7280',
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  specialtyTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  specialtyText: {
    fontSize: 11,
    color: '#6366F1',
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  priceLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  priceUnit: {
    fontSize: 12,
    color: '#6B7280',
  },
});
