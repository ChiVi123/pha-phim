import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import categoryReducer from '~modules/category/slice';
import countryReducer from '~modules/country/slice';

const store = configureStore({
    reducer: {
        category: categoryReducer,
        country: countryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
