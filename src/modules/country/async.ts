import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import http from '~core/http';
import { ICountryEntity, ListCountryResponse } from './entity';

export const fetchAllCountry = createAsyncThunk<ICountryEntity[], void, { rejectValue: string }>(
    'category::fetchAllCountry',
    async (_, { rejectWithValue }) => {
        try {
            const res = await http.get<ListCountryResponse>('quoc-gia');
            return res.data.data.items;
        } catch (error) {
            console.log('fetchAllCountry::', error);
            return axios.isAxiosError(error) ? rejectWithValue(error.message) : rejectWithValue('fetch error');
        }
    }
);
