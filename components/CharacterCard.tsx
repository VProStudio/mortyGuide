import { View, Text, Image, TouchableOpacity } from 'react-native';
import { cardStyles, getStatusStyle } from '@/theme/styles';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '@/components/ResponsiveContext';
import { DetailRow } from '@/components/DetailRow';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/utils/navigation';
import type { Character } from '@/utils/types';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

const CharacterCardComponent = ({ character }: { character: Character }) => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const { theme, colors } = useTheme();
  const { fonts, layout } = useResponsive();

  const statusStyle = getStatusStyle(character.status, theme);
  const handlePress = () => {
    const completeCharacter: Character = {
      ...character,
      type: character.type || '',
      gender: character.gender || '',
      origin: character.origin || { name: 'Unknown', url: '' },
      location: character.location || { name: 'Unknown', url: '' },
      episode: character.episode || [],
      url: character.url || '',
      created: character.created || new Date().toISOString(),
    };

    navigation.navigate('Details', { character: completeCharacter });
  };

  const cardDetails = [
    { label: 'Status', value: character.status },
    { label: 'Species', value: character.species },
  ];

  const responsiveCard = {
    charName: {
      fontSize: fonts.name,
      marginLeft: layout.nameMarginLeft,
      alignSelf: layout.nameAlign as 'center' | 'flex-start',
    },
    image: {
      height: layout.imageHeight,
      width: layout.imageWidth,
    },
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          cardStyles.cardInfoContainer,
          {
            backgroundColor: colors.card,
            shadowColor: colors.text,
          },
        ]}
      >
        <Image
          source={{ uri: character.image }}
          style={[cardStyles.imageMain, responsiveCard.image, statusStyle]}
        />
        <View style={cardStyles.column}>
          <Text
            style={[cardStyles.charName, responsiveCard.charName, { color: colors.text }]}
            numberOfLines={3}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.7}
          >
            {character.name}
          </Text>
          {cardDetails.map((detail, index) => (
            <DetailRow key={index} label={detail.label} value={detail.value} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CharacterCard = React.memo(CharacterCardComponent);
