import { Link } from 'react-router-dom';
import { cn } from '~utils';

interface IProps {
    classes?: {
        a?: string;
        span?: string;
    };
}

function TextLogo({ classes }: IProps) {
    return (
        <Link to='/' className={cn('text-lg font-bold text-primary whitespace-nowrap select-none', classes?.a)}>
            Ph<span className={cn('text-red-400 animate-pulse', classes?.span)}>a</span>Ph
            <span className={cn('text-red-400 animate-pulse', classes?.span)}>i</span>m
        </Link>
    );
}

export default TextLogo;
