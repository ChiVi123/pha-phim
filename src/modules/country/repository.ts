import http from '~core/http';
import { ListCountryResponse } from './entity';

export const getAllCountry = async (signal: AbortSignal) => {
    const res = await http.get<ListCountryResponse>('quoc-gia', { signal });
    return res.data;
};
