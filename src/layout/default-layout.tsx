import { Outlet } from 'react-router-dom';
import { Container } from '~components';
import Footer from './footer';
import Header from './header';

function DefaultLayout() {
    return (
        <>
            <Container asChild>
                <header>
                    <Header />
                </header>
            </Container>

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
