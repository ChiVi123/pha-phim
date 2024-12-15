import { CalendarIcon, ClockIcon, InfoIcon, PlayIcon, VideoIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '~components-ui/button';
import { Card, CardContent } from '~components-ui/card';
import { IFilmItem } from '~modules/film';
import { cn } from '~utils';
import CircleProcess from './circle-process';

interface ICardPosterProps {
    item: IFilmItem;
}

function CardPoster({ item }: ICardPosterProps) {
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <Card className='rounded-none shadow-lg overflow-hidden'>
            <CardContent className='relative flex items-center justify-center p-0'>
                <div className='h-screen sm:h-full max-h-screen text-center'>
                    <img
                        src={`https://img.ophim.live/uploads/movies/${item.poster_url}`}
                        alt={item.name}
                        className={cn('size-full object-cover', { 'h-screen': !loaded })}
                        onLoad={() => setLoaded(true)}
                    />
                </div>

                <div className='absolute inset-0 bg-gradient-to-r from-muted/90 to-muted/40'></div>

                <div className='absolute top-1/2 left-0 flex flex-col px-12 md:px-20 -translate-y-1/2'>
                    <h2 className='text-xl md:text-4xl lg:text-6xl font-bold text-primary tracking-tighter shadow-gray-800 text-shadow'>
                        {item.origin_name}
                    </h2>
                    <h2 className='mt-2 md:text-3xl font-bold shadow-gray-800 text-shadow'>
                        <span className='tracking-tighter'>{item.name}</span>
                        &nbsp;
                        <span className='text-lg'>({item.lang})</span>
                    </h2>

                    <div className='flex flex-wrap items-center gap-1 md:gap-2 mt-3'>
                        <span className='text-lg font-medium leading-none'>Quốc gia:</span>
                        {item.country.map((c) => (
                            <span
                                key={c.slug}
                                className='px-2 py-1 bg-primary/60 leading-none shadow-gray-800 text-shadow-sm rounded-sm'
                            >
                                {c.name}
                            </span>
                        ))}
                    </div>
                    <div className='flex flex-wrap items-center gap-1 md:gap-2 mt-3'>
                        <span className='text-lg font-medium leading-none'> Thể loại:</span>
                        {item.category.map((cate) => (
                            <span
                                key={cate.slug}
                                className='px-2 py-1 bg-primary/60 leading-none shadow-gray-800 text-shadow-sm rounded-sm'
                            >
                                {cate.name}
                            </span>
                        ))}
                    </div>

                    <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 my-3'>
                        <div className='flex items-center'>
                            <VideoIcon />
                            <span className='mb-[1px] ml-1 font-medium leading-none'>{item.quality}</span>
                        </div>

                        <div className='flex items-center'>
                            <CalendarIcon size={18} />
                            <span className='mb-[1px] ml-1 font-medium leading-none'>{item.year}</span>
                        </div>

                        <div className='flex items-center'>
                            <ClockIcon size={18} />
                            <span className='mb-[1px] ml-1 font-medium leading-none'>{item.time}</span>
                        </div>

                        <div className='flex md:hidden items-center gap-2'>
                            <Button asChild>
                                <Link to={`/${item.slug}`}>
                                    <InfoIcon />
                                    <span className='mb-[2px]'>Chi tiết</span>
                                </Link>
                            </Button>
                            <Button asChild variant='outline'>
                                <Link to={`/watch/${item.slug}`}>
                                    <PlayIcon />
                                    Xem ngay
                                </Link>
                            </Button>
                            <CircleProcess value={item.tmdb.vote_average} />
                        </div>

                        <CircleProcess value={item.tmdb.vote_average} className='hidden md:block' />
                    </div>

                    <div className='hidden md:flex items-center gap-2'>
                        <Button asChild>
                            <Link to={`/${item.slug}`}>
                                <InfoIcon />
                                <span className='mb-[2px]'>Chi tiết</span>
                            </Link>
                        </Button>
                        <Button asChild variant='outline'>
                            <Link to={`/watch/${item.slug}`}>
                                <PlayIcon />
                                Xem ngay
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CardPoster;
