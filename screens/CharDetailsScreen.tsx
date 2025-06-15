import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, Image } from 'react-native';
import { cardStyles, getStatusStyle } from '@/theme/styles';
import { ThemeContext } from '@/theme/ThemeContext';
import { DetailRow } from '@/components/DetailRow';
import React, { useEffect, useMemo } from 'react';
import type { Character } from '@/utils/types';


export const CharactersDetailsScreen = () => {
    const route = useRoute();
    const { character } = route.params as { character: Character };
    const { theme, colors } = React.useContext(ThemeContext);
    const statusStyle = useMemo(() =>
        getStatusStyle(character.status, theme),
        [character.status, theme]
    );
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: character.name,

        });
    }, [navigation, character]);

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={[
                cardStyles.detailInfoContainer,
                {
                    backgroundColor: colors.card,
                    shadowColor: colors.text,
                }
            ]}>
                <Text style={[cardStyles.id, { color: colors.text }]}>ID: {character.id}</Text>

                <Image
                    source={{ uri: character.image }}
                    style={[{ width: '100%', height: 300, marginVertical: 10, borderRadius: 8, marginBottom: 50 },
                        statusStyle
                    ]}
                    resizeMode="cover"
                />

                <DetailRow label="Status" value={character.status} />
                <DetailRow label="Species" value={character.species} />
                <DetailRow label="Type" value={character.type} showIfEmpty={false} />
                <DetailRow label="Gender" value={character.gender} />
                <DetailRow label="Origin" value={character.origin?.name} />
                <DetailRow label="Location" value={character.location?.name} />
                <DetailRow label="Episodes" value={character.episode?.length || 0} />

                <Text style={[cardStyles.created, { color: colors.text }]}>
                    Created: {character.created ? new Date(character.created).toLocaleDateString() : 'Unknown'}
                </Text>
            </View>
        </ScrollView>
    );
}