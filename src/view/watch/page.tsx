import Hls from 'hls.js';
import { PlayIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import { Breadcrumb, SectionEpisode } from '~components';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~components-ui/accordion';
import { Button } from '~components-ui/button';
import envConfig from '~config/env';
import { HTTPResponse } from '~core/http';
import { IFilmEntity } from '~modules/film';

function WatchPage() {
    const [searchParams] = useSearchParams();
    const { data } = useLoaderData() as HTTPResponse<IFilmEntity>;
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const episodeCurrent = searchParams.get('episode_current') ?? '1';
    const { item: info } = data;
    const { episodes } = info;

    const fileCurrent = useMemo(
        () => episodes[0].server_data.find((item) => item.slug === episodeCurrent),
        [episodeCurrent, episodes]
    );

    useEffect(() => {
        document.title = 'PhaPhim | ' + data.seoOnPage.titleHead;
        return () => {
            document.title = 'PhaPhim';
        };
    }, [data.seoOnPage.titleHead]);

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
        <div className='px-4 py-6 mt-[50px]'>
            <Breadcrumb breadcrumb={data.breadCrumb} />

            <div className='relative flex justify-center mt-14 md:h-[calc(100vh-80px)] bg-card rounded-md'>
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
                {isPlay && <video ref={videoRef} controls autoPlay className='w-full md:w-auto md:h-full'></video>}
            </div>

            <div className='p-2 mt-6 bg-card rounded-sm'>
                <Link to={`/${data.item.slug}`}>
                    <h3 className='text-xl font-bold text-primary'>{fileCurrent?.filename}</h3>
                </Link>

                <Accordion type='single' collapsible>
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

            {/* Episodes */}
            <div className='mt-8 space-y-2'>
                {episodes.map((episode) => (
                    <SectionEpisode key={episode.server_name} episode={episode} />
                ))}
            </div>
        </div>
    );
}

export default WatchPage;
