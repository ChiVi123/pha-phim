import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import browserRouter from '~routers';

function App() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return <RouterProvider router={browserRouter} />;
}

export default App;
