// eslint-disable-next-line prefer-destructuring
const envObj = process.env;
envObj.DEBUG = envObj.REACT_APP_DEBUG;
export const env = envObj;
