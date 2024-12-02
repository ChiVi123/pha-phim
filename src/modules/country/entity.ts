import { HTTPResponse } from '~core/http';

export interface ICountryEntity {
    _id: string;
    name: string;
    slug: string;
}
export interface ICountryEmbed extends Omit<ICountryEntity, '_id'> {
    id: string;
}
export type CountryResponse = HTTPResponse<ICountryEntity>;
export type ListCountryResponse = HTTPResponse<{ items: ICountryEntity[] }>;
