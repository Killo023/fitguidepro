import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BookingScreen({ navigation, route }) {
  const { nanny } = route.params;
  
  const [bookingDate, setBookingDate] = useState('2025-10-15');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [address, setAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const calculateHours = () => {
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
    return end - start;
  };

  const calculateTotal = () => {
    return calculateHours() * nanny.hourlyRate;
  };

  const handleBooking = () => {
    if (!address) {
      Alert.alert('Missing Information', 'Please enter your address');
      return;
    }

    Alert.alert(
      'Booking Confirmed! 🎉',
      `Your booking with ${nanny.name} has been confirmed for ${bookingDate} from ${startTime} to ${endTime}.\n\nTotal: R${calculateTotal()}`,
      [
        {
          text: 'View Bookings',
          onPress: () => navigation.navigate('Bookings'),
        },
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Nanny Info */}
      <View style={styles.nannyCard}>
        <Text style={styles.nannyName}>{nanny.name}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="#FCD34D" />
          <Text style={styles.rating}>{nanny.rating}</Text>
          <Text style={styles.rate}>• R{nanny.hourlyRate}/hour</Text>
        </View>
      </View>

      {/* Date & Time */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date & Time</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="calendar-outline" size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              value={bookingDate}
              onChangeText={setBookingDate}
              placeholder="YYYY-MM-DD"
            />
          </View>
        </View>

        <View style={styles.timeRow}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Start Time</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="time-outline" size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                value={startTime}
                onChangeText={setStartTime}
                placeholder="HH:MM"
              />
            </View>
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>End Time</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="time-outline" size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                value={endTime}
                onChangeText={setEndTime}
                placeholder="HH:MM"
              />
            </View>
          </View>
        </View>
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#6B7280" />
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
              multiline
            />
          </View>
        </View>
      </View>

      {/* Special Instructions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Instructions (Optional)</Text>
        
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            placeholder="Any special requirements or notes for the nanny..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Booking Summary</Text>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Duration</Text>
          <Text style={styles.summaryValue}>{calculateHours()} hours</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Hourly Rate</Text>
          <Text style={styles.summaryValue}>R{nanny.hourlyRate}</Text>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R{calculateTotal()}</Text>
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleBooking}>
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        <Ionicons name="checkmark-circle" size={24} color="#fff" />
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
  nannyCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  nannyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  rate: {
    fontSize: 14,
    color: '#6B7280',
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
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 15,
  },
  textAreaContainer: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
  },
  textArea: {
    fontSize: 16,
    color: '#1F2937',
    minHeight: 100,
  },
  summarySection: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  confirmButton: {
    backgroundColor: '#10B981',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
