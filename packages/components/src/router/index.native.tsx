import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../module/Home';
import { Results } from '../module/screens/Results';
import { History } from '../module/screens/History';

// import { Home } from '../module/Home';

const Stack = createStackNavigator();

export function Router() {
    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="Home"
                >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Results" component={Results} />
                    <Stack.Screen name="HistoryPage" component={History} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
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
