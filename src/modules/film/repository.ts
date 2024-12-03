import http from '~core/http';
import { FilmResponse, ListFilmResponse } from './entity';

export const getFilmBySlug = async (slug: string) => {
    const res = await http.get<FilmResponse>(`phim/${slug}`);
    return res.data;
};
export const searchFilmByType = async (
    signal: AbortSignal,
    params: Record<string, unknown>,
    type: FilmType = 'hot'
) => {
    const res = await http.get<ListFilmResponse>(`danh-sach/${type}`, { signal, params });
    return res.data;
};
