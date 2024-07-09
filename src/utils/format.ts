import { format, parseISO } from 'date-fns';

export const formatDateTime = (isoString: string): string => {
    const date = parseISO(isoString);
    return format(date, 'yyyy-MM-dd, HH:mm:ss');
};