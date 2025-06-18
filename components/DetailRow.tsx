import { cardStyles } from '@/theme/styles';
import { useTheme } from '@/hooks/useTheme';
import { View, Text } from 'react-native';
import React from 'react';

type DetailRowProps = {
    label: string;
    value: string | number;
    showIfEmpty?: boolean;
};

const DetailRowComponent = ({ label, value, showIfEmpty = true }: DetailRowProps) => {
    const { colors } = useTheme();

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

export const DetailRow = React.memo(DetailRowComponent);
