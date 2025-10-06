import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';

const { width, height } = Dimensions.get('window');

export default function BackgroundPattern({ children, variant = 'default' }) {
  const getGradientColors = () => {
    switch (variant) {
      case 'welcome':
        return [colors.slate.light, colors.white, colors.grey[50]];
      case 'home':
        return [colors.white, colors.grey[50], colors.white];
      case 'auth':
        return [colors.grey[50], colors.white, colors.grey[50]];
      default:
        return [colors.white, colors.grey[50], colors.white];
    }
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={getGradientColors()}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Decorative Circles */}
      <View style={[styles.circle, styles.circle1, { backgroundColor: colors.accents.purple + '08' }]} />
      <View style={[styles.circle, styles.circle2, { backgroundColor: colors.accents.teal + '08' }]} />
      <View style={[styles.circle, styles.circle3, { backgroundColor: colors.accents.rose + '08' }]} />
      <View style={[styles.circle, styles.circle4, { backgroundColor: colors.accents.amber + '08' }]} />
      
      {/* Floating Shapes */}
      <View style={[styles.shape, styles.shape1, { backgroundColor: colors.accents.blue + '05' }]} />
      <View style={[styles.shape, styles.shape2, { backgroundColor: colors.accents.emerald + '05' }]} />
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    width: width * 0.8,
    height: width * 0.8,
    top: -width * 0.4,
    right: -width * 0.3,
  },
  circle2: {
    width: width * 0.6,
    height: width * 0.6,
    bottom: -width * 0.2,
    left: -width * 0.2,
  },
  circle3: {
    width: width * 0.4,
    height: width * 0.4,
    top: height * 0.3,
    left: -width * 0.1,
  },
  circle4: {
    width: width * 0.5,
    height: width * 0.5,
    bottom: height * 0.2,
    right: -width * 0.15,
  },
  shape: {
    position: 'absolute',
    borderRadius: 20,
    transform: [{ rotate: '45deg' }],
  },
  shape1: {
    width: 120,
    height: 120,
    top: height * 0.15,
    right: width * 0.1,
  },
  shape2: {
    width: 80,
    height: 80,
    bottom: height * 0.4,
    left: width * 0.15,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

