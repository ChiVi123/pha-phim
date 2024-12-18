import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import HydrateFallback from '~components/hydrate-fallback';
import { getFilmBySlug } from '~modules/film';

const watchRoute: RouteObject = {
    path: '/watch/:slug',
    Component: lazy(() => import('./page')),
    HydrateFallback: HydrateFallback,
    loader: async ({ params: { slug } }) => {
        return await getFilmBySlug(slug || '');
    },
};
export default watchRoute;
