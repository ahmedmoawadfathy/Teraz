// Teraz design tokens: one place for colours, spacing and radius.
// tailwind.config.js uses the same colour values for className styling.
export const colors = {
  ink: '#14213D',
  gold: '#B8893B',
  cream: '#FAF8F5',
  surface: '#FFFFFF',
  line: '#E7E2DA',
  muted: '#6B7280',
  danger: '#B42318',
  success: '#1E7A46',
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const radius = { sm: 8, md: 14, pill: 999 } as const;
