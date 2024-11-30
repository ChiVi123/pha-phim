import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { HydrateFallback } from '~components';

const homeRoute: RouteObject = {
    path: '/',
    Component: lazy(() => import('./page')),
    HydrateFallback: HydrateFallback,
};
export default homeRoute;
