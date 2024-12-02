import { NavigationMenuLink } from '@radix-ui/react-navigation-menu';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '~utils';

type NavItemLinkRef = ElementRef<typeof Link>;
type NavItemLinkPropsWithoutRef = ComponentPropsWithoutRef<typeof Link>;

const NavItemLink = forwardRef<NavItemLinkRef, NavItemLinkPropsWithoutRef>((props, ref) => {
    const { className, children, ...navItemLinkProps } = props;
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        'block outline-none p-1 font-medium leading-none text-sm no-underline select-none transition-colors hover:text-primary focus:text-primary space-y-1',
                        className
                    )}
                    {...navItemLinkProps}
                >
                    {children}
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
NavItemLink.displayName = 'NavItemLink';

export default NavItemLink;
