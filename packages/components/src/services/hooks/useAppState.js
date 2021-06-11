import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { debugLogger } from 'components/src/services/logger';

const useAppState = () => {
    const [appState, setAppState] = useState(AppState.currentState);

    const handleAppStateChange = nextAppState => {
        debugLogger.info('next app state ', nextAppState);
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
            debugLogger.info('App has come to the foreground!');
        }
        setAppState(nextAppState);
    };

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return appState;
};

export default useAppState;
