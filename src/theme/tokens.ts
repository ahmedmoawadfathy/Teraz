// Teraz design tokens: one place for colours, fonts, spacing and radius.
// tailwind.config.js uses the same values for className styling.
export const colors = {
  ink: '#0E1424', // deep navy, main dark surface
  navy: '#1A2340', // raised dark surface
  gold: '#C9963F', // brand gold for text/buttons on light backgrounds
  goldLight: '#F2C46D', // logo gold, for accents on dark backgrounds
  cream: '#F7F3EC', // app background
  sand: '#EFE8DC', // soft panels
  surface: '#FFFFFF',
  line: '#E6DED0',
  muted: '#7A7F8C',
  danger: '#C0392B',
  success: '#2E7D4F',
} as const;

export const fonts = {
  display: 'PlayfairDisplay_700Bold',
  displaySemi: 'PlayfairDisplay_600SemiBold',
  displayRegular: 'PlayfairDisplay_400Regular',
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const radius = { sm: 8, md: 14, lg: 24, pill: 999 } as const;
