import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme, colors } = useTheme();

    return (
        <TouchableOpacity style={styles.container} onPress={toggleTheme}>
            <Icon
                name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
                size={24}
                color={colors.text}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
    }
});
