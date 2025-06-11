import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { ThemeContext } from '@/theme/ThemeContext';

export const SettingsScreen = () => {
    const { theme, toggleTheme, colors } = React.useContext(ThemeContext);
    const isDarkMode = theme === 'dark';

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

            <View style={styles.settingRow}>
                <Text style={[styles.settingText, { color: colors.text }]}>Dark theme</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
                />
            </View>

            <Text style={[styles.version, { color: colors.text }]}>Version: 0.0.1</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    settingText: {
        fontSize: 16,
    },
    version: {
        marginTop: 'auto',
        textAlign: 'center',
        fontSize: 12,
        padding: 16,
    }
});
