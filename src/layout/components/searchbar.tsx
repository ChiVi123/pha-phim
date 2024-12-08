import { Search as SearchIcon } from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~components-ui/button';
import { Input } from '~components-ui/input';
import { cn } from '~utils';

function Searchbar() {
    const [isShowSearchbar, setIsShowSearchbar] = useState<boolean>(false);
    const [searchbar, setSearchbar] = useState<string>('');
    const searchbarRef = useRef<HTMLFormElement | null>(null);
    const navigate = useNavigate();

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

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // when isShowSearchbar (false to true), event submit is triggered
        // input value is falsy should not fetch
        if (searchbar) {
            navigate({ pathname: '/search', search: new URLSearchParams({ keyword: searchbar }).toString() });
        }
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
                value={searchbar}
                className={cn(
                    'w-64 border-none rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 transition-[width,padding] duration-1000',
                    {
                        'w-0 px-0': !isShowSearchbar,
                    }
                )}
                onChange={(e) => setSearchbar(e.currentTarget.value)}
            />

            <Button
                type='submit'
                variant='ghost'
                size='icon'
                title='Tìm kiếm'
                className={cn({
                    'rounded-none': isShowSearchbar,
                    hidden: !isShowSearchbar,
                })}
            >
                <SearchIcon />
            </Button>

            <Button
                type='button'
                variant='ghost'
                size='icon'
                title='Tìm kiếm'
                className={cn({
                    hidden: isShowSearchbar,
                    'hover:bg-transparent hover:text-muted-foreground': !isShowSearchbar,
                })}
                onClick={() => setIsShowSearchbar(true)}
            >
                <SearchIcon />
            </Button>
        </form>
    );
}

export default Searchbar;
