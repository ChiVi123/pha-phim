import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '~components-ui/button';
import { ScrollArea } from '~components-ui/scroll-area';
import { Episode } from '~modules/film';

interface IProps {
    episode: Episode;
}
function SectionEpisode({ episode }: IProps) {
    const [searchParams] = useSearchParams();
    const { slug } = useParams();
    const episodeCurrent = searchParams.get('episode_current');

    const isActive = (dataSlug: string, index: number): 'default' | 'secondary' => {
        if (!episodeCurrent) return index === 0 ? 'default' : 'secondary';
        return episodeCurrent === dataSlug ? 'default' : 'secondary';
    };

    return (
        <div>
            <div className='w-fit px-4 py-2 bg-card rounded-t-sm'>{episode.server_name}</div>
            <ScrollArea className='h-[300px]'>
                <div className='flex flex-wrap items-center gap-2 px-4 py-2 bg-card rounded-tr-sm rounded-b-sm'>
                    {episode.server_data.map((data, index) => (
                        <Button
                            key={data.name + '-' + index}
                            title={data.name}
                            asChild
                            variant={isActive(data.slug, index)}
                        >
                            <Link to={{ pathname: `/watch/${slug}`, search: `?episode_current=${data.slug}` }}>
                                {data.slug}
                            </Link>
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

export default SectionEpisode;
