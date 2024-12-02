import http from '~core/http';
import { ListCategoryResponse } from './entity';

export const getAllCategory = async (signal: AbortSignal) => {
    const res = await http.get<ListCategoryResponse>('the-loai', { signal });
    return res.data;
};
