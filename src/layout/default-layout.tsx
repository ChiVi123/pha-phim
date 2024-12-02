import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

function DefaultLayout() {
    return (
        <>
            <Header />

            <main className='min-h-[800px] bg-muted'>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default DefaultLayout;
