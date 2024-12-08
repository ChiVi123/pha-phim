import { GlobeIcon, HouseIcon, LayoutListIcon, PopcornIcon, TvIcon, TvMinimalPlayIcon } from 'lucide-react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, TextLogo } from '~components';
import { useAppDispatch } from '~core/store';
import { categorySelector, fetchAllCategory, ICategoryEntity } from '~modules/category';
import { countrySelector, fetchAllCountry, ICountryEntity } from '~modules/country';
import { cn } from '~utils';
import { Navigation, Searchbar, SideDrawer } from './components';

type ListObject = { 'the-loai': ICategoryEntity[]; 'quoc-gia': ICountryEntity[] };
type NavigateMenuItem = { type: 'menu-item'; href: `/${string}`; content: string; icon: ReactNode };
type NavigateSubmenuItem = {
    type: 'submenu-item';
    href: `/${string}`;
    content: string;
    listName: keyof ListObject;
    icon: ReactNode;
};
type NavigateItem = NavigateMenuItem | NavigateSubmenuItem;
const navigate: NavigateItem[] = [
    { type: 'menu-item', href: '/', content: 'Trang chủ', icon: <HouseIcon /> },
    { type: 'menu-item', href: '/danh-sach/phim-le', content: 'Phim lẻ', icon: <PopcornIcon /> },
    { type: 'menu-item', href: '/danh-sach/phim-bo', content: 'Phim bộ', icon: <TvMinimalPlayIcon /> },
    { type: 'menu-item', href: '/danh-sach/tv-shows', content: 'TV Shows', icon: <TvMinimalPlayIcon /> },
    { type: 'menu-item', href: '/danh-sach/hoat-hinh', content: 'Hoạt hình', icon: <TvIcon /> },
    {
        type: 'submenu-item',
        href: '/the-loai',
        content: 'Thể loại',
        listName: 'the-loai',
        icon: <LayoutListIcon />,
    },
    { type: 'submenu-item', href: '/quoc-gia', content: 'Quốc gia', listName: 'quoc-gia', icon: <GlobeIcon /> },
];

function Header() {
    const [isHasBg, setIsHasBg] = useState<boolean>(false);
    const categories = useSelector(categorySelector.data);
    const countries = useSelector(countrySelector.data);
    const dispatch = useAppDispatch();

    const listObject = useMemo<ListObject>(
        () => ({ 'quoc-gia': countries, 'the-loai': categories }),
        [categories, countries]
    );

    useEffect(() => {
        const categoryPromise = dispatch(fetchAllCategory());
        const countryPromise = dispatch(fetchAllCountry());

        return () => {
            categoryPromise.abort();
            countryPromise.abort();
        };
    }, [dispatch]);

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
        <header
            className={cn('fixed top-0 left-0 w-full h-[50px] transition-[background-color] duration-500 z-10', {
                'bg-background': isHasBg,
            })}
        >
            <Container className='h-full'>
                <div className='relative flex items-center justify-between gap-1 sm:gap-2 h-full px-4 py-1'>
                    <div className='flex items-center gap-2 sm:gap-4'>
                        <SideDrawer items={navigate} />

                        <TextLogo />

                        <Navigation items={navigate} listObject={listObject} />
                    </div>

                    <Searchbar />
                </div>
            </Container>
        </header>
    );
}

export default Header;
