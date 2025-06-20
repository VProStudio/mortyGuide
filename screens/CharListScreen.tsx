import { View, FlatList, useWindowDimensions } from 'react-native';
import { EmptyDataMessage } from '@/components/EmptyDataMessage';
import { OfflineMessage } from '@/components/OfflineMessage';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { CharacterCard } from '@/components/CharacterCard';
import { useOfflineData } from '@/hooks/useOfflineData';
import { getErrorState } from '@/utils/errorHandling';
import { useCharacters } from '@/hooks/useCharacter';
import React, { useMemo, useCallback } from 'react';
import { FilterBar } from '@/components/FilterBar';
import { Loader } from '@/components/Loader';
import { useTheme } from '@/hooks/useTheme';
import { Error } from '@/components/Error';
import type { Character } from '@/utils/types';

export const CharactersListScreen = () => {
  const { colors } = useTheme();
  const { characters, loading, error, filters, setFilters, loadMore, refresh } =
    useCharacters();
  const { isConnected } = useNetworkStatus();
  const { offlineData, offlineLoading, offlineError, resetOfflineError } =
    useOfflineData(isConnected, characters);

  const { width, height } = useWindowDimensions();

  const itemHeight = useMemo(() => {
    return width > 600 ? 180 : 150;
  }, [width]);

  const optimizedParams = useMemo(() => {
    const itemsPerScreen = Math.ceil(height / itemHeight);

    return {
      initialNumToRender: itemsPerScreen + 2,
      windowSize: Math.max(5, Math.ceil(itemsPerScreen / 2)),
      maxToRenderPerBatch: Math.max(5, Math.ceil(itemsPerScreen / 3)),
    };
  }, [height, itemHeight]);

  const noDataMessage = 'No data to display';

  const displayData = useMemo(
    () => (isConnected ? characters : offlineData),
    [isConnected, characters, offlineData],
  );

  const containerStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: colors.background,
    }),
    [colors.background],
  );

  const renderItem = useCallback(
    ({ item }: { item: Character }) => <CharacterCard character={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Character) => item.id.toString(), []);

  const ListFooterComponent = useMemo(
    () => (loading || (!isConnected && offlineLoading) ? <Loader /> : null),
    [loading, isConnected, offlineLoading],
  );

  const ListEmptyComponent = useMemo(
    () =>
      !loading && !offlineLoading && displayData.length === 0 ? (
        <EmptyDataMessage message={noDataMessage} />
      ) : null,
    [loading, offlineLoading, displayData.length],
  );

  const { hasError, errorProps } = getErrorState(
    error,
    isConnected,
    offlineError,
    offlineLoading,
    offlineData,
    refresh,
    resetOfflineError,
  );

  if (hasError && errorProps) {
    return <Error {...errorProps} />;
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
        windowSize={optimizedParams.windowSize}
        initialNumToRender={optimizedParams.initialNumToRender}
        maxToRenderPerBatch={optimizedParams.maxToRenderPerBatch}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />
    </View>
  );
};
