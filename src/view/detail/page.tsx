import { PlayCircleIcon, PlayIcon, StarIcon, TvMinimalPlayIcon } from 'lucide-react';
import { Fragment } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Button } from '~components-ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~components-ui/dialog';
import Breadcrumb from '~components/breadcrumb';
import MetaData from '~components/meta-data';
import SectionEpisode from '~components/section-episode';
import { HTTPResponse } from '~core/http';
import { IFilmEntity } from '~modules/film';

function DetailPage() {
    const { data } = useLoaderData() as HTTPResponse<IFilmEntity>;
    const { seoOnPage } = data;
    const { episodes } = data.item;

    return (
        <div className='p-4 mt-header'>
            <MetaData
                metaTitle={seoOnPage.titleHead}
                metaDescription={seoOnPage.descriptionHead}
                metaType={seoOnPage.og_type}
                metaImage={seoOnPage.og_image[0]}
            />

            <Breadcrumb breadcrumb={data.breadCrumb} />

            {/* Info */}
            <div className='relative flex flex-col md:flex-row gap-6 mt-4 overflow-hidden'>
                <div className='hidden sm:block absolute inset-0 blur-md opacity-30 -z-10'>
                    <img
                        src={'https://img.ophim.live/uploads/movies/' + data.item.poster_url}
                        alt={data.item.name}
                        className='size-full object-cover'
                    />
                </div>

                <div className='relative md:w-1/4'>
                    <img
                        src={'https://img.ophim.live/uploads/movies/' + data.item.thumb_url}
                        alt={data.item.name}
                        className='size-full object-cover opacity-60'
                    />

                    {data.item.episode_current !== 'Trailer' && (
                        <div className='absolute left-1/2 bottom-2 -translate-x-1/2'>
                            <Link
                                to={`/watch/${data.item.slug}`}
                                className='inline-flex items-center justify-center size-14 bg-primary rounded-full shadow-primary shadow-md [&_svg]:size-6'
                            >
                                <PlayIcon strokeWidth={1.5} fill='currentColor' className='ml-[2px]' />
                                <span className='sr-only'>Xem phim</span>
                            </Link>
                        </div>
                    )}
                </div>

                <div className='md:w-3/4 pt-2'>
                    <h1 className='text-4xl font-bold text-primary'>{data.item.name}</h1>
                    <h2 className='mt-4 font-bold'>{data.item.origin_name}</h2>

                    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 mt-6'>
                        <li>
                            <span className='mr-1 text-muted-foreground whitespace-nowrap'>Năm:</span>
                            <span>{data.item.year}</span>
                        </li>
                        <li>
                            <span className='mr-1 text-muted-foreground whitespace-nowrap'>Thời lượng:</span>
                            <span>{data.item.time}</span>
                        </li>

                        <li>
                            <span className='mr-1 text-muted-foreground whitespace-nowrap'>Tập mới nhất:</span>
                            <span>{data.item.episode_current}</span>
                        </li>
                        <li>
                            <span className='mr-1 text-muted-foreground whitespace-nowrap'>Tổng số tập:</span>
                            <span>{data.item.episode_total}</span>
                        </li>

                        <li>
                            <span className='mr-1 text-muted-foreground whitespace-nowrap'>Quốc gia:</span>
                            {data.item.country.map((item, index) => (
                                <Fragment key={item.slug}>
                                    {index === 0 ? '' : ', '}
                                    <Link to={`/quoc-gia/${item.slug}`} className='hover:text-primary'>
                                        {item.name}
                                    </Link>
                                </Fragment>
                            ))}
                        </li>
                        <li>
                            <span className='mr-1 text-muted-foreground whitespace-nowrap'>Chất lượng:</span>
                            <span>
                                {data.item.lang}+{data.item.quality}
                            </span>
                        </li>

                        <li>
                            <span className='mr-1 text-muted-foreground whitespace-nowrap'>Thể loại:</span>
                            {data.item.category.map((item, index) => (
                                <Fragment key={item.slug}>
                                    {index === 0 ? '' : ', '}
                                    <Link to={`/the-loai/${item.slug}`} className='hover:text-primary'>
                                        {item.name}
                                    </Link>
                                </Fragment>
                            ))}
                        </li>
                    </ul>

                    <div className='mt-2 text-lg font-medium'>Diễn viên</div>
                    <div className='text-muted-foreground'>{data.item.actor.join(', ')}</div>

                    <div className='flex items-center mt-6'>
                        <StarIcon strokeWidth={0} className='fill-yellow-400' />
                        <span className='ml-1 text-2xl font-medium'>{data.item.tmdb.vote_average}</span>
                        <span className='ml-2 text-xl text-muted-foreground'>({data.item.tmdb.vote_count} lượt)</span>
                    </div>

                    <div className='flex items-center gap-3 mt-4'>
                        {data.item.episode_current !== 'Trailer' && (
                            <Button asChild>
                                <Link to={`/watch/${data.item.slug}`}>
                                    <PlayCircleIcon size={16} />
                                    Xem phim
                                </Link>
                            </Button>
                        )}

                        {data.item.trailer_url && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button type='button' variant='outline'>
                                        <TvMinimalPlayIcon size={16} />
                                        Trailer
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='p-2 sm:max-w-xl md:max-w-2xl'>
                                    <div className='pt-8'>
                                        <iframe
                                            src={data.item.trailer_url.replace('watch?v=', 'embed/')}
                                            title='YouTube video player'
                                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                            referrerPolicy='strict-origin-when-cross-origin'
                                            allowFullScreen
                                            className='w-full aspect-video'
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>
            </div>

            {/* Episodes */}
            {data.item.episode_current !== 'Trailer' && (
                <div className='mt-8 space-y-2'>
                    {episodes.map((episode) => (
                        <SectionEpisode key={episode.server_name} episode={episode} />
                    ))}
                </div>
            )}

            {/* Description */}
            <h3 className='mt-4 text-xl font-bold text-primary underline underline-offset-8'>Nội dung phim</h3>
            <div
                className='p-2 mt-6 bg-card rounded-sm text-muted-foreground'
                dangerouslySetInnerHTML={{ __html: data.item.content }}
            ></div>
        </div>
    );
}

export default DetailPage;
