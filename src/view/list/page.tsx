import { FormEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumb, CardFilm, Pagination } from '~components';
import { Button } from '~components-ui/button';
import { Label } from '~components-ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~components-ui/select';
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
    const [listResponse, setListResponse] = useState<ListFilmResponse>();
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
        (async function () {
            const result = await getListFilm(controller.signal, `${typeParam}/${slug}`, {
                category: categoryParam === VALUE_ALL ? undefined : categoryParam,
                country: countryParam === VALUE_ALL ? undefined : countryParam,
                year: yearParam === VALUE_ALL ? undefined : yearParam,
                sort_field: sortFieldParam,
                page: pageNumberParam,
            });
            setListResponse(result);
        })();
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
        <div className='px-2 sm:px-4 py-6 mt-[50px]'>
            <Breadcrumb breadcrumb={listResponse?.data.breadCrumb ?? []} />

            <form
                id='form-list'
                className='flex flex-wrap items-end gap-4 p-2 mt-8 bg-card rounded'
                onSubmit={handleSubmit}
            >
                <div className='flex-grow flex flex-col gap-2'>
                    <Label htmlFor=':list:filter-type-film' className='pl-1'>
                        Loại phim:
                    </Label>
                    <Select
                        name='type'
                        value={paramsObject.type}
                        onValueChange={(value) => handleSelectChange('type', value)}
                    >
                        <SelectTrigger id=':list:filter-type-film'>
                            <SelectValue placeholder='Chọn loại phim...' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={VALUE_ALL}>- Tất cả -</SelectItem>
                            <SelectItem value='/danh-sach/phim-le'>Phim Lẻ</SelectItem>
                            <SelectItem value='/danh-sach/phim-bo'>Phim Bộ</SelectItem>
                            <SelectItem value='/danh-sach/tv-shows'>TV Shows</SelectItem>
                            <SelectItem value='/danh-sach/hoat-hinh'>Hoạt Hình</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex-grow flex flex-col gap-2'>
                    <Label htmlFor=':list:filter-category-film' className='pl-1'>
                        Thể loại:
                    </Label>
                    <Select
                        name='category'
                        value={paramsObject.category}
                        onValueChange={(value) => handleSelectChange('category', value)}
                    >
                        <SelectTrigger id=':list:filter-category-film'>
                            <SelectValue placeholder='Chọn thể loại...' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={VALUE_ALL}>- Tất cả -</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={'the-loai_' + category.slug} value={category.slug}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex-grow flex flex-col gap-2'>
                    <Label htmlFor=':list:filter-country-film' className='pl-1'>
                        Quốc gia:
                    </Label>
                    <Select
                        name='country'
                        value={paramsObject.country}
                        onValueChange={(value) => handleSelectChange('country', value)}
                    >
                        <SelectTrigger id=':list:filter-country-film'>
                            <SelectValue placeholder='Chọn quốc gia...' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={VALUE_ALL}>- Tất cả -</SelectItem>
                            {countries.map((country) => (
                                <SelectItem key={'quoc-gia_' + country.slug} value={country.slug}>
                                    {country.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex-grow flex flex-col gap-2'>
                    <Label htmlFor=':list:filter-year-film' className='pl-1'>
                        Năm:
                    </Label>
                    <Select
                        name='year'
                        value={paramsObject.year}
                        onValueChange={(value) => handleSelectChange('year', value)}
                    >
                        <SelectTrigger id=':list:filter-year-film'>
                            <SelectValue placeholder='Chọn theo năm...' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={VALUE_ALL}>- Tất cả -</SelectItem>
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

                <div className='flex-grow flex flex-col gap-2'>
                    <Label htmlFor=':list:sort-film' className='pl-1'>
                        Sắp xếp:
                    </Label>
                    <Select
                        name='sort_field'
                        value={paramsObject.sort_field}
                        onValueChange={(value) => handleSelectChange('sort_field', value)}
                    >
                        <SelectTrigger id=':list:sort-film'>
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

export default ListPage;
