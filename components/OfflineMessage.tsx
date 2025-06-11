import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '@/theme/ThemeContext';

export const OfflineMessage = () => {
    const { colors } = React.useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: '#ff6b6b' }]}>
            <Text style={[styles.text, { color: colors.background }]}>
                No internet connection. Displaying cached data.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
});