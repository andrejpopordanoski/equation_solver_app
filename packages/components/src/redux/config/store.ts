import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from 'components/src/redux/reducers';

import AsyncStorage from '@react-native-community/async-storage';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
// const middleware = applyMiddleware(tokenMiddleware, promise, thunk);
const middleware = applyMiddleware(promise, thunk);

export const persistConfig = {
    key: 'equationSolver',
    storage: AsyncStorage,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(persistedReducer, composeEnhancers(middleware));
const persistor = persistStore(store);

export { store, persistor };
