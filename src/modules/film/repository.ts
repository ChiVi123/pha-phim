import http from '~core/http';
import { FilmResponse } from './entity';

export const getFilmBySlug = async (slug: string) => {
    const res = await http.get<FilmResponse>(`phim/${slug}`);
    return res.data;
};
