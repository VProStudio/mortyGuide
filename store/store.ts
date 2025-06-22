// Redux store configuration with characters slice
import { charactersSlice } from '@/store/characterSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    characters: charactersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
