import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';

import { store } from 'components/src/redux/config/store';
import { Router } from 'components/src/router';

export function App() {
    return (
        <Provider store={store}>
            <View style={styles.wrapper}>
                <Router />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});

declare let global: {
    HermesInternal?: boolean;
};
