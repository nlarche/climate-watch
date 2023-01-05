import {
  addDays,
  addYears,
  endOfMonth,
  format,
  isAfter,
  startOfDay,
  startOfMonth,
} from "date-fns";

export function formatToISO8601(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function firstDayOfMonth(date: Date): Date {
  return startOfMonth(date);
}

export function lastYear(date: Date): Date {
  return addYears(date, -1);
}

export function tenYearBefore(date: Date): Date {
  return addYears(date, -10);
}

export function fiftyYearBefore(date: Date): Date {
  return addYears(date, -50);
}

export function lastDayOfMonth(date: Date): Date {
  return endOfMonth(date);
}

export function yesterdayOrLastDayOfMonth(date: Date): Date {
  const yesterday = addDays(new Date(), -1);
  if (isAfter(startOfDay(yesterday), startOfDay(date))) {
    return lastDayOfMonth(date);
  } else {
    return yesterday;
  }
}
