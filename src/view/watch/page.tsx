import Hls from 'hls.js';
import { PlayIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~components-ui/accordion';
import { Button } from '~components-ui/button';
import Breadcrumb from '~components/breadcrumb';
import MetaData from '~components/meta-data';
import SectionEpisode from '~components/section-episode';
import envConfig from '~config/env';
import { HTTPResponse } from '~core/http';
import { IFilmEntity } from '~modules/film';

function WatchPage() {
    const [searchParams] = useSearchParams();
    const { data } = useLoaderData() as HTTPResponse<IFilmEntity>;
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const episodeCurrent = searchParams.get('episode_current');
    const { item: info } = data;
    const { episodes } = info;

    const fileCurrent = useMemo(
        () =>
            episodeCurrent
                ? episodes[0].server_data.find((item) => item.slug === episodeCurrent)
                : episodes[0].server_data[0],
        [episodeCurrent, episodes]
    );

    useEffect(() => {
        if (!elementRef.current) return;
        window.scrollTo({ top: elementRef.current.offsetTop - 68, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const hls = new Hls({ debug: envConfig.DEV_MODE });

        if (isPlay && Hls.isSupported() && videoRef.current && fileCurrent) {
            hls.loadSource(fileCurrent.link_m3u8);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.ERROR, (err) => {
                console.log(err);
            });
        }
        return () => {
            // cleanup (when component destroyed or when useEffect runs twice on StrictMode)
            hls.destroy();
        };
    }, [fileCurrent, isPlay]);

    return (
        <div className='px-4 py-6 mt-header'>
            <MetaData
                metaTitle={data.seoOnPage.titleHead}
                metaDescription={data.seoOnPage.descriptionHead}
                metaType={data.seoOnPage.og_type}
                metaImage={data.seoOnPage.og_image[0]}
            />

            <Breadcrumb breadcrumb={data.breadCrumb} />

            <div
                ref={elementRef}
                className='relative flex justify-center mt-14 md:h-[calc(100vh-80px)] bg-card rounded-md'
            >
                {!isPlay && (
                    <img
                        src={'https://img.ophim.live/uploads/movies/' + info.poster_url}
                        alt={info.name}
                        className='w-full md:w-auto md:h-full object-cover opacity-60'
                    />
                )}
                {!isPlay && (
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Button
                            type='button'
                            size='icon'
                            className='size-14 rounded-full shadow-primary shadow-xl animate-bounce [&_svg]:size-6'
                            onClick={() => setIsPlay(true)}
                        >
                            <span className='sr-only'>Bắt đầu phát</span>
                            <PlayIcon className='fill-primary-foreground' />
                        </Button>
                    </div>
                )}

                {isPlay && info.episode_current !== 'Trailer' && (
                    <video ref={videoRef} controls autoPlay className='w-full md:w-auto md:h-full'></video>
                )}
                {isPlay && info.episode_current === 'Trailer' && info.trailer_url && (
                    <iframe
                        src={data.item.trailer_url.replace('watch?v=', 'embed/')}
                        title='YouTube video player'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        referrerPolicy='strict-origin-when-cross-origin'
                        allowFullScreen
                        className='w-full aspect-video'
                    />
                )}
            </div>

            {/* Episodes */}
            {info.episode_current !== 'Trailer' && (
                <div className='mt-8 space-y-2'>
                    {episodes.map((episode) => (
                        <SectionEpisode key={episode.server_name} episode={episode} />
                    ))}
                </div>
            )}

            <div className='p-2 mt-6 bg-card rounded-sm'>
                <h3 className='text-xl font-bold text-primary'>
                    {info.name} - Tập {fileCurrent?.name}
                </h3>

                <Accordion type='single' collapsible defaultValue='item-1'>
                    <AccordionItem value='item-1' className='border-b-0'>
                        <AccordionTrigger className='underline-offset-8'>Nội dung phim</AccordionTrigger>
                        <AccordionContent>
                            <div
                                dangerouslySetInnerHTML={{ __html: info.content }}
                                className='text-muted-foreground text-justify'
                            ></div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}

export default WatchPage;
