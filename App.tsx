import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@/navigation/AppNavigator';
import { FontLoader } from '@/components/FontLoader';
import { ThemeProvider, ThemeContext } from '@/theme/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

function AppContent() {
  const { theme } = React.useContext(ThemeContext);

  return (
    <FontLoader>
      <NavigationContainer>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <AppNavigator />
      </NavigationContainer>
    </FontLoader>
  );
}

