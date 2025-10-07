import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';

export default function BackgroundImage({ children, imageUrl, variant = 'default' }) {
  const getOverlayGradient = () => {
    switch (variant) {
      case 'welcome':
        return ['rgba(248, 250, 252, 0.9)', 'rgba(255, 255, 255, 0.85)', 'rgba(248, 250, 252, 0.9)'];
      case 'home':
        return ['rgba(255, 255, 255, 0.85)', 'rgba(249, 250, 251, 0.8)', 'rgba(255, 255, 255, 0.85)'];
      case 'auth':
        return ['rgba(249, 250, 251, 0.9)', 'rgba(255, 255, 255, 0.85)', 'rgba(249, 250, 251, 0.9)'];
      case 'signup':
        return ['rgba(255, 255, 255, 0.92)', 'rgba(248, 250, 252, 0.88)', 'rgba(255, 255, 255, 0.92)'];
      case 'select':
        return ['rgba(255, 255, 255, 0.88)', 'rgba(241, 245, 249, 0.85)', 'rgba(255, 255, 255, 0.88)'];
      default:
        return ['rgba(255, 255, 255, 0.9)', 'rgba(248, 250, 252, 0.85)', 'rgba(255, 255, 255, 0.9)'];
    }
  };

  const defaultImages = {
    welcome: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?w=1200&q=80',
    home: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80',
    auth: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1200&q=80',
    signup: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80',
    select: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80',
  };

  const backgroundImage = imageUrl || defaultImages[variant] || defaultImages.welcome;

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Gradient Overlay */}
      <LinearGradient
        colors={getOverlayGradient()}
        style={styles.overlay}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

