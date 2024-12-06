import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from '~core/store';
import browserRouter from '~routers';

function App() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <Provider store={store}>
            <RouterProvider router={browserRouter} />
        </Provider>
    );
}

export default App;
