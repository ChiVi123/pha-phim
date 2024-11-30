import { useLoaderData } from 'react-router-dom';

import { Button } from '~components-ui/button';
import { HTTPResponse } from '~core/http';
import { IFilmEntity } from '~modules/film';

function DetailPage() {
    const loader = useLoaderData() as HTTPResponse<IFilmEntity>;

    return (
        <>
            <h1>{loader.data.item.name}</h1>
            <div className='card'>
                {loader.data.item.episodes[0].server_data.map((ep) => (
                    <Button key={ep.filename} type='button'>
                        {ep.slug}
                    </Button>
                ))}
                <p className='text-muted-foreground'>{loader.data.item.content}</p>
            </div>
        </>
    );
}

export default DetailPage;
