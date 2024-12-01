import NavItemLink from './nav-item-link';

function SubMenu<T extends { _id: string; name: string; slug: string }>({ items }: { items: T[] }) {
    return (
        <ul className='grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-popover'>
            {items.map((data) => (
                <NavItemLink key={data._id} to={`/list/${data.slug}`}>
                    {data.name}
                </NavItemLink>
            ))}
        </ul>
    );
}

export default SubMenu;
