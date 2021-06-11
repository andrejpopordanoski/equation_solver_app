import { debugLogger } from 'components/src/services/logger';

export const handleSuccess = (response: { data: any }) => {
    const { data } = response;
    return {
        success: true,
        data,
    };
};

export const handleError = (error: string | undefined) => {
    debugLogger.error(`REQUEST ERROR CAUGHT WITH STATUSCODE ${error}`);
    return {
        success: false,
        errors: error,
    };
};
