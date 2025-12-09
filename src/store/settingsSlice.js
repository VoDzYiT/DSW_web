import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('weatherAppSettings');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const initialState = loadState() || {
    unit: 'metric', // metric -> Celsius, imperial -> Fahrenheit
    favorites: [],
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        // Change units
        toggleUnit: (state, action) => {
            state.unit = action.payload;

            localStorage.setItem('weatherAppSettings', JSON.stringify(state));
        },

        toggleFavorite: (state, action) => {
            const city = action.payload;
            if (state.favorites.includes(city)) {
                state.favorites = state.favorites.filter((c) => c !== city);
            } else {
                state.favorites.push(city);
            }

            localStorage.setItem('weatherAppSettings', JSON.stringify(state));
        },
    },
});

export const { toggleUnit, toggleFavorite } = settingsSlice.actions;
export default settingsSlice.reducer;