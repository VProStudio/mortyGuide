import { charactersActions } from '@/store/characterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '@/services/api';
import { useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import type { Filter } from '@/utils/types';

const { setCharacters, setPage, setFilters } = charactersActions;

export const useCharacters = () => {
  const dispatch = useDispatch();
  const { page, filters, characters } = useSelector(
    (state: RootState) => state.characters
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const handleFilterChange = (newFilters: Partial<Filter>) => {
    const updatedFilters = { ...filters, ...newFilters };
    dispatch(setFilters(updatedFilters));
  };

  const loadMore = async () => {
    try {
      if (hasReachedEnd) return;

      setLoading(true);
      setError(null);
      const data = await fetchCharacters(page + 1, filters);

      if (data && data.results) {
        dispatch(setCharacters([...characters, ...data.results]));
        dispatch(setPage(page + 1));

        if (data.info && page + 1 >= data.info.pages) {
          setHasReachedEnd(true);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Data loading error');
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      setHasReachedEnd(false);
      dispatch(setPage(0));
      dispatch(setCharacters([]));
      const data = await fetchCharacters(1, filters);

      if (data && data.results) {
        dispatch(setCharacters(data.results));

        if (data.info && data.info.pages <= 1) {
          setHasReachedEnd(true);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Data loading error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [filters]);

  return {
    characters,
    loading,
    error,
    filters,
    setFilters: handleFilterChange,
    loadMore,
    refresh,
  };
};
