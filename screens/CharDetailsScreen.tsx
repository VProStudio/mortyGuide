import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import type { Character } from '@/utils/types';
import { cardStyles } from '@/theme/colors';


export const CharactersDetailsScreen = ({ character }: { character: Character }) => {
    return (
        <View style={cardStyles.infoContainer}>
            <Text style={cardStyles.name}>{character.name}</Text>
            <Text style={cardStyles.id}>ID: {character.id}</Text>

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
                <Text style={cardStyles.value}>{character.gender}</Text>
            </View>

            <View style={cardStyles.row}>
                <Text style={cardStyles.label}>Origin:</Text>
                <Text style={cardStyles.value}>{character.origin.name}</Text>
            </View>

            <View style={cardStyles.row}>
                <Text style={cardStyles.label}>Location:</Text>
                <Text style={cardStyles.value}>{character.location.name}</Text>
            </View>

            <Text style={cardStyles.label}>Episodes:</Text>
            <Text style={cardStyles.value}>{character.episode.length}</Text>

            <Text style={cardStyles.created}>Created: {new Date(character.created).toLocaleDateString()}</Text>
        </View>
    );
};