import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ThemeContext } from '@/theme/ThemeContext';

export const Loader = () => {
    const { colors } = React.useContext(ThemeContext);
    return (
        <View style={{ padding: 10 }}>
            <ActivityIndicator color={colors.text} />
        </View>
    );
};