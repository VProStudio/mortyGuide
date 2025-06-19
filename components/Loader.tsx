import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';

export const Loader = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.loaderWrap}>
      <ActivityIndicator color={colors.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderWrap: {
    padding: 10,
  },
});
