import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '~components';
import { cn } from '~utils';
import { TopBar } from './components';
import Footer from './footer';

function DefaultLayout() {
    const [isHasBg, setIsHasBg] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsHasBg(true);
            } else {
                setIsHasBg(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            console.log('remove event');
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header
                className={cn('fixed top-0 left-0 w-full h-[50px] transition-[background-color] duration-500', {
                    'bg-background': isHasBg,
                })}
            >
                <Container>
                    <TopBar />
                </Container>
            </header>

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
