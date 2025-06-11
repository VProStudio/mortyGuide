import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cardStyles } from '@/theme/colors';
import { ThemeContext } from '@/theme/ThemeContext';
import type { Character } from '@/utils/types';
import type { RootStackParamList } from '@/utils/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// type Props = {
//     character: Character;
// };

type DetailsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Details'
>;

export const CharacterCard = ({ character }: { character: Character }) => {
    const navigation = useNavigation<DetailsScreenNavigationProp>();
    const { colors } = React.useContext(ThemeContext);
    const handlePress = () => {
        navigation.navigate('Details', { character });
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