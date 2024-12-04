import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '~components-ui/button';
import { Episode } from '~modules/film';

interface IProps {
    episode: Episode;
}
function SectionEpisode({ episode }: IProps) {
    const [searchParams] = useSearchParams();
    const { slug } = useParams();
    const episodeCurrent = searchParams.get('episode_current') ?? '1';

    return (
        <div key={episode.server_name}>
            <div className='w-fit px-4 py-2 bg-card rounded-t-sm'>{episode.server_name}</div>
            <div className='flex flex-wrap items-center gap-2 px-4 py-2 bg-card rounded-tr-sm rounded-b-sm'>
                {episode.server_data.map((data) => (
                    <Button
                        key={data.filename}
                        asChild
                        type='button'
                        variant={episodeCurrent === data.slug ? 'default' : 'secondary'}
                    >
                        <Link to={{ pathname: `/watch/${slug}`, search: `?episode_current=${data.slug}` }}>
                            {data.slug}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default SectionEpisode;
