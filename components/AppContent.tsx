// App content component separated from App.tsx for better code organization and readability
import { ResponsiveProvider } from '@/components/ResponsiveContext';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@/navigation/AppNavigator';
import { FontLoader } from '@/components/FontLoader';
import { useTheme } from '@/hooks/useTheme';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export function AppContent() {
  const { theme } = useTheme();

  return (
    <ResponsiveProvider>
      <FontLoader>
        <NavigationContainer>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          <AppNavigator />
        </NavigationContainer>
      </FontLoader>
    </ResponsiveProvider>
  );
}
