import React from 'react';
import { View, Text } from 'react-native';
import { cardStyles } from '@/theme/styles';
import { ThemeContext } from '@/theme/ThemeContext';

type DetailRowProps = {
    label: string;
    value: string | number;
    showIfEmpty?: boolean;
};

export const DetailRow = ({ label, value, showIfEmpty = true }: DetailRowProps) => {
    const { colors } = React.useContext(ThemeContext);

    if (!value && !showIfEmpty) return null;

    return (
        <View style={cardStyles.row}>
            <Text style={[cardStyles.label, { color: colors.text }]}>
                {label}:
            </Text>
            <Text style={[cardStyles.value, { color: colors.text }]}>
                {value || 'Unknown'}
            </Text>
        </View>
    );
};
