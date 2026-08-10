import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from './index';

export const GlobalStyles = StyleSheet.create({

  // Screens
  screen: {
    flex:              1,
    backgroundColor:   Colors.bgDefault,
    paddingHorizontal: Spacing.screenH,
  },
  screenNoPadding: {
    flex:            1,
    backgroundColor: Colors.bgDefault,
  },
  scrollScreen: {
    flexGrow:          1,
    backgroundColor:   Colors.bgDefault,
    paddingHorizontal: Spacing.screenH,
    paddingBottom:     Spacing['4xl'],
  },

  // Cards
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius:    16,
    padding:         Spacing.base,
    borderWidth:     1,
    borderColor:     Colors.borderDefault,
  },
  cardSurface: {
    backgroundColor: Colors.bgSurface,
    borderRadius:    16,
    padding:         Spacing.base,
  },

  // Inputs
  input: {
    backgroundColor:   Colors.bgInput,
    borderRadius:      10,
    borderWidth:       1,
    borderColor:       Colors.borderDefault,
    paddingHorizontal: Spacing.base,
    paddingVertical:   Spacing.md,
    color:             Colors.textPrimary,
    fontSize:          Typography.base,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },

  // Buttons
  btnPrimary: {
    backgroundColor: Colors.primary,
    borderRadius:    12,
    paddingVertical: Spacing.md,
    alignItems:      'center',
    justifyContent:  'center',
  },
  btnOutline: {
    borderRadius:    12,
    borderWidth:     1,
    borderColor:     Colors.primary,
    paddingVertical: Spacing.md,
    alignItems:      'center',
    justifyContent:  'center',
  },

  // Text
  h1: { fontSize: Typography['4xl'], fontWeight: Typography.bold,     color: Colors.textPrimary },
  h2: { fontSize: Typography['3xl'], fontWeight: Typography.bold,     color: Colors.textPrimary },
  h3: { fontSize: Typography['2xl'], fontWeight: Typography.semibold, color: Colors.textPrimary },
  h4: { fontSize: Typography.xl,     fontWeight: Typography.semibold, color: Colors.textPrimary },
  body:   { fontSize: Typography.base, color: Colors.textPrimary },
  bodySm: { fontSize: Typography.sm,   color: Colors.textSecondary },
  caption:{ fontSize: Typography.xs,   color: Colors.textMuted },
  label:  { fontSize: Typography.sm,   fontWeight: Typography.medium, color: Colors.textSecondary, marginBottom: Spacing.xs },
  link:   { fontSize: Typography.base, fontWeight: Typography.medium, color: Colors.primaryLight },

  // Layout
  row:        { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowCenter:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  center:     { alignItems: 'center', justifyContent: 'center' },
  flex1:      { flex: 1 },

  // Divider
  divider: {
    height:          1,
    backgroundColor: Colors.borderDefault,
    marginVertical:  Spacing.base,
  },

  // Avatars
  avatarXs: { width: 24,  height: 24,  borderRadius: 12  },
  avatarSm: { width: 32,  height: 32,  borderRadius: 16  },
  avatarMd: { width: 44,  height: 44,  borderRadius: 22  },
  avatarLg: { width: 64,  height: 64,  borderRadius: 32  },
  avatarXl: { width: 88,  height: 88,  borderRadius: 44  },

  // Story ring
  storyRing: {
    borderWidth:  2,
    borderColor:  Colors.primary,
    borderRadius: 9999,
    padding:      2,
  },

  // Shadows
  shadow: {
    shadowColor:   '#7C3AED',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius:  8,
    elevation:     5,
  },
  shadowStrong: {
    shadowColor:   '#7C3AED',
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius:  16,
    elevation:     10,
  },
});