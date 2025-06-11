import { configureStore } from '@reduxjs/toolkit';
import { charactersSlice } from '@/store/characterSlice';
import { themeSlice } from '@/store/themeSlice';

export const store = configureStore({
    reducer: {
        characters: charactersSlice.reducer,
        theme: themeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;