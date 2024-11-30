export interface ICountryEntity {
    _id: string;
    name: string;
    slug: string;
}
export interface ICountryEmbed extends Omit<ICountryEntity, '_id'> {
    id: string;
}
