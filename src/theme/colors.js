// NannyApp Color Theme - Enhanced Neutral Palette

export const colors = {
  // Primary Colors - Soft Slate Blue-Gray (Neutral & Calm)
  primary: '#64748B',        // Slate 500 (main brand color - neutral blue-gray)
  primaryLight: '#94A3B8',   // Slate 400 (lighter shade)
  primaryDark: '#475569',    // Slate 600 (darker shade)
  
  // Grey Tones (Extended Range)
  grey: {
    50: '#F8FAFC',    // Almost white - very light backgrounds
    100: '#F1F5F9',   // Light backgrounds
    200: '#E2E8F0',   // Borders, dividers
    300: '#CBD5E1',   // Subtle borders
    400: '#94A3B8',   // Disabled text, secondary icons
    500: '#64748B',   // Secondary text
    600: '#475569',   // Primary text
    700: '#334155',   // Headings, emphasis
    800: '#1E293B',   // Dark text, strong emphasis
    900: '#0F172A',   // Almost black - strongest emphasis
  },
  
  // Complementary Accent Colors (Subtle & Sophisticated)
  secondary: '#94A3B8',      // Lighter slate (secondary actions)
  accent: '#8B5CF6',         // Soft purple (highlights, links)
  
  // Extended Accent Palette
  accents: {
    purple: '#8B5CF6',       // Violet - premium features
    indigo: '#6366F1',       // Indigo - informational
    blue: '#3B82F6',         // Blue - trust, calm
    teal: '#14B8A6',         // Teal - fresh, modern
    emerald: '#10B981',      // Emerald - success, growth
    amber: '#F59E0B',        // Amber - attention, energy
    rose: '#F43F5E',         // Rose - warmth, care
    sky: '#0EA5E9',          // Sky - freedom, clarity
  },
  
  // Category Colors (For UI variety)
  categories: {
    infant: '#F472B6',       // Pink - baby care
    toddler: '#FB923C',      // Orange - toddler care
    preschool: '#FBBF24',    // Yellow - preschool
    homework: '#8B5CF6',     // Purple - homework help
    overnight: '#6366F1',    // Indigo - overnight care
    weekend: '#14B8A6',      // Teal - weekend care
  },
  
  // Status Colors (Enhanced)
  success: '#10B981',        // Green (success states)
  successLight: '#D1FAE5',   // Light green background
  error: '#EF4444',          // Red (errors)
  errorLight: '#FEE2E2',     // Light red background
  warning: '#F59E0B',        // Amber (warnings)
  warningLight: '#FEF3C7',   // Light amber background
  info: '#3B82F6',           // Blue (info)
  infoLight: '#DBEAFE',      // Light blue background
  
  // Background Colors (Extended)
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  backgroundDark: '#F1F5F9',
  backgroundCard: '#FFFFFF',
  backgroundOverlay: 'rgba(15, 23, 42, 0.75)',
  
  // Text Colors (Complete Range)
  text: '#1E293B',           // Primary text
  textSecondary: '#64748B',  // Secondary text
  textLight: '#94A3B8',      // Light text, captions
  textMuted: '#CBD5E1',      // Very light text
  textWhite: '#FFFFFF',      // White text
  textInverse: '#F8FAFC',    // Text on dark backgrounds
  
  // Slate Theme Variations
  slate: {
    light: '#F8FAFC',        // Very light slate background
    medium: '#94A3B8',       // Medium slate
    dark: '#334155',         // Deep slate
  },
  
  // Premium/Special Colors
  premium: {
    gold: '#F59E0B',         // Gold - premium features
    silver: '#9CA3AF',       // Silver - standard features
    bronze: '#D97706',       // Bronze - basic features
  },
  
  // UI Elements (Enhanced)
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderDark: '#CBD5E1',
  divider: '#CBD5E1',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  ripple: 'rgba(100, 116, 139, 0.1)',
  
  // Interactive States
  hover: '#F8FAFC',          // Hover background
  pressed: '#F1F5F9',        // Pressed state
  focus: '#6366F1',          // Focus ring color
  disabled: '#CBD5E1',       // Disabled elements
  
  // Gradients (for premium features)
  gradients: {
    primary: ['#64748B', '#475569'],
    accent: ['#8B5CF6', '#6366F1'],
    sunset: ['#F59E0B', '#F43F5E'],
    ocean: ['#0EA5E9', '#14B8A6'],
    forest: ['#10B981', '#14B8A6'],
  },
  
  // Special
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export default colors;
