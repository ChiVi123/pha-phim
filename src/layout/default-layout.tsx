import { Outlet } from 'react-router-dom';
import { Container } from '~components';
import Footer from './footer';
import Header from './header';

function DefaultLayout() {
    return (
        <>
            <Header />

            <main className='min-h-[800px]'>
                <Container>
                    <Outlet />
                </Container>
            </main>

            <Footer />
        </>
    );
}

export default DefaultLayout;
