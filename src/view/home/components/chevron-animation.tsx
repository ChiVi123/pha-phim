import { cn } from '~utils';

interface IProps {
    disabledAnimation?: boolean;
}

function ChevronAnimation({ disabledAnimation }: IProps) {
    const base = 'w-4 h-0 invisible opacity-0 group-hover:visible group-hover:opacity-100';
    const shapeTop = 'border-x-transparent border-t-primary border-x-2 border-t-2';
    const shapeBottom = 'border-x-transparent border-b-primary border-x-2 border-b-2';
    const animation = 'transition-[transform,visibility,opacity] duration-1000';

    return (
        <>
            {disabledAnimation ? (
                <div className='flex flex-col justify-between size-[10px] bg-background'>
                    <div className='w-4 h-0 border-x-transparent border-t-primary border-x-2 border-t-2 rotate-[36deg]'></div>
                    <div className='w-4 h-0 border-x-transparent border-b-primary border-x-2 border-b-2 -rotate-[36deg]'></div>
                </div>
            ) : (
                <div className='flex flex-col justify-between size-[10px]'>
                    <div className={cn(base, shapeTop, animation, 'delay-300 group-hover:rotate-[756deg]')}></div>
                    <div className={cn(base, shapeBottom, animation, 'delay-500 group-hover:-rotate-[756deg]')}></div>
                </div>
            )}
        </>
    );
}

export default ChevronAnimation;
