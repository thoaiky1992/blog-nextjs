import { format, formatDistance } from "date-fns";
import { vi } from "date-fns/locale";

export function formatDate(date: any) {
  return format(new Date(date), "dd-MM-yyyy");
}
export function convertFormatDistance(date: any) {
  return formatDistance(new Date(date), new Date(), { locale: vi });
}
