import { StateStatus } from 'components/src/redux/core/StateStatus';

const stateIsLoading = (obj: { status: any }) => !obj || obj?.status === StateStatus.LOADING;

const stateIsNotInitialized = (obj: { status: any }) => !obj || obj?.status === StateStatus.NOT_INITIALIZED;

const stateIsNotReady = (obj: { status: number }) => !obj || obj?.status <= StateStatus.LOADING;

const stateIsLoaded = (obj: { status: any }) => obj?.status === StateStatus.LOADED;

const stateHasFailed = (obj: { status: any }) => obj?.status === StateStatus.ERROR;

export { stateIsLoading, stateIsNotInitialized, stateIsNotReady, stateIsLoaded, stateHasFailed };
