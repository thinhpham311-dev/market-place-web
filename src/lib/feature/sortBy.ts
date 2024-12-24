// Primer function that accepts any value and returns a transformed value
type PrimerFunction<T> = (value: T) => T;

export function sortBy<T>(
    field: keyof T,
    reverse: boolean = false,
    primer?: PrimerFunction<T> // PrimerFunction now works for any type T
): (a: T, b: T) => number {
    // If a primer is provided, use it to transform the field value
    const key = primer
        ? (x: T) => primer(x[field] as T)
        : (x: T) => x[field];

    const reverseMultiplier = reverse ? -1 : 1;

    return (a: T, b: T): number => {
        const keyA = key(a);
        const keyB = key(b);

        // Perform comparison and return the result, considering reverse order
        return reverseMultiplier * ((keyA > keyB ? 1 : 0) - (keyA < keyB ? 1 : 0));
    };
}

export default sortBy;
