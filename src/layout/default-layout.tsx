import { Outlet } from 'react-router-dom';
import { Container, ScrollToTop } from '~components';
import Footer from './footer';
import Header from './header';

function DefaultLayout() {
    return (
        <>
            <ScrollToTop />

            <Header />
            <main className='min-h-screen'>
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default DefaultLayout;
