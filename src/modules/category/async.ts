import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import http from '~core/http';
import { ICategoryEntity, ListCategoryResponse } from './entity';

export const fetchAllCategory = createAsyncThunk<ICategoryEntity[], void, { rejectValue: string }>(
    'category::fetchAllCategory',
    async (_, { signal, rejectWithValue }) => {
        try {
            const res = await http.get<ListCategoryResponse>('the-loai', { signal });
            return res.data.data.items;
        } catch (error) {
            console.log('fetchAllCategory::', error);
            return axios.isAxiosError(error) ? rejectWithValue(error.message) : rejectWithValue('fetch error');
        }
    }
);
