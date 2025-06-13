import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { colors } from '@/theme/styles';

type Theme = 'light' | 'dark';

export const ThemeContext = createContext({
    theme: 'light' as Theme,
    toggleTheme: () => { },
    colors: colors.light,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme as Theme);
            } else {
                const systemTheme = Appearance.getColorScheme() || 'light';
                setTheme(systemTheme === 'dark' ? 'dark' : 'light');
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        await AsyncStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    const currentColors = theme === 'light' ? colors.light : colors.dark;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors: currentColors }}>
            {children}
        </ThemeContext.Provider>
    );
};