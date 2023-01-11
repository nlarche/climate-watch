import {
  MathCollection,
  MathType,
  mean as mathMean,
  median as mathMedian,
} from "mathjs";

function isNotNull(data: number | null): data is number {
  return data != null;
}

function sanitizeData(
  data: (number | null)[],
  calculationFn: { (sanitizedData: number[]): number }
) {
  const sanitizedData = data.filter(isNotNull);
  return sanitizedData.length ? calculationFn(sanitizedData) : NaN;
}

export function mean(data: (number | null)[]): number {
  return sanitizeData(data, mathMean);
}

export function median(data: (number | null)[]): number {
  return sanitizeData(data, mathMedian);
}
