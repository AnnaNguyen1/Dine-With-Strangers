const { format } = require("date-fns");

export function FormatDate(date) {
  return format(new Date(date * 1), "do MMM yyyy");
}
