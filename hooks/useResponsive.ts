import { Dimensions } from 'react-native';
import { useMemo } from 'react';

export const useResponsive = () => {
  const { width } = Dimensions.get('window');

  return useMemo(
    () => ({
      isNarrow: width < 350,
      screenWidth: width,
    }),
    [width],
  );
};
