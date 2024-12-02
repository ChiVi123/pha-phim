import { Link } from 'react-router-dom';
import { Button } from '~components-ui/button';

function HomePage() {
    return (
        <>
            <img src='https://th.bing.com/th/id/OIP.6FXAvwBU96OA8QL46qdF7wHaJQ?rs=1&pid=ImgDetMain' alt='ronaldo' />

            <Button asChild variant='link'>
                <Link to='/dan-da-dan'>Dan Da Dan</Link>
            </Button>
            <p className='text-accent-foreground'>Go detail Dan Da Dan</p>
        </>
    );
}

export default HomePage;
