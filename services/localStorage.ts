import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Character, Filter } from '@/utils/types';

const FILTERS_KEY = 'filters';
const LAST_FETCH_KEY = 'lastFetch';

export const saveFilters = async (filters: Filter): Promise<void> => {
    try {
        await AsyncStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
    } catch (error) {
        console.error('Error saving filters:', error);
    }
};

export const getFilters = async (): Promise<Filter | null> => {
    try {
        const filtersJson = await AsyncStorage.getItem(FILTERS_KEY);
        return filtersJson ? JSON.parse(filtersJson) : null;
    } catch (error) {
        console.error('Error retrieving filters:', error);
        return null;
    }
};

export const saveLastFetchTime = async (): Promise<void> => {
    try {
        await AsyncStorage.setItem(LAST_FETCH_KEY, Date.now().toString());
    } catch (error) {
        console.error('Error saving last fetch time:', error);
    }
};

export const getLastFetchTime = async (): Promise<number | null> => {
    try {
        const time = await AsyncStorage.getItem(LAST_FETCH_KEY);
        return time ? parseInt(time, 10) : null;
    } catch (error) {
        console.error('Error retrieving last fetch time:', error);
        return null;
    }
};
