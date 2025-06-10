import React from 'react';
import { View, Text, Image } from 'react-native';
import { cardStyles } from '@/theme/colors';
import { ThemeContext } from '@/theme/ThemeContext';
import type { Character } from '@/utils/types';

export const CharacterCard = ({ character }: { character: Character }) => {
    const { colors } = React.useContext(ThemeContext);
    return (
        <View style={{ backgroundColor: colors.card, padding: 10 }}>
            <Text style={cardStyles.name}>{character.name}</Text>
            <Text style={cardStyles.id}>ID: {character.id}</Text>
            {/* <Text style={{ color: colors.text }}>{character.id}</Text> */}
            <Image source={{ uri: character.image }} style={{ width: 100, height: 100 }} />
            <Text style={{ color: colors.text }}>{character.status}</Text>
            <Text style={{ color: colors.text }}>{character.species}</Text>

        </View>
    );
};