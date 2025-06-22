// Character details screen displaying full information about selected character
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, Image } from 'react-native';
import { cardStyles, getStatusStyle } from '@/theme/styles';
import { useResponsive } from '@/components/ResponsiveContext';
import { DetailRow } from '@/components/DetailRow';
import React, { useEffect, useMemo } from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { Character } from '@/utils/types';

export const CharactersDetailsScreen = () => {
  const route = useRoute();
  const { character } = route.params as { character: Character };
  const { theme, colors } = useTheme();
  const { layout, fonts } = useResponsive();

  // Memoized status-based styling for character image border and shadow
  const statusStyle = useMemo(
    () => getStatusStyle(character.status, theme),
    [character.status, theme],
  );

  const responsiveDetails = {
    container: {
      flexDirection: layout.row as 'column' | 'row',
    },
    detailsContainer: {
      paddingTop: layout.rowMarginTop,
    },
    systemFontSize: {
      fontSize: fonts.system,
    },
  };

  // Configuration array for character details to be displayed as rows
  const characterDetails = [
    { label: 'Status', value: character.status },
    { label: 'Species', value: character.species },
    { label: 'Type', value: character.type, showIfEmpty: false },
    { label: 'Gender', value: character.gender },
    { label: 'Origin', value: character.origin?.name },
    { label: 'Location', value: character.location?.name },
    { label: 'Episodes', value: character.episode?.length || 0 },
  ];

  const navigation = useNavigation();

  // Dynamically set screen title to character name
  useEffect(() => {
    navigation.setOptions({
      title: character.name,
    });
  }, [navigation, character]);

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View
        style={[
          cardStyles.detailInfoContainer,
          responsiveDetails.container,
          {
            backgroundColor: colors.card,
            shadowColor: colors.text,
          },
        ]}
      >
        <Image
          source={{ uri: character.image }}
          style={[cardStyles.imageDetails, statusStyle]}
          resizeMode="cover"
        />
        <View
          style={[cardStyles.detailsColumn, responsiveDetails.detailsContainer]}
        >
          {characterDetails.map((detail, index) => (
            <DetailRow
              key={index}
              label={detail.label}
              value={detail.value}
              showIfEmpty={detail.showIfEmpty}
            />
          ))}
        </View>
        <Text
          style={[
            cardStyles.created,
            responsiveDetails.systemFontSize,
            { color: colors.text },
          ]}
        >
          Created:{' '}
          {character.created
            ? new Date(character.created).toLocaleDateString()
            : 'Unknown'}
        </Text>
      </View>
    </ScrollView>
  );
};
