import { getCharactersFromDB, initDatabase, saveCharactersToDB } from '@/services/database';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { OfflineMessage } from '@/components/OfflineMessage';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { CharacterCard } from '@/components/CharacterCard';
import { useCharacters } from '@/hooks/useCharacter';
import { View, FlatList, Text } from 'react-native';
import { ThemeContext } from '@/theme/ThemeContext';
import { FilterBar } from '@/components/FilterBar';
import { Loader } from '@/components/Loader';
import { Error } from '@/components/Error';
import type { Character } from '@/utils/types';

export const CharactersListScreen = () => {
    const { colors } = React.useContext(ThemeContext);
    const { characters, loading, error, filters, setFilters, loadMore, refresh } = useCharacters();
    const { isConnected } = useNetworkStatus();
    const [offlineData, setOfflineData] = useState<Character[]>([]);
    const [offlineLoading, setOfflineLoading] = useState(true);
    const [offlineError, setOfflineError] = useState<string | null>(null);
    const lastSaveTimeRef = useRef(0);
    const noDataMessage = "No data to display";


    const displayData = useMemo(() =>
        isConnected ? characters : offlineData,
        [isConnected, characters, offlineData]
    );

    const containerStyle = useMemo(() => ({
        flex: 1,
        backgroundColor: colors.background
    }), [colors.background]);

    const renderItem = useCallback(({ item }: { item: Character }) =>
        <CharacterCard character={item} />,
        []
    );

    const keyExtractor = useCallback((item: Character) =>
        item.id.toString(),
        []
    );

    const ListFooterComponent = useMemo(() =>
        (loading || (!isConnected && offlineLoading)) ? <Loader /> : null,
        [loading, isConnected, offlineLoading, displayData.length, noDataMessage]
    );

    const ListEmptyComponent = useMemo(() => {
        return !loading && !offlineLoading && displayData.length === 0 ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Text>{noDataMessage}</Text>
            </View>
        ) : null;
    }, [loading, offlineLoading, displayData.length]);

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
            <View style={containerStyle}>
                <Text>{noDataMessage}</Text>
            </View>
        );
    }

    return (
        <View style={containerStyle}>
            {!isConnected && offlineData.length > 0 && <OfflineMessage />}
            <FilterBar filters={filters} onChange={setFilters} />
            <FlatList
                data={displayData}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                onEndReached={isConnected ? loadMore : undefined}
                ListFooterComponent={ListFooterComponent}
                ListEmptyComponent={ListEmptyComponent}
            />
        </View>
    );
};
