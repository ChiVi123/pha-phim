import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRef } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { CardFilm, MetaData } from '~components';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~components-ui/carousel';
import { IFilmItem, ListFilmResponse } from '~modules/film';
import { CardPoster, ChevronAnimation } from './components';

type FilmTypeObject = Record<FilmType, Omit<ListFilmResponse['data'], 'breadCrumb' | 'params'>>;

function HomePage() {
    const { filmHotSlides, listFilmObject } = useLoaderData() as {
        listFilmObject: FilmTypeObject;
        filmHotSlides: IFilmItem[];
    };
    const pluginRef = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
        <>
            <MetaData />

            <Carousel
                plugins={[pluginRef.current]}
                className='inset-0 w-full'
                onMouseEnter={pluginRef.current.stop}
                onMouseLeave={() => pluginRef.current.play()}
            >
                <CarouselContent>
                    {filmHotSlides.map((item, index) => (
                        <CarouselItem key={index}>
                            <CardPoster item={item} />
                        </CarouselItem>
                    ))}
                    {filmHotSlides.length === 0 && <div className='w-full h-screen bg-popover'></div>}
                </CarouselContent>

                <CarouselPrevious
                    type='button'
                    variant='ghost'
                    icon={ChevronLeftIcon}
                    className='left-0 md:left-4 size-auto [&_svg]:size-12 border-0 hover:bg-transparent hover:text-primary'
                />
                <CarouselNext
                    type='button'
                    variant='ghost'
                    icon={ChevronRightIcon}
                    className='right-0 md:right-4 size-auto [&_svg]:size-12 border-0 hover:bg-transparent hover:text-primary'
                />
            </Carousel>

            <div className='px-2 sm:px-8 my-12 space-y-8'>
                {Object.values(listFilmObject).map((type) => (
                    <div key={type.type_list}>
                        <Link to={`/danh-sach/${type.type_list}`} className='inline-flex items-center mb-4 my-2 group'>
                            <h2 className='pr-2 text-xl font-medium text-primary'>{type.titlePage}</h2>
                            <span className='inline-block max-w-0 pr-0 text-sm text-nowrap transition-[max-width,padding-right] duration-1000 overflow-hidden group-hover:max-w-20 group-hover:pr-1'>
                                Xem thêm
                            </span>

                            <ChevronAnimation disabledAnimation />

                            <ChevronAnimation />
                        </Link>

                        <Carousel key={type.type_list}>
                            <CarouselContent>
                                {type.items.map((item) => (
                                    <CarouselItem key={item.slug} className='basis-1/2 sm:basis-1/3 lg:basis-1/5'>
                                        <CardFilm item={item} domainCDNImage={type.APP_DOMAIN_CDN_IMAGE} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselPrevious
                                type='button'
                                variant='ghost'
                                icon={ChevronLeftIcon}
                                className='left-0 size-auto [&_svg]:size-12 border-0 bg-accent/80 shadow-slate-900 shadow-md transition-colors duration-800'
                            />
                            <CarouselNext
                                type='button'
                                variant='ghost'
                                icon={ChevronRightIcon}
                                className='right-0 size-auto [&_svg]:size-12 border-0 bg-accent/80 shadow-slate-900 shadow-md transition-colors duration-800'
                            />
                        </Carousel>
                    </div>
                ))}
            </div>
        </>
    );
}

export default HomePage;
