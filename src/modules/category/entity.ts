export interface ICategoryEntity {
    _id: string;
    name: string;
    slug: string;
}
export interface ICategoryEmbed extends Omit<ICategoryEntity, '_id'> {
    id: string;
}
