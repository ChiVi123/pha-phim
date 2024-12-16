import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from '~core/store';
import browserRouter from '~routers';

function App() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <HelmetProvider>
            <Provider store={store}>
                <RouterProvider router={browserRouter} />
            </Provider>
        </HelmetProvider>
    );
}

export default App;
