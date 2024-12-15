import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardFilm } from '~components';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~components-ui/carousel';
import { IFilmItem, ListFilmResponse, searchFilmByType } from '~modules/film';
import { CardPoster, ChevronAnimation } from './components';

type FilmTypeObject = Record<FilmType, Omit<ListFilmResponse['data'], 'breadCrumb' | 'params'>>;

const filmTypes: FilmType[] = ['hot', 'phim-le', 'hoat-hinh', 'phim-bo'];

function HomePage() {
    const pluginRef = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
    const [filmTypeObject, setFilmTypeObject] = useState<FilmTypeObject>();
    const [filmHotSlides, setFilmHotSlides] = useState<IFilmItem[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        (async function () {
            const promise = [];
            for (const type of filmTypes) {
                promise.push(searchFilmByType(controller.signal, { page: 1 }, type));
            }
            const result = await Promise.all(promise);
            const obj: FilmTypeObject = result.reduce((prev, current) => {
                prev[current.data.type_list] = {
                    APP_DOMAIN_CDN_IMAGE: current.data.APP_DOMAIN_CDN_IMAGE,
                    items: current.data.items,
                    titlePage: current.data.titlePage,
                    type_list: current.data.type_list,
                };
                return prev;
            }, {} as FilmTypeObject);
            setFilmTypeObject(obj);
            setFilmHotSlides(obj['hot'].items.slice(0, 5));
        })();

        return () => controller.abort();
    }, []);

    return (
        <>
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
                {filmTypeObject &&
                    Object.values(filmTypeObject).map((type) => (
                        <div key={type.type_list}>
                            <Link
                                to={`/danh-sach/${type.type_list}`}
                                className='inline-flex items-center mb-4 my-2 group'
                            >
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
