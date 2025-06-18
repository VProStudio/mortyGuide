import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';

export const OfflineMessage = () => {
    const { colors } = useTheme();

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