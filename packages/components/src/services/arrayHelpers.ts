export const toDestructedObject = (array: any[]) => {
    if (array.some((item: any) => typeof item !== 'object')) {
        throw new Error('Array does not contain objects');
    }
    return array.reduce(
        (acc: any, x: any) => ({
            ...acc,
            ...x,
        }),
        {}
    );
};
