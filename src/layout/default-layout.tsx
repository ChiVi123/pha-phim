import { Outlet } from 'react-router-dom';
import '~css/app.css';
import { Footer, Header } from './components';

function DefaultLayout() {
    return (
        <>
            <header>
                <Header />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default DefaultLayout;
