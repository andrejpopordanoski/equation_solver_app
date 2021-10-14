import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Home } from '../module/Home';
import { Results } from '../module/screens/Results';
import { History } from '../module/screens/History';
import { ImageWrapper } from '../module/components/ImageWrapper';

const Stack = createSharedElementStackNavigator();
// const Stack = createStackNavigator();

export function Router() {
    return (
        <View style={{ flex: 1 }}>
            {/* <View style={StyleSheet.absoluteFill}>
                <SharedElementTransition
                    start={{
                        node: startNode,
                        ancestor: startAncestor,
                    }}
                    end={{
                        node: endNode,
                        ancestor: endAncestor,
                    }}
                    position={position}
                    animation="move"
                    resize="auto"
                    align="auto"
                />
            </View> */}
            <ImageWrapper>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        initialRouteName="Home"
                    >
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            sharedElements={(route, otherRoute, showing) => {
                                return [`image`];
                            }}
                        />
                        <Stack.Screen name="Results" component={Results} />
                        <Stack.Screen name="HistoryPage" component={History} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ImageWrapper>
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
