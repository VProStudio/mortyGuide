import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@/navigation/AppNavigator';
import { FontLoader } from '@/components/FontLoader';
import { useTheme } from '@/hooks/useTheme';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export function AppContent() {
    const { theme } = useTheme();

    return (
        <FontLoader>
            <NavigationContainer>
                <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
                <AppNavigator />
            </NavigationContainer>
        </FontLoader>
    );
}