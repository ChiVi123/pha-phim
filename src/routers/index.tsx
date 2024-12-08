import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '~layout';
import detailRoute from '~view/detail/router';
import homeRoute from '~view/home/router';
import listRoute from '~view/list/router';
import searchRoute from '~view/search/router';
import watchRoute from '~view/watch/router';

const browserRouter = createBrowserRouter([
    {
        Component: DefaultLayout,
        children: [homeRoute, detailRoute, watchRoute, listRoute, searchRoute],
    },
]);

export default browserRouter;
