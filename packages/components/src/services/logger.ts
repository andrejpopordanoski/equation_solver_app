import { logger, transportFunctionType } from 'react-native-logs';
import Config from 'react-native-config';
import { env } from './env';

// const REQUEST_BIN = 'https://2d1d08939549828827b1529b8273ba11.m.pipedream.net';

const ENV = env.DEBUG ? 'DEV' : 'PROD';

const transportFunction: transportFunctionType = (msg: any): void => {
    if (ENV === 'DEV' && true) {
        // eslint-disable-next-line no-console
        console.log(`»»» ${String(msg.level?.text).toUpperCase()} «««`, ...msg.rawMsg, '\n\n');
    }
};

const log = logger.createLogger({
    transport: transportFunction,
    transportOptions: {
        hideDate: true,
        dateFormat: 'iso',
        hideLevel: true,
        loggerName: 'myLogsFile',
    },
});

export const debugLogger = {
    debug: (...msg: any) => {
        log.debug(msg);
        return debugLogger;
    },
    info: (...msg: any) => {
        log.info(msg);
        return debugLogger;
    },
    warn: (...msg: any) => {
        log.warn(msg);
        return debugLogger;
    },
    error: (...msg: any) => {
        log.error(msg);
        return debugLogger;
    },
    jsonInfo: (msg: any) => {
        // log.info(JSON.stringify(msg, null, ' '));
        // return debugLogger;
        console.log(JSON.stringify(msg, null, ' '));
    },
};

// export const uploadLogs = () => {
//     const files = [
//         {
//             name: 'myLogsFile',
//             filename: 'myLogsFile.txt',
//             filepath: `${RNFS.DocumentDirectoryPath}/myLogsFile.txt`,
//             filetype: 'text/plain',
//         },
//     ];
//     const uploadBegin = (response: { jobId: any }) => {
//         const { jobId } = response;
//         console.log(`UPLOAD HAS BEGUN! JobId: ${jobId}`);
//     };

//     const uploadProgress = (response: { totalBytesSent: number; totalBytesExpectedToSend: number }) => {
//         const percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
//         console.log(`UPLOAD IS ${percentage}% DONE!`);
//     };
//     RNFS.uploadFiles({
//         toUrl: REQUEST_BIN,
//         files,
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//         },
//         fields: {
//             hello: 'world',
//         },
//         begin: uploadBegin,
//         progress: uploadProgress,
//     })
//         .promise.then(response => {
//             if (response.statusCode === 200) {
//                 console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
//             } else {
//                 console.log('SERVER ERROR');
//             }
//         })
//         .catch(err => {
//             if (err.description === 'cancelled') {
//                 // cancelled by user
//             }
//             console.log(err);
//         });
// };
