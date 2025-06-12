import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cardStyles } from '@/theme/colors';
import { ThemeContext } from '@/theme/ThemeContext';
import type { Character } from '@/utils/types';
import type { RootStackParamList } from '@/utils/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
                <Text style={cardStyles.name}>{character.name}</Text>
                <Image source={{ uri: character.image }} style={{ width: 100, height: 100, borderRadius: 5 }} />
                <View style={cardStyles.row}>
                    <Text style={cardStyles.label}>Status:</Text>
                    <Text style={{ color: colors.text }}>{character.status}</Text>
                </View>
                <View style={cardStyles.row}>
                    <Text style={cardStyles.label}>Species:</Text>
                    <Text style={{ color: colors.text }}>{character.species}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};