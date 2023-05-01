export function mapIt<T, R>(it: Iterable<T>, fn: (v: T) => R): Array<R> {
    const result = new Array<R>();
    for (const value of it) {
        result.push(fn(value));
    }
    return result;
}
