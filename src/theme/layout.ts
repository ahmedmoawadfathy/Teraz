import { useWindowDimensions } from 'react-native';

export function useAppDimensions() {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 900;
  const columns = width >= 900 ? 4 : width >= 600 ? 3 : 2;
  return { width, height, isWide, columns };
}
