import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateSchema(Fecha: Date = new Date(), Tipo: number = 1) {

  try {
      Fecha = typeof Fecha === 'string' ? new Date(Fecha) : Fecha;
      let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      let y = Fecha.getFullYear();
      let m = Fecha.getMonth() + 1;
      let d = Fecha.getDate();

      let h = Fecha.getHours();
      let mi = Fecha.getMinutes();
      let s = Fecha.getSeconds();

      let am = h > 11 ? false : true;

      let h2 = h > 12 ? h - 12 : h;

      let result = '';

      switch (Tipo) {
          case 1:
              result = Fecha.toISOString();
              break;
          case 2:
              result = `${(d < 10 ? '0' : '') + d}/${(m < 10 ? '0' : '') + m}/${y} ${(h < 10 ? '0' : '') + h}:${(mi < 10 ? '0' : '') + mi}:${(s < 10 ? '0' : '') + s}`;
              break;
          case 3:
              result = `${(d < 10 ? '0' : '') + d}/${(m < 10 ? '0' : '') + m}/${y}`;
              break;
          case 4:
              result = `${(d < 10 ? '0' : '') + d} de ${meses[m - 1]} del ${y}`;
              break;
          case 5:
              result = `${(d < 10 ? '0' : '') + d}/${(m < 10 ? '0' : '') + m}/${y} ${(h2 < 10 ? '0' : '') + h2}:${(mi < 10 ? '0' : '') + mi} ${am ? 'AM' : 'PM'}`;
              break;
          case 6:
              result = `${y}-${(m < 10 ? '0' : '') + m}-${(d < 10 ? '0' : '') + d}`;
              break;
          case 7:
              result = `${(d < 10 ? '0' : '') + d} de ${meses[m - 1]}`;
              break;
          default:
              return ''
      }
      return result;
  } catch (error) {
      return '';
  }
}