import {
    Globe as GlobeIcon,
    House as HouseIcon,
    LayoutList as LayoutListIcon,
    Popcorn as PopcornIcon,
    Tv as TvIcon,
    TvMinimalPlay as TvMinimalPlayIcon,
} from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { Container, TextLogo } from '~components';
import { getAllCategory, ICategoryEntity } from '~modules/category';
import { getAllCountry, ICountryEntity } from '~modules/country';
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
    { type: 'menu-item', href: '/list/phim-le', content: 'Phim lẻ', icon: <PopcornIcon /> },
    { type: 'menu-item', href: '/list/phim-bo', content: 'Phim bộ', icon: <TvMinimalPlayIcon /> },
    { type: 'menu-item', href: '/list/tv-shows', content: 'TV Shows', icon: <TvMinimalPlayIcon /> },
    { type: 'menu-item', href: '/list/hoat-hinh', content: 'Hoạt hình', icon: <TvIcon /> },
    {
        type: 'submenu-item',
        href: '/list/the-loai',
        content: 'Thể loại',
        listName: 'the-loai',
        icon: <LayoutListIcon />,
    },
    { type: 'submenu-item', href: '/list/quoc-gia', content: 'Quốc gia', listName: 'quoc-gia', icon: <GlobeIcon /> },
];

function Header() {
    const [listObject, setListObject] = useState<ListObject>({ 'quoc-gia': [], 'the-loai': [] });
    const [isHasBg, setIsHasBg] = useState<boolean>(false);

    useEffect(() => {
        const abortController = new AbortController();

        (async function () {
            const categoryResult = await getAllCategory(abortController.signal);
            const countryResult = await getAllCountry(abortController.signal);

            setListObject((prev) => ({
                ...prev,
                'the-loai': categoryResult.data.items,
                'quoc-gia': countryResult.data.items,
            }));
        })();

        return () => abortController.abort();
    }, []);

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
            <Container>
                <div className='flex items-center justify-between h-full px-4 py-1'>
                    <div className='flex items-center gap-4'>
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
