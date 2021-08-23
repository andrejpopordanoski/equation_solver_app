/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
    watchFolders: [path.resolve(__dirname, '../../')],
    transformer: {
        publicPath: '/assets/dark/magic',
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
    server: {
        enhanceMiddleware: middleware => {
            return (req, res, next) => {
                if (req.url.startsWith('/assets/dark/magic')) {
                    req.url = req.url.replace('/assets/dark/magic', '/assets');
                } else if (req.url.startsWith('/assets/dark')) {
                    req.url = req.url.replace('/assets/dark', '/assets/..');
                } else if (req.url.startsWith('/assets')) {
                    req.url = req.url.replace('/assets', '/assets/../..');
                }
                return middleware(req, res, next);
            };
        },
    },
};
