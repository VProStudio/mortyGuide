// Font loader wrapper component that ensures custom fonts are loaded before rendering children
import { useFonts } from 'expo-font';
import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

type FontLoaderProps = {
  children: ReactNode;
};

export const FontLoader = ({ children }: FontLoaderProps) => {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    CustomTitleFont: require('@/resources/fonts/titleFont/FredokaOne-Regular.ttf'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    CustomFont: require('@/resources/fonts/textFont/Comic Sans MS.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <View style={styles.fontWrap}>{children}</View>;
};

const styles = StyleSheet.create({
  fontWrap: {
    flex: 1,
  },
});
