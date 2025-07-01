
export function sortBy<T>(
    key: keyof T,
    descending: boolean,
    primer?: (item: T[keyof T]) => string | number
): (a: T, b: T) => number {
    return (a, b) => {
        const aValue = primer ? primer(a[key]) : a[key];
        const bValue = primer ? primer(b[key]) : b[key];

        if (aValue < bValue) return descending ? 1 : -1;
        if (aValue > bValue) return descending ? -1 : 1;
        return 0;
    };
}


export default sortBy;
