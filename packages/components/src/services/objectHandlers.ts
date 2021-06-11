/* eslint-disable no-restricted-syntax */
import { convertCamelCaseToKebabCaseString } from './stringHelpers';

export const filterByValue = (obj: { [s: string]: unknown } | ArrayLike<unknown>) => (handler: (arg0: unknown) => any) => {
    const filtered = {};

    for (const [key, value] of Object.entries(obj)) {
        if (handler(value)) {
            filtered[key] = value;
        }
    }

    return filtered;
};

export const camelCaseToKebabCaseKeys = (obj: { [s: string]: unknown } | ArrayLike<unknown>) => {
    return Object.entries(obj).reduce((acc, [k, v]) => ({ ...acc, [convertCamelCaseToKebabCaseString(k)]: v }), {});
};
