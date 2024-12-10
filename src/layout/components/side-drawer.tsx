import { Slottable } from '@radix-ui/react-slot';
import { ChevronDown, Menu as MenuIcon, XIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextLogo } from '~components';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~components-ui/collapsible';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '~components-ui/drawer';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
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

function SideDrawer({ items, listObject }: IProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Drawer direction='left' dismissible={false} open={open} onOpenChange={setOpen}>
            <DrawerTrigger title='Menu' className='lg:hidden'>
                <MenuIcon />
            </DrawerTrigger>

            <DrawerContent className='w-full max-w-72 h-full mt-0 rounded-t-none backdrop-blur supports-[backdrop-filter]:bg-popover/20'>
                <DrawerHeader className='grid-cols-2 items-center pl-8 pr-4 text-left'>
                    <DrawerTitle>
                        <TextLogo />
                    </DrawerTitle>
                    <DrawerDescription className='sr-only'>Pha Phim</DrawerDescription>

                    <XIcon size={18} strokeWidth={2} className='ml-auto' onClick={() => setOpen(false)} />
                </DrawerHeader>

                <ScrollArea className='px-2'>
                    <NavigationMenu orientation='vertical' className='block max-w-full'>
                        <NavigationMenuList className=''>
                            {items.map((item) => (
                                <NavigationMenuItem key={item.content}>
                                    {item.type === 'menu-item' && (
                                        <NavigationMenuLink
                                            asChild
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                'justify-start gap-2 w-full h-auto py-4 bg-transparent'
                                            )}
                                            onClick={() => setOpen(false)}
                                        >
                                            {item.icon}
                                            <Slottable>
                                                <Link to={item.href}>{item.content}</Link>
                                            </Slottable>
                                        </NavigationMenuLink>
                                    )}

                                    {item.type === 'submenu-item' && (
                                        <Collapsible className='group/collapsible'>
                                            <CollapsibleTrigger
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    'justify-start gap-2 w-full h-auto py-4 bg-transparent'
                                                )}
                                            >
                                                {item.icon}
                                                {item.content}
                                                <ChevronDown className='ml-auto group-data-[state=open]/collapsible:rotate-180 transition-transform' />
                                            </CollapsibleTrigger>

                                            <ScrollArea>
                                                <CollapsibleContent>
                                                    <ul className='p-4 bg-popover'>
                                                        {listObject[item.listName].map((data) => (
                                                            <NavItemLink
                                                                key={data._id}
                                                                to={`${item.href}/${data.slug}`}
                                                                className='py-3'
                                                                onClick={() => setOpen(false)}
                                                            >
                                                                {data.name}
                                                            </NavItemLink>
                                                        ))}
                                                    </ul>
                                                </CollapsibleContent>
                                            </ScrollArea>
                                        </Collapsible>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}

export default SideDrawer;
