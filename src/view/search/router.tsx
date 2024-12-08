import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const searchRoute: RouteObject = {
    path: '/search',
    Component: lazy(() => import('./page')),
};
export default searchRoute;
