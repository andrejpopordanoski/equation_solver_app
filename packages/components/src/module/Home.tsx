import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, SafeAreaView, TouchableOpacity, StatusBar, StyleSheet, Text, View, Button } from 'react-native';

import { RNCamera } from 'react-native-camera';

import { useDispatch, useSelector } from 'react-redux';

import { cropImage } from '../redux/actions/data.actions';
import { stateIsLoaded } from '../services/stateHelpers';
import { CustomSideMenu } from './components/CustomSideMenu';

export function Home() {
    const initialDimensions = {
        width: 300,
        height: 100,
    };
    const [boxDimensions, setBoxDimensions] = useState(initialDimensions);
    const height = useRef(new Animated.Value(100)).current;
    const width = useRef(new Animated.Value(300)).current;
    const isSizeChangingOpacity = useRef(new Animated.Value(0)).current;
    const cameraRef = useRef(null);
    const cropImageState = useSelector(state => state.cropImage);
    const sizesRef = useRef({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [sizeChanging, setSizeChanging] = useState(false);
    const MAX_HEIGHT = 200;
    const MAX_WIDTH = Dimensions.get('window').width * 0.9;
    const MIN_HEIGHT = 100;
    const MIN_WIDTH = 200;

    const [menuOpen, setMenuOpen] = useState(false);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            const { dx, moveX, dy, moveY } = gestureState;
            // console.log(gestureState);

            const condition = Math.abs(dx) >= 1;
            if (condition) {
                // setSizeChanging(true);
                isSizeChangingOpacity.setValue(1);
            }

            return condition;
        },
        onPanResponderGrant: (evt, gestureState) => {
            let heightVal = height._value;
            if (heightVal > MAX_HEIGHT) {
                heightVal = MAX_HEIGHT;
            }
            if (heightVal < MIN_HEIGHT) {
                heightVal = MIN_HEIGHT;
            }
            let widthVal = width._value;
            if (widthVal > MAX_WIDTH) {
                widthVal = MAX_WIDTH;
            }
            if (widthVal < MIN_WIDTH) {
                widthVal = MIN_WIDTH;
            }
            height.setOffset(heightVal);
            width.setOffset(widthVal);
        },

        onPanResponderMove: (e, gestureState) => {
            Animated.event([null, { dx: width, dy: height }], {
                listener: (event, gestureState) => {
                    const { dx, moveX } = gestureState;
                },
                useNativeDriver: false,
            })(e, gestureState);
        },
        onPanResponderTerminationRequest: evt => {
            console.log('onPanResponderTerminationRequest');
            return true;
        },

        onPanResponderTerminate: (evt, gestureState) => {
            console.log('onPanResponderTerminate');

            const { dx } = gestureState;
        },

        onPanResponderRelease: (evt, gestureState) => {
            console.log('onPanResponderRelease', gestureState);

            const { dx } = gestureState;

            width.flattenOffset();
            height.flattenOffset();
            // setSizeChanging(false);
            isSizeChangingOpacity.setValue(0);
        },
    });

    useEffect(() => {
        if (stateIsLoaded(cropImageState)) {
            // console.log('well, loaded the image', cropImageState);
            navigation.navigate('Results');
        }
    }, [cropImageState]);

    if (cameraRef.current) {
        cameraRef.current.getSupportedRatiosAsync().then(el => {
            console.log('sizes', el);
        });
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />

            <CustomSideMenu
                isOpen={menuOpen}
                onChange={(isOpen: boolean) => setMenuOpen(isOpen)}
                menuComponent={
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <Text> This is menu component </Text>
                        <Button
                            title="Open history"
                            onPress={() => {
                                navigation.navigate('HistoryPage');
                            }}
                        />
                    </View>
                }
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <RNCamera
                        ref={cameraRef}
                        captureAudio={false}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        ratio="20:9"
                    />
                    <View style={{ flex: 1 }}>
                        <View style={[styles.background, { flex: 0.5 }]} />
                        <View style={{ width: 50, height: 50, backgroundColor: 'white', position: 'absolute', top: 10, left: 10 }} />
                        <Animated.View
                            onLayout={({ nativeEvent }) => {
                                // console.log(nativeEvent.layout.height, nativeEvent.layout.y);
                                if (sizesRef.current) {
                                    sizesRef.current.y = nativeEvent.layout.y;
                                }
                            }}
                            style={{
                                height: height.interpolate({
                                    inputRange: [0, MIN_HEIGHT, MAX_HEIGHT, Infinity],
                                    outputRange: [MIN_HEIGHT, MIN_HEIGHT, MAX_HEIGHT, MAX_HEIGHT],
                                    extrapolateRight: 'clamp',
                                }),
                                width: '100%',
                                flexDirection: 'row',
                            }}
                        >
                            <View style={styles.background} />
                            <Animated.View
                                onLayout={({ nativeEvent }) => {
                                    console.log(nativeEvent.layout);
                                    if (sizesRef.current) {
                                        sizesRef.current.x = nativeEvent.layout.x;
                                        sizesRef.current.width = nativeEvent.layout.width;
                                        sizesRef.current.height = nativeEvent.layout.height;
                                    }
                                }}
                                style={{
                                    width: width.interpolate({
                                        inputRange: [0, MIN_WIDTH, MAX_WIDTH, Infinity],
                                        outputRange: [MIN_WIDTH, MIN_WIDTH, MAX_WIDTH, MAX_WIDTH],
                                        extrapolateRight: 'clamp',
                                    }),
                                }}
                            >
                                <Animated.View style={{ flex: 1, borderWidth: 1, opacity: isSizeChangingOpacity }} {...panResponder.panHandlers} />
                            </Animated.View>
                            <View style={styles.background} />
                        </Animated.View>
                        <View style={[styles.background, { flex: 1.5 }]} />

                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 30, position: 'absolute', bottom: 0, width: '100%' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (cameraRef.current) {
                                        cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 }).then(pic => {
                                            // console.log(pic.base64);
                                            console.log('width i height', pic.width, pic.height);

                                            const x_ratio = sizesRef.current.width / Dimensions.get('window').width;
                                            const y_ratio = sizesRef.current.height / Dimensions.get('window').height;
                                            const x_rel = Math.floor((sizesRef.current.x / Dimensions.get('window').width) * pic.height);
                                            const y_rel = Math.floor(((sizesRef.current.y + 20) / Dimensions.get('window').height) * pic.width);
                                            const width_rel = Math.floor(x_ratio * pic.height);
                                            const height_rel = Math.floor(y_ratio * pic.width);
                                            console.log('sizesrefcurrent', sizesRef.current, x_rel, y_rel, width_rel, height_rel);

                                            dispatch(cropImage(pic.base64, x_rel, y_rel, width_rel, height_rel));
                                            // ImagePicker.openCropper({
                                            //     path: pic.uri,
                                            //     width: 300,
                                            //     height: 400,
                                            // }).then(image => {
                                            //     console.log(image);
                                            // });
                                            // const file = getCroppedImg(pic.uri, { width: 200, height: 200, x: 50, y: 50 }, 0);
                                        });
                                    }
                                }}
                            >
                                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'red' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </CustomSideMenu>
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
});

declare let global: {
    HermesInternal?: boolean;
};
