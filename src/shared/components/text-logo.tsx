import { Link } from 'react-router-dom';
import { cn } from '~utils';

interface IProps {
    classes?: {
        h1?: string;
        span?: string;
    };
}

function TextLogo({ classes }: IProps) {
    return (
        <Link to='/' className='select-none'>
            <h1 className={cn('text-lg font-bold text-primary', classes?.h1)}>
                Ph<span className={cn('text-red-400 animate-pulse', classes?.span)}>a</span> Ph
                <span className={cn('text-red-400 animate-pulse', classes?.span)}>i</span>m
            </h1>
        </Link>
    );
}

export default TextLogo;
