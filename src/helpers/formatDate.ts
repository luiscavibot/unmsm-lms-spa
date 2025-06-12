import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(dateString: string): string {
  const date = dayjs.utc(dateString).local().locale('es');
  return date.format('DD/MM/YYYY');
}

export function formatFullDateInPeru(dateString: string): string {
  const date = dayjs(dateString);
  if (!date.isValid()) {
    return '';
  }
  return date.tz('America/Lima').locale('es').format('DD [de] MMMM [de] YYYY, HH:mm:ss');
}

/**
 * Formatea fechas de horario en formato personalizado: "Día DD-MM / HH:MM - HH:MM"
 * @param startDateTime Fecha y hora de inicio en formato ISO 8601
 * @param endDateTime Fecha y hora de fin en formato ISO 8601
 * @returns Cadena formateada como "Miércoles 11-06 / 08:00 - 13:00"
 */
export function formatScheduleDate(startDateTime: string, endDateTime: string): string {
  // Parsear las fechas como UTC y convertirlas explícitamente a la zona horaria local del navegador
  const startDate = dayjs.utc(startDateTime).local().locale('es');
  const endDate = dayjs.utc(endDateTime).local().locale('es');
  
  if (!startDate.isValid() || !endDate.isValid()) {
    return 'Fecha inválida';
  }
  
  // Capitalizar la primera letra del día de la semana
  const weekDay = startDate.format('dddd');
  const capitalizedWeekDay = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
  
  // Formatear la fecha como DD-MM
  const formattedDate = startDate.format('DD-MM');
  
  // Formatear las horas como HH:MM
  const startTime = startDate.format('HH:mm');
  const endTime = endDate.format('HH:mm');
  
  return `${capitalizedWeekDay} ${formattedDate} / ${startTime} - ${endTime}`;
}
