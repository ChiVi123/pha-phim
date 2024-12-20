import { TooltipPortal } from '@radix-ui/react-tooltip';
import { CircleXIcon, Search as SearchIcon } from 'lucide-react';
import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '~components-ui/button';
import { Input } from '~components-ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~components-ui/tooltip';
import { useDebounce } from '~hook';
import { ListFilmResponse, searchFilm } from '~modules/film';
import { cn } from '~utils';

type ListFilmData = Pick<ListFilmResponse['data'], 'APP_DOMAIN_CDN_IMAGE' | 'items'>;

function Searchbar() {
    const [isShowSearchbar, setIsShowSearchbar] = useState<boolean>(false);
    const [searchbarValue, setSearchbarValue] = useState<string>('');
    const [listResult, setListResult] = useState<ListFilmData>();

    const searchbarRef = useRef<HTMLFormElement | null>(null);
    const inputSearchRef = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();
    const debounceValue = useDebounce(searchbarValue, 500);

    useEffect(() => {
        const handleCloseSearchbar = (e: MouseEvent) => {
            if (!e.target) return;
            if (!searchbarRef.current?.contains(e.target as Node)) {
                setIsShowSearchbar(false);
                setSearchbarValue('');
            }
        };

        window.addEventListener('click', handleCloseSearchbar);

        return () => {
            console.log('remove event');
            window.removeEventListener('click', handleCloseSearchbar);
        };
    }, []);

    useEffect(() => {
        if (isShowSearchbar) {
            inputSearchRef.current?.focus();
        }
    }, [isShowSearchbar]);

    useEffect(() => {
        const controller = new AbortController();
        if (!debounceValue.trim()) {
            setListResult({ APP_DOMAIN_CDN_IMAGE: '', items: [] });
            return;
        }
        searchFilm(controller.signal, { keyword: debounceValue }).then((result) => setListResult(result.data));
        return () => controller.abort();
    }, [debounceValue]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // when isShowSearchbar (false to true), event submit is triggered
        // input value is falsy should not fetch
        if (searchbarValue) {
            setIsShowSearchbar(false);
            setSearchbarValue('');
            navigate({ pathname: '/search', search: new URLSearchParams({ keyword: searchbarValue }).toString() });
        }
    };
    const handleClear = () => {
        setSearchbarValue('');
        inputSearchRef.current?.focus();
    };
    const handleInputSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.target;
        if (value.startsWith(' ')) return;
        setSearchbarValue(value);
    };

    return (
        <TooltipProvider>
            <Tooltip disableHoverableContent open={listResult && isShowSearchbar && listResult.items.length > 0}>
                <TooltipTrigger asChild>
                    <form
                        ref={searchbarRef}
                        className='flex items-center bg-popover border border-border rounded-sm opacity-80 sm:opacity-60 shadow-slate-100 shadow-2xl sm:shadow-none overflow-hidden'
                        onSubmit={handleSubmit}
                    >
                        <Input
                            ref={inputSearchRef}
                            name='searchTerm'
                            placeholder='Tìm kiếm...'
                            value={searchbarValue}
                            className={cn(
                                'w-32 sm:w-64 border-none rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 transition-[width,padding] duration-1000',
                                {
                                    '!w-0 px-0': !isShowSearchbar,
                                }
                            )}
                            onChange={handleInputSearchChange}
                        />

                        <CircleXIcon
                            size={14}
                            className={cn('cursor-pointer', { hidden: !searchbarValue })}
                            onClick={handleClear}
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
                </TooltipTrigger>

                <TooltipPortal>
                    <TooltipContent align='end' className='max-w-[calc(100vw-32px)] sm:min-w-80 p-0'>
                        <div className='max-h-[calc(100vh-160px)] p-3 overflow-y-auto'>
                            {listResult &&
                                listResult.items.map((item) => (
                                    <Link
                                        key={item._id}
                                        to={`/${item.slug}`}
                                        className='flex gap-2 py-1 first-of-type:mt-0 mt-2 hover:bg-primary/5'
                                    >
                                        <img
                                            src={listResult.APP_DOMAIN_CDN_IMAGE + '/uploads/movies/' + item.thumb_url}
                                            alt={item.name}
                                            width={60}
                                            height={80}
                                            loading='lazy'
                                            className='object-cover'
                                        />
                                        <div>
                                            <h2 className='font-bold line-clamp-1'>{item.name}</h2>
                                            <h2 className='text-sm font-light text-primary line-clamp-1'>
                                                {item.origin_name}
                                            </h2>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </TooltipContent>
                </TooltipPortal>
            </Tooltip>
        </TooltipProvider>
    );
}

export default Searchbar;
