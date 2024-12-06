export interface IBreadcrumbEntity {
    name: string;
    slug: string;
    position: number;
}
type BreadCrumbLink = {
    type: 'link';
    name: string;
    slug: string;
    position: number;
};
type BreadCrumbCurrent = {
    type: 'current';
    name: string;
    isCurrent: true;
    position: number;
};
export type BreadcrumbEntity = BreadCrumbLink | BreadCrumbCurrent;
