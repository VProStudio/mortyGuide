import { useResponsive } from '@/hooks/useResponsive';
import { cardStyles } from '@/theme/styles';
import { useTheme } from '@/hooks/useTheme';
import { View, Text } from 'react-native';
import React from 'react';

type DetailRowProps = {
  label: string;
  value: string | number;
  showIfEmpty?: boolean;
};

const DetailRowComponent = ({
  label,
  value,
  showIfEmpty = true,
}: DetailRowProps) => {
  const { colors } = useTheme();
  const { isNarrow } = useResponsive();

  const responsiveCard = {
    basicText: {
      fontSize: isNarrow ? 15 : 17,
    },
  };

  if (!value && !showIfEmpty) return null;

  return (
    <View style={cardStyles.row}>
      <Text
        style={[
          cardStyles.label,
          responsiveCard.basicText,
          { color: colors.text },
        ]}
      >
        {label}:
      </Text>
      <Text
        style={[
          cardStyles.value,
          responsiveCard.basicText,
          { color: colors.text },
        ]}
        numberOfLines={3}
      >
        {value || 'Unknown'}
      </Text>
    </View>
  );
};

export const DetailRow = React.memo(DetailRowComponent);
