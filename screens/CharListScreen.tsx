import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Text } from 'react-native';
import { CharacterCard } from '@/components/CharacterCard';
import { FilterBar } from '@/components/FilterBar';
import { Loader } from '@/components/Loader';
import { OfflineMessage } from '@/components/OfflineMessage';
import { Error } from '@/components/Error';
import { useCharacters } from '@/hooks/useCharacter';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { getCharactersFromDB, initDatabase, saveCharactersToDB } from '@/services/database';
import type { Character } from '@/utils/types';

export const CharactersListScreen = () => {
    const { characters, loading, error, filters, setFilters, loadMore, refresh } = useCharacters();
    const { isConnected } = useNetworkStatus();
    const [offlineData, setOfflineData] = useState<Character[]>([]);
    const [offlineLoading, setOfflineLoading] = useState(true);
    const [offlineError, setOfflineError] = useState<string | null>(null);
    const lastSaveTimeRef = useRef(0);

    useEffect(() => {
        initDatabase().catch(err => console.error('Error initializing database:', err));
    }, []);

    useEffect(() => {
        if (isConnected && characters.length > 0) {
            const now = Date.now();
            if (now - lastSaveTimeRef.current > 5000) {
                lastSaveTimeRef.current = now;
                saveCharactersToDB(characters).catch(err =>
                    console.error('Error saving characters to DB:', err)
                );
            }
        }
    }, [isConnected, characters]);

    useEffect(() => {
        const loadOfflineData = async () => {
            setOfflineLoading(true);
            setOfflineError(null);
            try {
                const offlineCharacters = await getCharactersFromDB();
                setOfflineData(offlineCharacters);
            } catch (err) {
                console.error('Error loading offline data:', err);
                setOfflineError('Failed to load saved data');
            } finally {
                setOfflineLoading(false);
            }
        };

        if (!isConnected) {
            loadOfflineData();
        }
    }, [isConnected]);

    const displayData = isConnected ? characters : offlineData;
    const noDataMessage = "No data to display";

    if (error && isConnected) {
        return <Error message={error} onRetry={refresh} />;
    }

    if (!isConnected && offlineError && !offlineLoading) {
        return <Error message={offlineError} onRetry={() => setOfflineError(null)} />;
    }

    if (!isConnected && offlineData.length === 0 && !offlineLoading) {
        return (
            <Error
                message="Please check your internet connection and try again"
                onRetry={refresh}
                buttonText="Try again"
            />
        );
    }

    if (isConnected && characters.length === 0 && !loading && !error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{noDataMessage}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {!isConnected && offlineData.length > 0 && <OfflineMessage />}
            <FilterBar filters={filters} onChange={setFilters} />
            <FlatList
                data={displayData}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <CharacterCard character={item} />}
                onEndReached={isConnected ? loadMore : undefined}
                ListFooterComponent={(loading || (!isConnected && offlineLoading)) ? <Loader /> : null}
                ListEmptyComponent={
                    !loading && !offlineLoading && displayData.length === 0 ? (
                        <View style={{ padding: 20, alignItems: 'center' }}>
                            <Text>{noDataMessage}</Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};
