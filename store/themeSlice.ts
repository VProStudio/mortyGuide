import { createSlice } from '@reduxjs/toolkit';

type ThemeState = {
    mode: 'light' | 'dark';
};

const initialState: ThemeState = {
    mode: 'light',
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload;
        },
    },
});