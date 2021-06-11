import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Home } from '../module/Home';

export function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 200,
        backgroundColor: '#f3f3f3',
    },
    text: {
        fontSize: 36,
        fontWeight: '600',
    },
});
