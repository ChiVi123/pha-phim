import { PlayIcon } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '~components-ui/card';
import { IFilmItem } from '~modules/film';

interface IProps {
    item: IFilmItem;
    domainCDNImage: string;
}
function CardFilm({ item, domainCDNImage }: IProps) {
    return (
        <Link to={`/${item.slug}`} title={item.name}>
            <Card className='relative h-full overflow-hidden select-none group'>
                <CardContent className='h-full p-0'>
                    <div className='h-80 text-center overflow-hidden'>
                        <LazyLoadImage
                            src={domainCDNImage + '/uploads/movies/' + item.thumb_url}
                            alt={item.name}
                            width={320}
                            height={298}
                            className='inline-block w-full h-full object-cover'
                        />
                    </div>
                    <div className='px-1 py-2'>
                        <h3 className='font-medium text-center text-primary line-clamp-1'>{item.origin_name}</h3>
                        <h3 className='text-center line-clamp-1'>{item.name}</h3>
                    </div>
                </CardContent>

                <div className='absolute top-0 left-0 flex items-center px-1 py-2 bg-primary rounded-r-sm shadow-lg text-xs leading-none text-primary-foreground'>
                    <span>{item.episode_current}</span>
                    <span className='mx-1 mb-[2px]'>|</span>
                    <span>{item.lang}</span>
                </div>

                <div className='absolute top-1/2 left-1/2 -translate-x-1/2'>
                    <span className='flex items-center justify-center size-14 bg-primary rounded-full shadow-slate-900 shadow-lg scale-150 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible transition-[transform,visibility,opacity] duration-800 [&_svg]:size-6'>
                        <PlayIcon strokeWidth={0} fill='white' />
                    </span>
                </div>
            </Card>
        </Link>
    );
}

export default CardFilm;
