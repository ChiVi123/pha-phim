import { ArrowBigUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '~components-ui/button';
import Container from '~components/container';
import ScrollToTop from '~components/scroll-to-top';
import { cn } from '~utils';
import Footer from './footer';
import Header from './header';

function DefaultLayout() {
    const [showFloatButton, setShowFloatButton] = useState<boolean>(false);

    useEffect(() => {
        const handleVisible = () => {
            if (window.scrollY > 80) {
                setShowFloatButton(true);
            } else {
                setShowFloatButton(false);
            }
        };

        window.addEventListener('scroll', handleVisible);

        return () => {
            console.log('remove event');
            window.removeEventListener('scroll', handleVisible);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };
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

            <Button
                type='button'
                size='icon'
                className={cn(
                    'fixed right-2 bottom-2 size-12 rounded-full shadow-popover shadow-md scale-0 [&_svg]:size-6 transition-transform duration-500',
                    { 'scale-100': showFloatButton }
                )}
                onClick={handleScrollToTop}
            >
                <span className='sr-only'>scroll to top</span>
                <ArrowBigUpIcon strokeWidth={0} fill='currentColor' />
            </Button>
        </>
    );
}

export default DefaultLayout;
