import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { CharacterCard } from '@/components/CharacterCard';
import { FilterBar } from '@/components/FilterBar';
import { Loader } from '@/components/Loader';
import { OfflineMessage } from '@/components/OfflineMessage';
import { Error } from '@/components/Error';
import { useCharacters } from '@/hooks/useCharacter';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { getCharactersFromDB } from '@/services/database';

export const CharactersListScreen = () => {
    const { characters, loading, error, filters, setFilters, loadMore, refresh } = useCharacters();
    const { isConnected } = useNetworkStatus();

    useEffect(() => {
        if (!isConnected) {
            const loadOfflineData = async () => {
                try {
                    const offlineCharacters = await getCharactersFromDB();
                } catch (err) {
                    console.error('Error loading offline data:', err);
                }
            };

            loadOfflineData();
        }
    }, [isConnected]);

    if (error) {
        return <Error message={error} onRetry={refresh} />;
    }

    return (
        <View style={{ flex: 1 }}>
            {!isConnected && <OfflineMessage />}
            <FilterBar filters={filters} onChange={setFilters} />
            <FlatList
                data={characters}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <CharacterCard character={item} />}
                onEndReached={isConnected ? loadMore : undefined}
                ListFooterComponent={loading ? <Loader /> : null}
            />
        </View>
    );
};