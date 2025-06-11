import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '@/services/api';
import { RootState } from '@/store/store';
import { charactersActions } from '@/store/characterSlice';
import type { Filter } from '@/utils/types';

const { setCharacters, setPage, setFilters } = charactersActions;

export const useCharacters = () => {
    const dispatch = useDispatch();
    const { page, filters, characters } = useSelector((state: RootState) => state.characters);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFilterChange = (newFilters: Partial<Filter>) => {
        const updatedFilters = { ...filters, ...newFilters };
        dispatch(setFilters(updatedFilters));
    };

    const loadMore = async () => {
        try {
            setLoading(true);
            setError(null);
            const newData = await fetchCharacters(page + 1, filters);
            dispatch(setCharacters([...characters, ...newData]));
            dispatch(setPage(page + 1));
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
            dispatch(setPage(0));
            dispatch(setCharacters([]));
            const newData = await fetchCharacters(1, filters);
            dispatch(setCharacters(newData));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Data loading error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, [filters]);

    return { characters, loading, error, filters, setFilters: handleFilterChange, loadMore, refresh };
};