import type { ExpoConfig } from 'expo/config';

const variant = process.env.APP_VARIANT ?? 'development';
const production = variant === 'production';
const staging = variant === 'staging';

export default <ExpoConfig>{
  name: production ? 'Teraz' : staging ? 'Teraz (Staging)' : 'Teraz (Dev)',
  slug: 'teraz',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  ios: {
    supportsTablet: true,
    bundleIdentifier: production ? 'com.teraz.app' : `com.teraz.app.${variant}`,
  },
  android: {
    package: production ? 'com.teraz.app' : `com.teraz.app.${variant}`,
    adaptiveIcon: {
      backgroundColor: '#FAF8F5',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
  },
  web: { bundler: 'metro', favicon: './assets/favicon.png' },
};
