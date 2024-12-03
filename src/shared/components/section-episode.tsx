import { Button } from '~components-ui/button';
import { Episode } from '~modules/film';

interface IProps {
    episode: Episode;
}
function SectionEpisode({ episode }: IProps) {
    return (
        <div key={episode.server_name}>
            <div className='w-fit px-4 py-2 bg-card rounded-t-sm'>{episode.server_name}</div>
            <div className='flex flex-wrap items-center gap-2 px-4 py-2 bg-card rounded-tr-sm rounded-b-sm'>
                {episode.server_data.map((data) => (
                    <Button key={data.filename} type='button' variant='secondary'>
                        {data.slug}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default SectionEpisode;
