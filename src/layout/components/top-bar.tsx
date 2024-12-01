import { Search as SearchIcon } from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '~components-ui/button';
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

import SubMenu from './sub-menu';

type ListObject = { 'the-loai': ICategoryEntity[]; 'quoc-gia': ICountryEntity[] };
type NavigateMenuItem = { type: 'menu-item'; href: `/${string}`; content: string };
type NavigateSubmenuItem = {
    type: 'submenu-item';
    href: `/${string}`;
    content: string;
    listName: keyof ListObject;
};
type NavigateItem = NavigateMenuItem | NavigateSubmenuItem;
const navigate: NavigateItem[] = [
    { type: 'menu-item', href: '/', content: 'Trang chủ' },
    { type: 'menu-item', href: '/list/phim-le', content: 'Phim lẻ' },
    { type: 'menu-item', href: '/list/phim-bo', content: 'Phim bộ' },
    { type: 'menu-item', href: '/list/tv-shows', content: 'TV Shows' },
    { type: 'menu-item', href: '/list/hoat-hinh', content: 'Hoạt hình' },
    { type: 'submenu-item', href: '/list/the-loai', content: 'Thể loại', listName: 'the-loai' },
    { type: 'submenu-item', href: '/list/quoc-gia', content: 'Quốc gia', listName: 'quoc-gia' },
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
        <div className='flex items-center justify-between'>
            <NavigationMenu>
                <NavigationMenuList>
                    {navigate.map((item) => (
                        <NavigationMenuItem
                            key={item.content}
                            className={cn({ relative: item.type === 'submenu-item' })}
                        >
                            {item.type === 'menu-item' ? (
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to={item.href}>{item.content}</Link>
                                </NavigationMenuLink>
                            ) : (
                                <>
                                    <NavigationMenuTrigger type='button'>{item.content}</NavigationMenuTrigger>
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

            <form
                ref={searchbarRef}
                className='flex items-center border border-border rounded-sm overflow-hidden'
                onSubmit={handleSubmit}
            >
                <Input
                    name='searchTerm'
                    placeholder='Tìm kiếm...'
                    className={cn(
                        'w-64 border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-[width] duration-800',
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
