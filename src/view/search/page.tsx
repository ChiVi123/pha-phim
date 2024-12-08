import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumb, CardFilm, Pagination } from '~components';
import { ListFilmResponse, searchFilm } from '~modules/film';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const [listResponse, setListResponse] = useState<ListFilmResponse>();

    const keyword = searchParams.get('keyword');
    const pageNumberParam = Number(searchParams.get('page_number') ?? 1);

    useEffect(() => {
        const controller = new AbortController();

        (async function () {
            const result = await searchFilm(controller.signal, { keyword, page: pageNumberParam });
            setListResponse(result);
        })();

        return () => {
            controller.abort();
        };
    }, [keyword, pageNumberParam]);

    return (
        <div className='px-2 sm:px-4 py-6 mt-[50px]'>
            <Breadcrumb breadcrumb={listResponse?.data.breadCrumb ?? []} />

            <h2 className='pb-[2px] mt-8 border-b-2 text-2xl font-medium text-primary underline underline-offset-8'>
                {listResponse?.data.titlePage}
            </h2>

            <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-2'>
                {listResponse &&
                    listResponse.data.items.map((item) => (
                        <CardFilm key={item._id} item={item} domainCDNImage={listResponse.data.APP_DOMAIN_CDN_IMAGE} />
                    ))}
            </div>

            <div className='mt-8'>
                {listResponse && (
                    <Pagination searchParams={searchParams} pagination={listResponse.data.params.pagination} />
                )}
            </div>
        </div>
    );
}

export default SearchPage;
