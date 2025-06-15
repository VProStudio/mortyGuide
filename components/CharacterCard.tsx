import { View, Text, Image, TouchableOpacity } from 'react-native';
import { cardStyles, getStatusStyle } from '@/theme/styles';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '@/theme/ThemeContext';
import { DetailRow } from '@/components/DetailRow';
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
    const { theme, colors } = React.useContext(ThemeContext);
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
            created: character.created || new Date().toISOString()
        };

        navigation.navigate('Details', { character: completeCharacter });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[
                cardStyles.cardInfoContainer,
                {
                    backgroundColor: colors.card,
                    shadowColor: colors.text,
                }

            ]}>
                <Image source={{ uri: character.image }} style={[
                    cardStyles.imageMain,
                    statusStyle
                ]}
                />
                <View style={cardStyles.column}>
                    <Text style={{
                        fontFamily: 'CustomTitleFont',
                        fontSize: 24,
                        marginBottom: 16,
                        color: colors.text
                    }}>
                        {character.name}
                    </Text>
                    <DetailRow label="Status" value={character.status} />
                    <DetailRow label="Species" value={character.species} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

