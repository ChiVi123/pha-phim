import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import React from 'react';

import { cn } from '~utils';

type ScrollAreaRef = React.ElementRef<typeof ScrollAreaPrimitive.Root>;
type ScrollAreaPropsWithoutRef = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>;

const ScrollArea = React.forwardRef<ScrollAreaRef, ScrollAreaPropsWithoutRef>(
    ({ className, children, ...props }, ref) => (
        <ScrollAreaPrimitive.Root ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
            <ScrollAreaPrimitive.Viewport className='h-full w-full rounded-[inherit]'>
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    )
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

type ScrollBarRef = React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>;
type ScrollBarPropsWithoutRef = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>;

const ScrollBar = React.forwardRef<ScrollBarRef, ScrollBarPropsWithoutRef>(
    ({ className, orientation = 'vertical', ...props }, ref) => (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            ref={ref}
            orientation={orientation}
            className={cn(
                'flex touch-none select-none transition-colors',
                {
                    'h-full w-2.5 border-l border-l-transparent p-[1px]': orientation === 'vertical',
                    'h-2.5 flex-col border-t border-t-transparent p-[1px]': orientation === 'horizontal',
                },
                className
            )}
            {...props}
        >
            <ScrollAreaPrimitive.ScrollAreaThumb className='relative flex-1 rounded-full bg-border' />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    )
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
