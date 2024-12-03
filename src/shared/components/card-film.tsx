import { Link } from 'react-router-dom';
import { Card, CardContent } from '~components-ui/card';
import { IFilmItem } from '~modules/film';

interface IProps {
    item: IFilmItem;
    domainCDNImage: string;
}
function CardFilm({ item, domainCDNImage }: IProps) {
    return (
        <Link to={`/${item.slug}`}>
            <Card className='relative h-full overflow-hidden select-none group'>
                <CardContent className='h-full p-0'>
                    <div className='h-80 text-center overflow-hidden'>
                        <img
                            src={domainCDNImage + '/uploads/movies/' + item.thumb_url}
                            alt={item.name}
                            loading='lazy'
                            className='inline-block h-full object-cover group-hover:scale-125 transition-transform'
                        />
                    </div>
                    <div className='p-2'>
                        <h3 className='font-medium text-center text-primary line-clamp-1'>{item.origin_name}</h3>
                        <h3 className='text-center line-clamp-1'>{item.name}</h3>
                    </div>
                </CardContent>

                <span className='absolute top-1 left-0 inline-block p-1 bg-primary rounded-r-sm text-sm text-primary-foreground'>
                    {item.year}
                </span>
                <span className='absolute top-1 right-0 inline-block p-1 bg-primary rounded-l-sm text-sm text-primary-foreground'>
                    {item.quality}+{item.lang}
                </span>
            </Card>
        </Link>
    );
}

export default CardFilm;
