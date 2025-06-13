import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, Image } from 'react-native';
import { cardStyles } from '@/theme/styles';
import React, { useEffect } from 'react';
import type { Character } from '@/utils/types';

export const CharactersDetailsScreen = () => {
    const route = useRoute();
    const { character } = route.params as { character: Character };
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: character.name,

        });
    }, [navigation, character]);

    return (
        <ScrollView>
            <View style={cardStyles.infoContainer}>
                <Text style={cardStyles.id}>ID: {character.id}</Text>

                <Image
                    source={{ uri: character.image }}
                    style={{ width: '100%', height: 300, marginVertical: 10, borderRadius: 8 }}
                    resizeMode="cover"
                />

                <View style={cardStyles.row}>
                    <Text style={cardStyles.label}>Status:</Text>
                    <Text style={cardStyles.value}>{character.status}</Text>
                </View>

                <View style={cardStyles.row}>
                    <Text style={cardStyles.label}>Species:</Text>
                    <Text style={cardStyles.value}>{character.species}</Text>
                </View>

                {character.type ? (
                    <View style={cardStyles.row}>
                        <Text style={cardStyles.label}>Type:</Text>
                        <Text style={cardStyles.value}>{character.type}</Text>
                    </View>
                ) : null}

                <View style={cardStyles.row}>
                    <Text style={cardStyles.label}>Gender:</Text>
                    <Text style={cardStyles.value}>{character.gender || 'Unknown'}</Text>
                </View>

                <View style={cardStyles.row}>
                    <Text style={cardStyles.label}>Origin:</Text>
                    <Text style={cardStyles.value}>{character.origin?.name || 'Unknown'}</Text>
                </View>

                <View style={cardStyles.row}>
                    <Text style={cardStyles.label}>Location:</Text>
                    <Text style={cardStyles.value}>{character.location?.name || 'Unknown'}</Text>
                </View>

                <View style={cardStyles.row}>
                    <Text style={cardStyles.label}>Episodes:</Text>
                    <Text style={cardStyles.value}>{character.episode?.length || 0}</Text>
                </View>

                <Text style={cardStyles.created}>
                    Created: {character.created ? new Date(character.created).toLocaleDateString() : 'Unknown'}
                </Text>
            </View>
        </ScrollView>
    );
};