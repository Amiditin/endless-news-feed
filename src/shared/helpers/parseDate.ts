import dayjs from 'dayjs';

export const parseDate = (date: string) => (date ? dayjs(date).format('DD.MM HH:mm') : null);
