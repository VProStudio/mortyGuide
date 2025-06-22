// Redux slice for managing characters state including data, pagination, and filters

import { createSlice } from '@reduxjs/toolkit';
import type { Character, Filter } from '@/utils/types';

type CharactersState = {
  characters: Character[];
  page: number;
  filters: Filter;
  loading: boolean;
  error: string | null;
};

const initialState: CharactersState = {
  characters: [],
  page: 1,
  filters: { status: '', species: '' },
  loading: false,
  error: null,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const charactersActions = charactersSlice.actions;
