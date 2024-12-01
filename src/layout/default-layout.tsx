import { Outlet } from 'react-router-dom';
import { Container } from '~components';
import { Footer, Header } from './components';

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
