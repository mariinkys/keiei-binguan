import moment from "moment";

export function customFormatDate(date: Date, format?: string): string {
   return moment(date).format(format ?? "DD/MM/yyyy")
}