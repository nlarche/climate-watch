import {
  fiftyYearBefore,
  firstDayOfMonth,
  formatToISO8601,
  lastDayOfMonth,
  lastYear,
  tenYearBefore,
  yesterdayOrLastDayOfMonth,
} from "./date";
import { addDays } from "date-fns";

describe("date", () => {
  it("should format a date to ISO8601 yyyy-mm-dd", () => {
    expect(formatToISO8601(new Date(2023, 0, 3))).toBe("2023-01-03");
  });

  it("should get first day of a month", () => {
    expect(formatToISO8601(firstDayOfMonth(new Date(2023, 0, 8)))).toBe(
      "2023-01-01"
    );
  });
  it("should get last day of a month", () => {
    expect(formatToISO8601(lastDayOfMonth(new Date(2023, 0, 17)))).toBe(
      "2023-01-31"
    );
  });
  it("should get yesterday if last day is in the future", () => {
    expect(formatToISO8601(yesterdayOrLastDayOfMonth(new Date()))).toBe(
      formatToISO8601(addDays(new Date(), -1))
    );
  });
  it("should get last day of month if possible", () => {
    expect(
      formatToISO8601(yesterdayOrLastDayOfMonth(new Date(2022, 0, 17)))
    ).toBe("2022-01-31");
  });
  it("should get last year", () => {
    expect(formatToISO8601(lastYear(new Date(2022, 0, 17)))).toBe("2021-01-17");
  });
  it("should get 10 year before", () => {
    expect(formatToISO8601(tenYearBefore(new Date(2022, 0, 17)))).toBe(
      "2012-01-17"
    );
  });
  it("should get 50 year before", () => {
    expect(formatToISO8601(fiftyYearBefore(new Date(2022, 0, 17)))).toBe(
      "1972-01-17"
    );
  });
});
