import { useLoaderData } from 'react-router-dom';

import '~css/app.css';

import { HTTPResponse } from '~core/http';
import { IFilmEntity } from '~modules/film';

function DetailPage() {
    const loader = useLoaderData() as HTTPResponse<IFilmEntity>;

    return (
        <>
            <h1>{loader.data.item.name}</h1>
            <div className='card'>
                {loader.data.item.episodes[0].server_data.map((ep) => (
                    <button key={ep.filename} type='button'>
                        {ep.slug}
                    </button>
                ))}
                <p>{loader.data.item.content}</p>
            </div>
        </>
    );
}

export default DetailPage;
