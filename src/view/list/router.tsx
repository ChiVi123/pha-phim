import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const listRoute: RouteObject = {
    path: '/:type/:slug',
    Component: lazy(() => import('./page')),
};
export default listRoute;
