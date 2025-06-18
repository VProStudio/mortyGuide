import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';

export const Loader = () => {
    const { colors } = useTheme();
    return (
        <View style={{ padding: 10 }}>
            <ActivityIndicator color={colors.text} />
        </View>
    );
};