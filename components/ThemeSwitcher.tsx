import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '@/theme/ThemeContext';
import React from 'react';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme, colors } = React.useContext(ThemeContext);

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
