import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react';
import { cn } from '~utils';

type ContainerRef = ElementRef<'div'>;
type ContainerPropsWithoutRef = ComponentPropsWithoutRef<'div'> & { asChild?: boolean; children: ReactNode };

const Container = forwardRef<ContainerRef, ContainerPropsWithoutRef>((props, forwardRef) => {
    const { asChild, className, ...containerProps } = props;
    const Component = asChild ? Slot : 'div';
    return <Component ref={forwardRef} className={cn('max-w-7xl w-full mx-auto', className)} {...containerProps} />;
});
Container.displayName = 'Container';

export default Container;
