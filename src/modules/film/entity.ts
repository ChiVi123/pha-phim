import { HTTPResponse } from '~core/http';
import { BreadcrumbEntity } from '~modules/breadcrumb';
import { ICategoryEmbed } from '~modules/category';
import { ICountryEmbed } from '~modules/country';
import { ISEOEntity } from '~modules/seo';

export type Episode = {
    server_name: string;
    server_data: { name: string; slug: string; filename: string; link_embed: string; link_m3u8: string }[];
};

export interface IFilmEntity {
    seoOnPage: ISEOEntity;
    breadCrumb: BreadcrumbEntity[];
    params: Record<string, string>;
    item: {
        created: {
            time: string;
        };
        modified: {
            time: string;
        };
        _id: string;
        name: string;
        origin_name: string;
        content: string;
        type: string;
        status: string;
        thumb_url: string;
        poster_url: string;
        is_copyright: boolean;
        sub_docquyen: boolean;
        chieurap: boolean;
        trailer_url: string;
        time: string;
        episode_current: string;
        episode_total: string;
        quality: string;
        lang: string;
        notify: string;
        showtimes: string;
        slug: string;
        year: number;
        view: number;
        actor: string[];
        director: string[];
        category: ICategoryEmbed[];
        country: ICountryEmbed[];
        episodes: Episode[];
        tmdb: {
            type: string;
            id: string;
            season: number;
            vote_average: number;
            vote_count: number;
        };
    };
}
export interface IFilmItem {
    created: {
        time: string;
    };
    modified: {
        time: string;
    };
    _id: string;
    category: ICategoryEmbed[];
    chieurap: boolean;
    country: ICountryEmbed[];
    episode_current: string;
    lang: string;
    name: string;
    origin_name: string;
    poster_url: string;
    quality: string;
    slug: string;
    sub_docquyen: boolean;
    thumb_url: string;
    time: string;
    type: string;
    view: number;
    year: number;
    tmdb: {
        type: string;
        id: string;
        season: number;
        vote_average: number;
        vote_count: number;
    };
}
export type FilmResponse = HTTPResponse<IFilmEntity>;
export type ListFilmResponse = HTTPResponse<{
    APP_DOMAIN_CDN_IMAGE: string;
    breadCrumb: BreadcrumbEntity[];
    items: IFilmItem[];
    titlePage: string;
    type_list: FilmType;
    params: {
        filterCategory: string[];
        filterCountry: string[];
        filterType: string;
        filterYear: string;
        pagination: { totalItems: number; totalItemsPerPage: number; currentPage: number; pageRanges: number };
        slug: string;
        sortField: string;
        sortType: string;
        type_slug: string;
    };
    seoOnPage: ISEOEntity;
}>;
