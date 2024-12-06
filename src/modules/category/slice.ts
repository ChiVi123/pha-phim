import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCategory } from './async';
import { ICategoryEntity } from './entity';

const initialState: ReduxState<ICategoryEntity[]> = {
    data: [],
    error: undefined,
    status: 'idle',
};
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: (creators) => ({
        reset: creators.reducer((state) => {
            state.data = [];
            state.error = undefined;
            state.status = 'idle';
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(fetchAllCategory.pending, (state) => {
            state.data = [];
            state.status = 'pending';
            state.error = undefined;
        });

        builder.addCase(fetchAllCategory.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.status = 'fulfilled';
            state.error = undefined;
        });

        builder.addCase(fetchAllCategory.rejected, (state, { payload }) => {
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

export const categoryActions = categorySlice.actions;
export const categorySelector = categorySlice.selectors;

export default categorySlice.reducer;
