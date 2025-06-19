import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, Image } from 'react-native';
import { cardStyles, getStatusStyle } from '@/theme/styles';
import { DetailRow } from '@/components/DetailRow';
import { useTheme } from '@/hooks/useTheme';
import React, { useEffect, useMemo } from 'react';
import type { Character } from '@/utils/types';

export const CharactersDetailsScreen = () => {
  const route = useRoute();
  const { character } = route.params as { character: Character };
  const { theme, colors } = useTheme();

  const statusStyle = useMemo(
    () => getStatusStyle(character.status, theme),
    [character.status, theme]
  );

  const navigation = useNavigation();

  const characterDetails = [
    { label: 'Status', value: character.status },
    { label: 'Species', value: character.species },
    { label: 'Type', value: character.type, showIfEmpty: false },
    { label: 'Gender', value: character.gender },
    { label: 'Origin', value: character.origin?.name },
    { label: 'Location', value: character.location?.name },
    { label: 'Episodes', value: character.episode?.length || 0 },
  ];

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

        {characterDetails.map((detail, index) => (
          <DetailRow
            key={index}
            label={detail.label}
            value={detail.value}
            showIfEmpty={detail.showIfEmpty}
          />
        ))}

        <Text style={[cardStyles.created, { color: colors.text }]}>
          Created:{' '}
          {character.created
            ? new Date(character.created).toLocaleDateString()
            : 'Unknown'}
        </Text>
      </View>
    </ScrollView>
  );
};
