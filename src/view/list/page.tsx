import { FormEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '~components-ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~components-ui/select';
import Breadcrumb from '~components/breadcrumb';
import CardFilm from '~components/card-film';
import MetaData from '~components/meta-data';
import Pagination from '~components/pagination';
import { categorySelector } from '~modules/category';
import { countrySelector } from '~modules/country';
import { getListFilm, ListFilmResponse } from '~modules/film';

type ParamsObject = {
    type: string;
    category: string;
    country: string;
    year: string;
    sort_field: string;
};
type ListFilmData = ListFilmResponse['data'];

const VALUE_ALL = 'all';
const VALUE_SORT_MODIFIED = 'modified.time';
const initialParamsObject: ParamsObject = {
    type: VALUE_ALL,
    category: VALUE_ALL,
    country: VALUE_ALL,
    year: VALUE_ALL,
    sort_field: VALUE_SORT_MODIFIED,
};

function ListPage() {
    const [searchParams] = useSearchParams();
    const { type: typeParam, slug } = useParams();
    const [listResult, setListResult] = useState<ListFilmData>();
    const [paramsObject, setParamsObject] = useState<ParamsObject>(initialParamsObject);
    const categories = useSelector(categorySelector.data);
    const countries = useSelector(countrySelector.data);
    const navigate = useNavigate();

    const categoryParam = searchParams.get('category');
    const countryParam = searchParams.get('country');
    const yearParam = searchParams.get('year');
    const sortFieldParam = searchParams.get('sort_field');
    const pageNumberParam = Number(searchParams.get('page_number') ?? 1);

    useEffect(() => {
        let type = VALUE_ALL;
        let category = categoryParam ?? VALUE_ALL;
        let country = countryParam ?? VALUE_ALL;

        switch (typeParam) {
            case 'danh-sach':
                type = `/${typeParam}/${slug}`;
                break;

            case 'the-loai':
                category = slug ?? VALUE_ALL;
                country = countryParam ?? VALUE_ALL;
                break;

            case 'quoc-gia':
                category = categoryParam ?? VALUE_ALL;
                country = slug ?? VALUE_ALL;
                break;

            default:
                break;
        }

        setParamsObject({
            type,
            category,
            country,
            year: yearParam ?? VALUE_ALL,
            sort_field: sortFieldParam ?? VALUE_SORT_MODIFIED,
        });
    }, [categoryParam, countryParam, slug, sortFieldParam, typeParam, yearParam]);

    useEffect(() => {
        const controller = new AbortController();
        getListFilm(controller.signal, `${typeParam}/${slug}`, {
            category: categoryParam === VALUE_ALL ? undefined : categoryParam,
            country: countryParam === VALUE_ALL ? undefined : countryParam,
            year: yearParam === VALUE_ALL ? undefined : yearParam,
            sort_field: sortFieldParam,
            page: pageNumberParam,
        }).then((result) => setListResult(result.data));
        return () => controller.abort();
    }, [categoryParam, countryParam, pageNumberParam, slug, sortFieldParam, typeParam, yearParam]);

    const handleSelectChange = (key: keyof ParamsObject, value: string) => {
        if (key === 'category' && categories.length === 0) {
            return;
        }
        if (key === 'country' && countries.length === 0) {
            return;
        }
        setParamsObject((prev) => ({ ...prev, [key]: value }));
    };
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const year = paramsObject.year;
        const sort_field = paramsObject.sort_field;

        if (paramsObject.type !== VALUE_ALL) {
            navigate({
                pathname: paramsObject.type,
                search: createSearchParams({
                    category: paramsObject.category,
                    country: paramsObject.country,
                    year,
                    sort_field,
                }).toString(),
            });
            return;
        }

        const param: Record<string, string> = {};
        let pathname: string = '';

        switch (typeParam) {
            case 'the-loai':
                pathname = `/${typeParam}/${paramsObject.category}`;
                param.country = paramsObject.country;
                break;
            case 'quoc-gia':
                pathname = `/${typeParam}/${paramsObject.country}`;
                param.category = paramsObject.category;
                break;
            default:
                break;
        }

        navigate({
            pathname,
            search: createSearchParams({
                ...param,
                year,
                sort_field,
            }).toString(),
        });
    };

    return (
        <div className='px-2 sm:px-4 py-6 mt-header'>
            <MetaData
                metaTitle={listResult?.seoOnPage.titleHead}
                metaDescription={listResult?.seoOnPage.descriptionHead}
                metaType={listResult?.seoOnPage.og_type}
            />

            <Breadcrumb breadcrumb={listResult?.breadCrumb ?? []} />

            <form
                id='form-list'
                className='flex flex-wrap items-end gap-1 sm:gap-4 p-2 mt-8 bg-card rounded'
                onSubmit={handleSubmit}
            >
                <div className='flex-grow w-full sm:w-auto'>
                    <Select
                        name='type'
                        value={paramsObject.type}
                        autoComplete='none'
                        onValueChange={(value) => handleSelectChange('type', value)}
                    >
                        <SelectTrigger title='loại phim'>
                            <SelectValue placeholder='Chọn loại phim...' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={VALUE_ALL}>- Loại phim -</SelectItem>
                            <SelectItem value='/danh-sach/phim-le'>Phim Lẻ</SelectItem>
                            <SelectItem value='/danh-sach/phim-bo'>Phim Bộ</SelectItem>
                            <SelectItem value='/danh-sach/tv-shows'>TV Shows</SelectItem>
                            <SelectItem value='/danh-sach/hoat-hinh'>Hoạt Hình</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex-grow w-full sm:w-auto'>
                    <Select
                        name='category'
                        value={paramsObject.category}
                        autoComplete='none'
                        onValueChange={(value) => handleSelectChange('category', value)}
                    >
                        <SelectTrigger title='thể loại'>
                            <SelectValue placeholder='Chọn thể loại...' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={VALUE_ALL}>- Thể loại -</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={'the-loai_' + category.slug} value={category.slug}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex-grow w-full sm:w-auto'>
                    <Select
                        name='country'
                        value={paramsObject.country}
                        autoComplete='none'
                        onValueChange={(value) => handleSelectChange('country', value)}
                    >
                        <SelectTrigger title='quốc gia'>
                            <SelectValue placeholder='Chọn quốc gia...' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={VALUE_ALL}>- Quốc gia -</SelectItem>
                            {countries.map((country) => (
                                <SelectItem key={'quoc-gia_' + country.slug} value={country.slug}>
                                    {country.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex-grow w-full sm:w-auto'>
                    <Select
                        name='year'
                        value={paramsObject.year}
                        autoComplete='none'
                        onValueChange={(value) => handleSelectChange('year', value)}
                    >
                        <SelectTrigger title='năm sản xuất'>
                            <SelectValue placeholder='Chọn theo năm...' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={VALUE_ALL}>- Năm sản xuất -</SelectItem>
                            {Array.from(
                                { length: new Date().getFullYear() - 1914 + 1 },
                                (_, i) => new Date().getFullYear() - i
                            ).map((item) => (
                                <SelectItem key={'year-' + item} value={item.toString()}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex-grow w-full sm:w-auto'>
                    <Select
                        name='sort_field'
                        value={paramsObject.sort_field}
                        autoComplete='none'
                        onValueChange={(value) => handleSelectChange('sort_field', value)}
                    >
                        <SelectTrigger title='sắp xếp'>
                            <SelectValue placeholder='Chọn sắp xếp...' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='modified.time'>Thời gian cập nhật</SelectItem>
                            <SelectItem value='created.time'>Thời gian đăng</SelectItem>
                            <SelectItem value='year'>Năm sản xuất</SelectItem>
                            <SelectItem value='view'>Lượt xem</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button type='submit'>Duyệt phim</Button>
            </form>

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

export default ListPage;
