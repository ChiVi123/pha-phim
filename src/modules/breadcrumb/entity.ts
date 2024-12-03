export interface IBreadcrumbEntity {
    name: string;
    slug: string;
    position: number;
}
type BreadCrumbLink = {
    name: string;
    slug: string;
    position: number;
};
type BreadCrumbCurrent = {
    name: string;
    isCurrent: true;
    position: number;
};
export type BreadcrumbEntity = BreadCrumbLink | BreadCrumbCurrent;
