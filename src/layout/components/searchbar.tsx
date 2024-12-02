import { Search as SearchIcon } from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Button } from '~components-ui/button';
import { Input } from '~components-ui/input';
import { cn } from '~utils';

function Searchbar() {
    const [isShowSearchbar, setIsShowSearchbar] = useState<boolean>(false);
    const searchbarRef = useRef<HTMLFormElement | null>(null);

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
    );
}

export default Searchbar;
