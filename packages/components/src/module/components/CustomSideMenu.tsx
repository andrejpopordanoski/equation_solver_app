import React, { useEffect, useRef, useState } from 'react';
import { PanResponder, View, Platform, Dimensions, Animated, Pressable } from 'react-native';

import { stateHasFailed, stateIsNotReady } from 'services/stateHelpers';

import { Easing } from 'react-native-reanimated';

export const SLIDE_NATURAL_MOVE_COEF = 0.5;
export const SLIDE_LAST_MOVE_COEF = 0.1;
export const SLIDESHOW_PADDING = 15;
export const SLIDESHOW_WIDTH = Dimensions.get('window').width - 2 * SLIDESHOW_PADDING;
export const SLIDE_WIDTH = SLIDESHOW_WIDTH * SLIDE_NATURAL_MOVE_COEF;
export const SWIPE_TRIGGER_COEF = SLIDE_WIDTH * 0.3;
export const STOP_ANIMATION_DURATION = 150;
export const INITIAL_OFFSET = SLIDESHOW_WIDTH * 0.5 * (1 - SLIDE_NATURAL_MOVE_COEF);

export function CustomSideMenu({ children, menuComponent, isOpen, onChange }) {
    const [menuOpened, setMenuOpened] = useState(isOpen);
    const pan = useRef(new Animated.Value(-Dimensions.get('screen').width * 0.8)).current;
    const [slidingWidth, setSlidingWidth] = useState(0);
    const opacity = useRef(new Animated.Value(0)).current;
    // const route = useRoute();

    Animated.timing(opacity, {
        toValue: pan.interpolate({
            inputRange: [-Dimensions.get('screen').width * 0.8, (-Dimensions.get('screen').width * 0.8) / 2, 0],
            outputRange: [0, 0.5, 0.7],
        }),
        duration: 0,
        useNativeDriver: false,
    }).start();

    useEffect(() => {
        if (isOpen) {
            setMenuOpened(isOpen);
        }
    }, [isOpen]);

    useEffect(() => {
        if (menuOpened) {
            Animated.timing(pan, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {
                // setMenuOpened(true);
                // setTimeout(() => {
                //     if (onChange) {
                //         onChange(menuOpened);
                //     }
                // }, 100)
            });
        } else {
            Animated.timing(pan, {
                toValue: -Dimensions.get('screen').width * 0.8,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {
                // setMenuOpened(false);
                setTimeout(() => {
                    if (onChange) {
                        onChange(menuOpened);
                    }
                }, 100);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuOpened]);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            const { dx, moveX } = gestureState;

            return Math.abs(gestureState.dx) >= 1 && moveX - dx < 60;
            // return true;
        },
        onPanResponderGrant: () => {
            // pan.setOffset(pan._value);

            pan.setOffset(-Dimensions.get('screen').width * 0.8);
        },
        // onPanResponderMove: (event, gestureState) => {
        //     const { dx, moveX } = gestureState;
        //
        //     // pan.setValue(Math.min(0, -Dimensions.get('screen').width * 0.8 + dx));
        //     Animated.timing(pan, {
        //         toValue: Math.min(0, -Dimensions.get('screen').width * 0.8 + dx),
        //         // duration: 20,
        //         duration: 0,
        //         // easing: Easing.linear,
        //         useNativeDriver: false,
        //     }).start(() => {});
        // },
        onPanResponderMove: (e, gestureState) => {
            if (pan._value < 0) {
                // Animated.timing(pan, {
                //     toValue: 0,
                //     // duration: 20,
                //     duration: 100,
                //     // easing: Easing.linear,
                //     useNativeDriver: false,
                // }).start(() => {});
            }
            pan._value > Dimensions.get('screen').width * 0.8
                ? null
                : Animated.event([null, { dx: pan }], {
                      listener: (event, gestureState) => {
                          const { dx, moveX } = gestureState;

                          // setSlidingWidth(dx * 10);
                          // pan.(Math.min(0, -Dimensions.get('screen').width * 0.8 + dx));
                          // Animated.timing(pan, {
                          //     toValue: Math.min(0, -Dimensions.get('screen').width * 0.8 + dx),
                          //     // duration: 20,
                          //     duration: 50,
                          //     // easing: Easing.linear,
                          //     useNativeDriver: false,
                          // }).start(() => {});
                      },
                      useNativeDriver: false,
                  })(e, gestureState);
        },
        onPanResponderTerminationRequest: () => {
            return true;
        },

        onPanResponderTerminate: (evt, gestureState) => {
            const { dx } = gestureState;
            pan.flattenOffset();

            if (dx < -(SWIPE_TRIGGER_COEF / 2)) {
            } else if (dx > SWIPE_TRIGGER_COEF / 2) {
                setMenuOpened(true);
            } else {
                // setSlidingWidth(0);

                Animated.timing(pan, {
                    toValue: -Dimensions.get('screen').width * 0.8,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }).start(() => {
                    setMenuOpened(false);
                    // pan.setValue(0);
                });
            }
        },

        onPanResponderRelease: (evt, gestureState) => {
            const { dx } = gestureState;
            pan.flattenOffset();

            if (dx < -(SWIPE_TRIGGER_COEF / 2)) {
            } else if (dx > SWIPE_TRIGGER_COEF / 2) {
                setMenuOpened(true);
            } else {
                // setSlidingWidth(0);

                Animated.timing(pan, {
                    toValue: -Dimensions.get('screen').width * 0.8,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }).start(() => {
                    setMenuOpened(false);
                    setTimeout(() => {
                        if (onChange) {
                            onChange(menuOpened);
                        }
                    }, 100);
                    // pan.setValue(0);
                });
            }
        },
    });

    return (
        <>
            <Animated.View
                style={{
                    position: 'absolute',
                    width: Dimensions.get('screen').width * 0.8,
                    height: Dimensions.get('screen').height,
                    // borderWidth: 1,
                    transform: [{ translateX: pan }],
                    zIndex: 120,
                }}
            >
                {menuComponent}
            </Animated.View>
            <Pressable
                pointerEvents={menuOpened ? 'box-only' : 'none'}
                style={{
                    position: 'absolute',
                    zIndex: 98,

                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height,
                }}
                onPress={() => {
                    setMenuOpened(false);
                }}
            >
                <Animated.View style={{ flex: 1, backgroundColor: 'black', opacity }} />
            </Pressable>
            <View
                {...panResponder.panHandlers}
                style={{ flex: 1 }}
                // onTouchStart={() => {
                //
                // }}
            >
                {children}
            </View>
        </>
    );
}
