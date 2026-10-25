import { useWindowDimensions } from 'react-native';

// Screen size helpers so the app also looks right on a wide browser window.
export function useAppDimensions() {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 900;
  // product grid columns: 2 on phones, 3 on tablets, 4 on computers
  const columns = width >= 900 ? 4 : width >= 600 ? 3 : 2;
  return { width, height, isWide, columns };
}
