import { Link } from 'react-router-dom';
import { Button } from '~components-ui/button';

function HomePage() {
    return (
        <>
            <Button asChild variant='link'>
                <Link to='/dan-da-dan'>Dan Da Dan</Link>
            </Button>
            <p className='text-accent-foreground'>Go detail Dan Da Dan</p>
        </>
    );
}

export default HomePage;
