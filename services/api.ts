// API service for fetching character data from Rick and Morty API with pagination and filtering
import { API_URL } from '@/utils/constants';
import type { Filter } from '@/utils/types';

export const fetchCharacters = async (
  page = 1,
  filters: Filter = { status: '', species: '' },
) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      ...(filters.status && { status: filters.status }),
      ...(filters.species && { species: filters.species }),
    });

    // Example: GET https://rickandmortyapi.com/api/character?page=1&status=alive&species=human
    const response = await fetch(`${API_URL}/character?${params}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
