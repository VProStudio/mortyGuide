import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Filter } from '@/utils/types';

const FILTERS_KEY = 'filters';
const LAST_FETCH_KEY = 'lastFetch';

const executeStorageOperation = async <T>(
  operation: () => Promise<T>,
  errorMessage: string,
  defaultValue: T
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    return defaultValue;
  }
};

export const saveFilters = async (filters: Filter): Promise<void> => {
  return executeStorageOperation(
    async () => {
      await AsyncStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
    },
    'Error saving filters',
    undefined
  );
};

export const getFilters = async (): Promise<Filter | null> => {
  return executeStorageOperation(
    async () => {
      const filtersJson = await AsyncStorage.getItem(FILTERS_KEY);
      return filtersJson ? JSON.parse(filtersJson) : null;
    },
    'Error retrieving filters',
    null
  );
};

export const saveLastFetchTime = async (): Promise<void> => {
  return executeStorageOperation(
    async () => {
      await AsyncStorage.setItem(LAST_FETCH_KEY, Date.now().toString());
    },
    'Error saving last fetch time',
    undefined
  );
};

export const getLastFetchTime = async (): Promise<number | null> => {
  return executeStorageOperation(
    async () => {
      const time = await AsyncStorage.getItem(LAST_FETCH_KEY);
      return time ? parseInt(time, 10) : null;
    },
    'Error retrieving last fetch time',
    null
  );
};
