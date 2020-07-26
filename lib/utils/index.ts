export function isNullOrUndefined(property: any): boolean {
    const values: Array<undefined | null> = [null, undefined];
    return values.includes(property);
}

export function isEmptyArray(property: Array<any>): boolean {
    return !property.length;
}
