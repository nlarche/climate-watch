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
import { mean, median } from "./math";

describe("math", () => {
  it("should calculate the mean", () => {
    expect(mean([0, null, 10])).toBe(5);
    expect(mean([null, null, null])).toBe(NaN);
  });

  it("should calculate the median", () => {
    expect(median([0, null, 10])).toBe(5);
    expect(median([])).toBe(NaN);
  });
});
