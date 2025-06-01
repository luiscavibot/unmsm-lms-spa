import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(dateString: string): string {
  return dayjs(dateString).format('DD/MM/YYYY');
}

export function formatFullDateInPeru(dateString: string): string {
  return dayjs(dateString).tz('America/Lima').locale('es').format('DD [de] MMMM [de] YYYY, HH:mm:ss');
}
