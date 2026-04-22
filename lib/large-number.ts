const COMPACT_SUFFIXES = [
  { value: BigInt("1000000000000"), suffix: "T" },
  { value: BigInt("1000000000"), suffix: "B" },
  { value: BigInt("1000000"), suffix: "M" },
  { value: BigInt("1000"), suffix: "K" },
] as const;

export function tryParseStatisticValue(value: unknown): bigint | null {
  if (typeof value === "bigint") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value) || !Number.isInteger(value)) return null;
    return BigInt(Math.trunc(value));
  }
  if (typeof value === "string" && /^-?\d+$/.test(value)) {
    return BigInt(value);
  }

  return null;
}

export function parseStatisticValue(value: unknown): bigint {
  return tryParseStatisticValue(value) ?? BigInt(0);
}

export function formatCompactNumber(value: bigint | number): string {
  const bigintValue = typeof value === "bigint" ? value : parseStatisticValue(value);
  const absValue = bigintValue < BigInt(0) ? -bigintValue : bigintValue;

  for (const { value: threshold, suffix } of COMPACT_SUFFIXES) {
    if (absValue < threshold) continue;

    const whole = bigintValue / threshold;
    const remainder = bigintValue % threshold;
    const decimal = (remainder * BigInt(10)) / threshold;

    if (whole >= BigInt(100) || decimal === BigInt(0)) {
      return `${whole}${suffix}`;
    }

    return `${whole}.${decimal < BigInt(0) ? -decimal : decimal}${suffix}`;
  }

  return bigintValue.toLocaleString("en-US");
}
