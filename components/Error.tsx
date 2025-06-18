import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';

type ErrorProps = {
    message: string;
    onRetry?: () => void;
    buttonText?: string;
};

export const Error = ({ message, onRetry, buttonText = "Retry" }: ErrorProps) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.message, { color: colors.text }]}>
                {message || 'An error occurred'}
            </Text>
            {onRetry && (
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.card }]}
                    onPress={onRetry}
                >
                    <Text style={{ color: colors.text }}>{buttonText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        padding: 10,
        borderRadius: 5,
    }
});
