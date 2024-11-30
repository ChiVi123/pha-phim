import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { HydrateFallback } from '~components';
import { getFilmBySlug } from '~modules/film';

const detailRoute: RouteObject = {
    path: '/:slug',
    Component: lazy(() => import('./page')),
    HydrateFallback: HydrateFallback,
    loader: async ({ params: { slug } }) => {
        return await getFilmBySlug(slug || '');
    },
};
export default detailRoute;
