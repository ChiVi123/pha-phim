import { LoaderCircleIcon } from 'lucide-react';

function HydrateFallback() {
    return (
        <div className='flex items-center justify-center p-24'>
            <LoaderCircleIcon size={64} color='currentColor' className='text-primary animate-spin' />
        </div>
    );
}

export default HydrateFallback;
