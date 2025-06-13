import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '@/theme/ThemeContext';
import { cardStyles } from '@/theme/styles';
import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/utils/navigation';
import type { Character } from '@/utils/types';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Details'
>;

export const CharacterCard = ({ character }: { character: Character }) => {
    const navigation = useNavigation<DetailsScreenNavigationProp>();
    const { colors } = React.useContext(ThemeContext);

    const handlePress = () => {
        const completeCharacter: Character = {
            ...character,
            type: character.type || '',
            gender: character.gender || '',
            origin: character.origin || { name: 'Unknown', url: '' },
            location: character.location || { name: 'Unknown', url: '' },
            episode: character.episode || [],
            url: character.url || '',
            created: character.created || new Date().toISOString()
        };

        navigation.navigate('Details', { character: completeCharacter });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={{ backgroundColor: colors.card, padding: 10, marginBottom: 10, borderRadius: 8 }}>
                <Text style={{
                    fontFamily: 'CustomTitleFont',
                    fontSize: 18,
                    marginBottom: 4,
                    color: colors.text
                }}>
                    {character.name}
                </Text>
                <Image source={{ uri: character.image }} style={{ width: 100, height: 100, borderRadius: 5 }} />
                <View style={cardStyles.row}>
                    <Text style={cardStyles.label}>Status:</Text>
                    <Text style={cardStyles.textMain}>{character.status}</Text>
                </View>
                <View style={cardStyles.row}>
                    <Text style={cardStyles.label}>Species:</Text>
                    <Text style={cardStyles.textMain}>{character.species}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};