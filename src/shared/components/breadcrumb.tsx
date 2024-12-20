import { HomeIcon } from 'lucide-react';
import { ComponentPropsWithoutRef, forwardRef, Fragment, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Breadcrumb as BreadcrumbUI,
} from '~components-ui/breadcrumb';
import { BreadcrumbEntity } from '~modules/breadcrumb';

type BreadcrumbPropsWithoutRef = ComponentPropsWithoutRef<'nav'> & {
    breadcrumb: BreadcrumbEntity[];
    separator?: ReactNode;
};
const Breadcrumb = forwardRef<HTMLElement, BreadcrumbPropsWithoutRef>(({ breadcrumb, ...props }, forwardRef) => (
    <BreadcrumbUI ref={forwardRef} {...props}>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to='/' className='flex items-center gap-1'>
                        <HomeIcon size={14} />
                        Trang chủ
                    </Link>
                </BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumb.map((br) => (
                <Fragment key={br.name}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        {'slug' in br ? (
                            <BreadcrumbLink asChild>
                                <Link to={br.slug}>{br.name}</Link>
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage>{br.name}</BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                </Fragment>
            ))}
        </BreadcrumbList>
    </BreadcrumbUI>
));

export default Breadcrumb;
