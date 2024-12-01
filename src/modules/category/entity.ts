import { HTTPResponse } from '~core/http';

export interface ICategoryEntity {
    _id: string;
    name: string;
    slug: string;
}
export interface ICategoryEmbed extends Omit<ICategoryEntity, '_id'> {
    id: string;
}
export type CategoryResponse = HTTPResponse<ICategoryEntity>;
export type ListCategoryResponse = HTTPResponse<{ items: ICategoryEntity[] }>;
