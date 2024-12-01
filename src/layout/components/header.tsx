import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

function Header() {
    const [listMap, setListMap] = useState<ListObject>({ 'quoc-gia': [], 'the-loai': [] });

    useEffect(() => {
        const abortController = new AbortController();

        (async function () {
            const categoryResult = await getAllCategory(abortController.signal);
            const countryResult = await getAllCountry(abortController.signal);

            setListMap((prev) => ({
                ...prev,
                'the-loai': categoryResult.data.items,
                'quoc-gia': countryResult.data.items,
            }));
        })();

        return () => abortController.abort();
    }, []);

    return (
        <>
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
                                            <List items={listMap[item.listName]} />
                                        </ScrollArea>
                                    </NavigationMenuContent>
                                </>
                            )}
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}

const List = <T extends { _id: string; name: string; slug: string }>({ items }: { items: T[] }) => (
    <ul className='grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-popover'>
        {items.map((data) => (
            <ListItem key={data._id} to={`/list/${data.slug}`}>
                {data.name}
            </ListItem>
        ))}
    </ul>
);

type ListItemRef = ElementRef<typeof Link>;
type ListItemPropsWithoutRef = ComponentPropsWithoutRef<typeof Link>;

const ListItem = forwardRef<ListItemRef, ListItemPropsWithoutRef>((props, ref) => {
    const { className, children, ...listItemProps } = props;
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        'block outline-none p-1 font-medium leading-none text-sm no-underline select-none transition-colors hover:text-primary focus:text-primary space-y-1',
                        className
                    )}
                    {...listItemProps}
                >
                    {children}
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';

export default Header;
