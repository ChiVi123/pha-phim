import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import HydrateFallback from '~components/hydrate-fallback';
import { ListFilmResponse, searchFilmByType } from '~modules/film';

type FilmTypeObject = Record<FilmType, Omit<ListFilmResponse['data'], 'breadCrumb' | 'params' | 'seoOnPage'>>;

const filmTypes: FilmType[] = ['hot', 'phim-le', 'hoat-hinh', 'phim-bo'];
const homeRoute: RouteObject = {
    path: '/',
    Component: lazy(() => import('./page')),
    HydrateFallback: HydrateFallback,
    loader: async () => {
        const promise = [];

        for (const type of filmTypes) {
            promise.push(searchFilmByType(undefined, { page: 1 }, type));
        }

        const result = await Promise.all(promise);
        const listFilmObject: FilmTypeObject = result.reduce((prev, current) => {
            prev[current.data.type_list] = {
                APP_DOMAIN_CDN_IMAGE: current.data.APP_DOMAIN_CDN_IMAGE,
                items: current.data.items,
                titlePage: current.data.titlePage,
                type_list: current.data.type_list,
            };
            return prev;
        }, {} as FilmTypeObject);

        return { listFilmObject, filmHotSlides: listFilmObject['hot'].items.slice(0, 5) };
    },
};
export default homeRoute;
