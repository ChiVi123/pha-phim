import {
    Globe as GlobeIcon,
    House as HouseIcon,
    LayoutList as LayoutListIcon,
    Menu as MenuIcon,
    Popcorn as PopcornIcon,
    Search as SearchIcon,
    Tv as TvIcon,
    TvMinimalPlay as TvMinimalPlayIcon,
} from 'lucide-react';
import { FormEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '~components-ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '~components-ui/drawer';
import { Input } from '~components-ui/input';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '~components-ui/navigation-menu';
import { ScrollArea } from '~components-ui/scroll-area';
import { getAllCategory, ICategoryEntity } from '~modules/category';
import { getAllCountry, ICountryEntity } from '~modules/country';
import { cn } from '~utils';

import { Slottable } from '@radix-ui/react-slot';
import SubMenu from './sub-menu';

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

function TopBar() {
    const [listObject, setListObject] = useState<ListObject>({ 'quoc-gia': [], 'the-loai': [] });
    const [isShowSearchbar, setIsShowSearchbar] = useState<boolean>(false);
    const searchbarRef = useRef<HTMLFormElement | null>(null);

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
        const handleCloseSearchbar = (e: MouseEvent) => {
            if (!e.target) return;

            if (!searchbarRef.current?.contains(e.target as Node)) {
                setIsShowSearchbar(false);
            }
        };

        window.addEventListener('click', handleCloseSearchbar);

        return () => {
            console.log('remove event');
            window.removeEventListener('click', handleCloseSearchbar);
        };
    }, []);

    const handleOpenSearchbar = () => {
        if (!isShowSearchbar) setIsShowSearchbar(true);
    };
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // when isShowSearchbar (false to true), event submit is triggered
        // input value is falsy should not fetch
        console.log('submit', isShowSearchbar);
    };

    return (
        <div className='flex items-center justify-between h-full py-1'>
            <div className='flex items-center gap-4'>
                <Drawer direction='left'>
                    <DrawerTrigger title='Menu' className='lg:hidden'>
                        <MenuIcon />
                    </DrawerTrigger>
                    <DrawerContent className='w-56 sm:w-64 h-full mt-0 px-2 rounded-t-none backdrop-blur supports-[backdrop-filter]:bg-popover/20'>
                        <DrawerHeader className='text-left'>
                            <DrawerTitle className='text-primary'>
                                Ph<span className='text-red-400 animate-pulse'>a</span> Phim
                            </DrawerTitle>
                        </DrawerHeader>

                        <NavigationMenu orientation='vertical' className='block max-w-full'>
                            <NavigationMenuList className=''>
                                {navigate.map((item) => (
                                    <NavigationMenuItem key={item.content}>
                                        <NavigationMenuLink
                                            asChild
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                'justify-start gap-2 w-full h-auto py-4 bg-transparent'
                                            )}
                                        >
                                            {item.icon}
                                            <Slottable>
                                                <Link to={item.href}>{item.content}</Link>
                                            </Slottable>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </DrawerContent>
                </Drawer>

                <h1 className='text-lg font-bold text-primary'>
                    Ph<span className='text-red-400 animate-pulse'>a</span> Phim
                </h1>

                <NavigationMenu className='hidden lg:flex'>
                    <NavigationMenuList>
                        {navigate.map((item) => (
                            <NavigationMenuItem
                                key={item.content}
                                className={cn({ relative: item.type === 'submenu-item' })}
                            >
                                {item.type === 'menu-item' ? (
                                    <NavigationMenuLink
                                        asChild
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            'bg-transparent hover:bg-transparent hover:text-primary'
                                        )}
                                    >
                                        <Link to={item.href}>{item.content}</Link>
                                    </NavigationMenuLink>
                                ) : (
                                    <>
                                        <NavigationMenuTrigger
                                            type='button'
                                            className='bg-transparent hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent'
                                        >
                                            {item.content}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className='top-full left-0 md:w-max pt-2'>
                                            <ScrollArea className='h-[500px] rounded-sm'>
                                                <SubMenu items={listObject[item.listName]} />
                                            </ScrollArea>
                                        </NavigationMenuContent>
                                    </>
                                )}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <form
                ref={searchbarRef}
                className='flex items-center bg-popover border border-border rounded-sm opacity-60 overflow-hidden'
                onSubmit={handleSubmit}
            >
                <Input
                    name='searchTerm'
                    placeholder='Tìm kiếm...'
                    className={cn(
                        'w-64 border-none rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 transition-[width] duration-800',
                        {
                            'w-0 px-0': !isShowSearchbar,
                        }
                    )}
                />

                <Button
                    type={isShowSearchbar ? 'submit' : 'button'}
                    variant='ghost'
                    size='icon'
                    title='Tìm kiếm'
                    className={cn({
                        'rounded-none': isShowSearchbar,
                        'hover:bg-transparent hover:text-muted-foreground': !isShowSearchbar,
                    })}
                    onClick={handleOpenSearchbar}
                >
                    <SearchIcon />
                </Button>
            </form>
        </div>
    );
}

export default TopBar;
