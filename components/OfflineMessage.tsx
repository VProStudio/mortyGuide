// Component for displaying offline status notification when no internet connection is available
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';

export const OfflineMessage = () => {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.offlineMessage }]}
    >
      <Text style={[styles.text, { color: colors.background }]}>
        No internet connection. Displaying cached data.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
