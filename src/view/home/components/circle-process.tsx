import { cn } from '~utils';

interface ICircleProcessProps {
    value: number;
    maxValue?: number;
    className?: string;
}

const PI = 3.1416;

function CircleProcess({ value, maxValue = 10, className }: ICircleProcessProps) {
    return (
        <div className={cn('relative size-12 rounded-full', className)}>
            <svg className='relative size-full -rotate-90 drop-shadow-[1px_2px_4px_rgb(255_255_255/0.6)]'>
                <circle
                    className='size-full fill-transparent stroke-card stroke-2'
                    cx='50%'
                    cy='50%'
                    r='32%'
                    strokeLinecap='round'
                />
                <circle
                    className='size-full fill-transparent stroke-primary stroke-2'
                    cx='50%'
                    cy='50%'
                    r='32%'
                    strokeLinecap='round'
                    strokeDasharray={`calc(48 * 0.32 * 2 * ${PI})`}
                    strokeDashoffset={`calc(48 * 0.32 * 2 * ${PI} - (48 * 0.32 * 2 * ${PI} * ${value}) / ${maxValue})`}
                />
            </svg>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <h2 className='text-sm leading-none font-bold shadow-gray-800 text-shadow-sm'>{value}</h2>
            </div>
        </div>
    );
}

export default CircleProcess;
