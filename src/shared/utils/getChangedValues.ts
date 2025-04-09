export  function getChangedValues<T extends Record<string, string|number>>(original: T, updated: Partial<T>): Partial<T> {
    const changes: Partial<T> = {};

    for (const [key, value] of Object.entries(updated) as [keyof T, T[keyof T]][]) {
        if (value !== original[key]) {
            changes[key] = value;
        }
    }

    return changes;
}