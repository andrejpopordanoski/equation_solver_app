export const truncateString = (text: string, length: number, clamp: string) => {
    const txt = text || '';
    const cl = clamp || '...';
    const l = length || 100;
    const t = txt.length > l ? txt.substring(0, l) + cl : txt;
    return t;
};

export const searchInWord = (keyword: string | RegExp, word: string) => {
    return word.search(new RegExp(keyword, 'i')) !== -1;
};

export const constructQueryString = (queryItems: any[]) => {
    return queryItems
        .filter((item: { value: any }) => item.value)
        .map((item: { name: any; value: any }) => `${item.name}=${item.value}`)
        .join('&');
};

export const stringToArrayStructure = (str: string, delimiter = ',') => {
    return str.split(delimiter).map((item: any) => String(item).trim());
};

export const validateEmail = (email: any) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const urlMapper = (url: any) => {
    return url;
};

export function dateToIso(date: {
    getUTCFullYear: () => string;
    getUTCMonth: () => number;
    getUTCDate: () => string;
    getUTCHours: () => string;
    getUTCMinutes: () => string;
    getUTCSeconds: () => string;
}) {
    return `${date.getUTCFullYear()}-${`00${date.getUTCMonth() + 1}`.slice(-2)}-${`00${date.getUTCDate()}`.slice(
        -2
    )} ${`00${date.getUTCHours()}`.slice(-2)}:${`00${date.getUTCMinutes()}`.slice(-2)}:${`00${date.getUTCSeconds()}`.slice(-2)}`;
}
export const convertCamelCaseToKebabCaseString = (str: string) => {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
};
