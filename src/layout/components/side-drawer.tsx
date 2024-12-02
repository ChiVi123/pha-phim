import { Slottable } from '@radix-ui/react-slot';
import { Menu as MenuIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { TextLogo } from '~components';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '~components-ui/drawer';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '~components-ui/navigation-menu';
import { ICategoryEntity } from '~modules/category';
import { ICountryEntity } from '~modules/country';
import { cn } from '~utils';

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
}

function SideDrawer({ items }: IProps) {
    return (
        <Drawer direction='left'>
            <DrawerTrigger title='Menu' className='lg:hidden'>
                <MenuIcon />
            </DrawerTrigger>
            <DrawerContent className='w-56 sm:w-64 h-full mt-0 px-2 rounded-t-none backdrop-blur supports-[backdrop-filter]:bg-popover/20'>
                <DrawerHeader className='text-left'>
                    <DrawerTitle asChild>
                        <TextLogo />
                    </DrawerTitle>
                </DrawerHeader>

                <NavigationMenu orientation='vertical' className='block max-w-full'>
                    <NavigationMenuList className=''>
                        {items.map((item) => (
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
    );
}

export default SideDrawer;
