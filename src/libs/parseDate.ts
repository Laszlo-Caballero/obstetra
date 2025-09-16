import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function parseDate(date: string) {
  return format(new Date(date), 'dd MMM yyyy', { locale: es });
}
