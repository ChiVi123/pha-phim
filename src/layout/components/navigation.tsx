import { ReactNode } from 'react';
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
import { ICategoryEntity } from '~modules/category';
import { ICountryEntity } from '~modules/country';
import { cn } from '~utils';

import NavItemLink from './nav-item-link';

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

interface IProps {
    items: NavigateItem[];
    listObject: ListObject;
}

function Navigation({ items, listObject }: IProps) {
    return (
        <NavigationMenu className='hidden lg:flex'>
            <NavigationMenuList>
                {items.map((item) => (
                    <NavigationMenuItem key={item.content} className={cn({ relative: item.type === 'submenu-item' })}>
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
                                        <ul className='grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-popover'>
                                            {listObject[item.listName].map((data) => (
                                                <NavItemLink key={data._id} to={`${item.href}/${data.slug}`}>
                                                    {data.name}
                                                </NavItemLink>
                                            ))}
                                        </ul>
                                    </ScrollArea>
                                </NavigationMenuContent>
                            </>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default Navigation;
