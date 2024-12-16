import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumb, CardFilm, MetaData, Pagination } from '~components';
import { ListFilmResponse, searchFilm } from '~modules/film';

type ListFilmData = ListFilmResponse['data'];

function SearchPage() {
    const [searchParams] = useSearchParams();
    const [listResult, setListResult] = useState<ListFilmData>();

    const keyword = searchParams.get('keyword');
    const pageNumberParam = Number(searchParams.get('page_number') ?? 1);

    useEffect(() => {
        const controller = new AbortController();
        searchFilm(controller.signal, { keyword, page: pageNumberParam }).then((result) => setListResult(result.data));
        return () => controller.abort();
    }, [keyword, pageNumberParam]);

    return (
        <div className='px-2 sm:px-4 py-6 mt-header'>
            <MetaData
                metaTitle={listResult?.seoOnPage.titleHead}
                metaDescription={listResult?.seoOnPage.descriptionHead}
                metaType={listResult?.seoOnPage.og_type}
            />

            <Breadcrumb breadcrumb={listResult?.breadCrumb ?? []} />

            <h2 className='pb-[2px] mt-8 border-b-2 text-2xl font-medium text-primary underline underline-offset-8'>
                {listResult?.titlePage}
            </h2>

            <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-2'>
                {listResult &&
                    listResult.items.map((item) => (
                        <CardFilm key={item._id} item={item} domainCDNImage={listResult.APP_DOMAIN_CDN_IMAGE} />
                    ))}
            </div>

            <div className='mt-8'>
                {listResult && <Pagination searchParams={searchParams} pagination={listResult.params.pagination} />}
            </div>
        </div>
    );
}

export default SearchPage;
