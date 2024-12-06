import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCountry } from './async';
import { ICountryEntity } from './entity';

const initialState: ReduxState<ICountryEntity[]> = {
    data: [],
    error: undefined,
    status: 'idle',
};
const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: (creators) => ({
        reset: creators.reducer((state) => {
            state.data = [];
            state.error = undefined;
            state.status = 'idle';
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(fetchAllCountry.pending, (state) => {
            state.data = [];
            state.status = 'pending';
            state.error = undefined;
        });

        builder.addCase(fetchAllCountry.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.status = 'fulfilled';
            state.error = undefined;
        });

        builder.addCase(fetchAllCountry.rejected, (state, { payload }) => {
            state.data = [];
            state.status = 'pending';
            state.error = payload;
        });
    },
    selectors: {
        data: (state) => state.data,
        value: (state) => state,
    },
});

export const countryActions = countrySlice.actions;
export const countrySelector = countrySlice.selectors;

export default countrySlice.reducer;
