export function formatNumberWithCommas(num: number = 0, value_precision: number = 0): string {
    const factor = Math.pow(10, value_precision);  // 10^precision
    const roundedNumber = Math.round(num * factor) / factor;

    return roundedNumber.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: value_precision,
    });
}