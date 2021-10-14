import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Alert,
    Dimensions,
    PanResponder,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Pressable,
} from 'react-native';

import { RNCamera } from 'react-native-camera';

import { useDispatch, useSelector } from 'react-redux';

import useInterval from '@use-it/interval';
import { SharedElement } from 'react-navigation-shared-element';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IoniIcons from 'react-native-vector-icons/Ionicons';
import { cropImage, getMerPrediction } from '../redux/actions/data.actions';
import { stateHasFailed, stateIsLoaded, stateIsLoading } from '../services/stateHelpers';
import { CustomSideMenu } from './components/CustomSideMenu';
import CardsLottie from './components/lottie-anims/CardsLottie';
import { useImageSize } from './components/ImageWrapper';
import { History } from './screens/History';

export function Home() {
    const initialDimensions = {
        width: 300,
        height: 100,
    };
    const [boxDimensions, setBoxDimensions] = useState(initialDimensions);
    const height = useRef(new Animated.Value(100)).current;
    const width = useRef(new Animated.Value(300)).current;
    const isSizeChangingOpacity = useRef(new Animated.Value(0)).current;
    const imageScale = useRef(new Animated.Value(1)).current;
    const [image, setImage] = useState(false);

    const cameraRef = useRef(null);
    const cropImageState = useSelector(state => state.cropImage);
    const merPrediction = useSelector(state => state.merPrediction);
    const [completed, setCompleted] = useState(0);
    const { setImageSizes } = useImageSize();
    const [pointOfInterest, setPointOfInterest] = useState({ x: 0.3, y: 0.2 });

    const progress = useRef(new Animated.Value(0)).current;

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
            return true;
        },

        onPanResponderTerminate: (evt, gestureState) => {
            const { dx } = gestureState;
        },

        onPanResponderRelease: (evt, gestureState) => {
            const { dx } = gestureState;

            width.flattenOffset();
            height.flattenOffset();
            // setSizeChanging(false);
            isSizeChangingOpacity.setValue(0);
            focusOnCenter();
        },
    });

    useEffect(() => {
        if (stateIsLoaded(cropImageState)) {
            // console.log('well, loaded the image', cropImageState);
            // navigation.navigate('Results');
            Image.getSize(`data:image/png;base64,${cropImageState?.data}`, (width, height) => {
                setImageSizes(width, height);
            });

            dispatch(getMerPrediction(cropImageState?.data));
            setImage(cropImageState?.data);
            Animated.timing(imageScale, {
                toValue: 1.1,
                duration: 400,
                useNativeDriver: true,
            }).start(() => {
                Animated.timing(imageScale, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            });
            // Animated.timing(progress, {
            //     toValue: 1,
            //     duration: 400,
            //     useNativeDriver: false,
            // }).start();
        }
        if (stateHasFailed(cropImageState)) {
            Alert.alert('Error', "Couldn't process your image, try again later.");
        }
    }, [cropImageState]);

    useEffect(() => {
        if (stateIsLoaded(merPrediction)) {
            Animated.timing(progress, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {
                navigation.navigate('Results');
            });
        } else if (stateHasFailed(merPrediction)) {
            // set some error
            setImage(false);
            Alert.alert('Error', "Sorry we couldn't process your request. Please try again later.");
        }
    }, [merPrediction]);

    if (cameraRef.current) {
        cameraRef.current.getSupportedRatiosAsync().then(el => {});
    }

    useFocusEffect(
        useCallback(() => {
            // setImage(false);
            progress.setValue(0);
            setTimeout(() => {
                setImage(false);
            }, 200);
        }, [])
    );

    useInterval(
        () => {
            let diff;
            if (progress._value < 0.3) {
                diff = 0.06;
            } else {
                diff = 0.04;
            }
            // return Math.min(oldCompleted + diff, 100);
            Animated.timing(progress, {
                toValue: progress._value + diff,
                duration: 200,
                useNativeDriver: false,
            }).start();
        },
        stateIsLoading(merPrediction) ? 200 : null
    );

    const focusOnCenter = () => {
        setPointOfInterest({
            x: (sizesRef.current.x + sizesRef.current.width / 2) / Dimensions.get('window').width,
            y: (sizesRef.current.y + sizesRef.current.height / 2) / Dimensions.get('window').height,
        });
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />

            <CustomSideMenu
                isOpen={menuOpen}
                onChange={(isOpen: boolean) => setMenuOpen(isOpen)}
                menuComponent={
                    // <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <History isOpen={menuOpen} />
                    // </View>
                }
            >
                {/* <View style={{ flex: 1 }}>
                    <RNCamera
                        ref={cameraRef}
                        captureAudio={false}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        autoFocusPointOfInterest={pointOfInterest}
                        onTap={(origin: any) => {
                            console.log('ontap yes', origin);
                            setPointOfInterest({ x: origin.x / Dimensions.get('window').width, y: origin.y / Dimensions.get('window').height });
                        }}
                        ratio="20:9"
                    />
                </View> */}
                <SafeAreaView style={{ flex: 1 }}>
                    <RNCamera
                        ref={cameraRef}
                        captureAudio={false}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        autoFocusPointOfInterest={pointOfInterest}
                        defaultOnFocusComponent
                        onTap={(origin: any) => {
                            // setPointOfInterest({ x: origin.x / Dimensions.get('window').width, y: origin.y / Dimensions.get('window').height });
                        }}
                        ratio="20:9"
                        onFocusChanged={focus => {
                            console.log('on focus changed', focus);
                        }}
                    />
                    <View
                        style={{ flex: 1 }}

                        // pointerEvents="none"
                    >
                        <Pressable style={[styles.background, { flex: 0.5 }]} onPress={focusOnCenter} />

                        <TouchableOpacity
                            style={{ position: 'absolute', top: 15, left: 15 }}
                            activeOpacity={0.7}
                            onPress={() => {
                                setMenuOpen(true);
                            }}
                        >
                            <IoniIcons name="menu-outline" size={40} color="white" />
                        </TouchableOpacity>
                        <Animated.View
                            onLayout={({ nativeEvent }) => {
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
                                    borderWidth: 1,
                                    borderColor: 'rgba(255,255,255, 0.5)',
                                }}
                            >
                                <>
                                    <View style={{ position: 'absolute', top: 10, left: 10, width: 10, height: 3, backgroundColor: 'white' }} />
                                    <View style={{ position: 'absolute', top: 10, left: 10, width: 3, height: 10, backgroundColor: 'white' }} />
                                </>
                                <>
                                    <View style={{ position: 'absolute', top: 10, right: 10, width: 10, height: 3, backgroundColor: 'white' }} />
                                    <View style={{ position: 'absolute', top: 10, right: 10, width: 3, height: 10, backgroundColor: 'white' }} />
                                </>
                                <>
                                    <View style={{ position: 'absolute', bottom: 10, left: 10, width: 10, height: 3, backgroundColor: 'white' }} />
                                    <View style={{ position: 'absolute', bottom: 10, left: 10, width: 3, height: 10, backgroundColor: 'white' }} />
                                </>
                                <>
                                    <View style={{ position: 'absolute', bottom: 10, right: 10, width: 10, height: 3, backgroundColor: 'white' }} />
                                    <View style={{ position: 'absolute', bottom: 10, right: 10, width: 3, height: 10, backgroundColor: 'white' }} />
                                </>

                                <Animated.View
                                    style={{ flex: 1, opacity: isSizeChangingOpacity, justifyContent: 'center', alignItems: 'center' }}
                                    {...panResponder.panHandlers}
                                >
                                    <SimpleLineIcons name="size-fullscreen" size={40} color="#276AA6" />
                                </Animated.View>
                                {image && (
                                    <Animated.View
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'white',
                                            zIndex: 2,
                                            overflow: 'hidden',
                                            transform: [{ scale: imageScale }],
                                        }}
                                    >
                                        <SharedElement id="image">
                                            <Image
                                                source={{ uri: `data:image/png;base64,${image}` }}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                        </SharedElement>
                                        <CardsLottie
                                            style={{
                                                position: 'absolute',
                                                width: '100%',
                                            }}
                                            progress={progress}
                                        />
                                    </Animated.View>
                                )}
                            </Animated.View>
                            <View style={styles.background} />
                        </Animated.View>
                        <Pressable style={[styles.background, { flex: 1.5 }]} onPress={focusOnCenter} />

                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 30, position: 'absolute', bottom: 0, width: '100%' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (cameraRef.current) {
                                        cameraRef.current.takePictureAsync({ base64: true, quality: 0.25 }).then(pic => {
                                            const x_ratio = sizesRef.current.width / Dimensions.get('window').width;
                                            const y_ratio = sizesRef.current.height / Dimensions.get('window').height;
                                            const x_rel = Math.floor((sizesRef.current.x / Dimensions.get('window').width) * pic.height);
                                            const y_rel = Math.floor(((sizesRef.current.y + 15) / Dimensions.get('window').height) * pic.width);
                                            const width_rel = Math.floor(x_ratio * pic.height);
                                            const height_rel = Math.floor(y_ratio * pic.width);

                                            dispatch(cropImage(pic.base64, x_rel, y_rel, width_rel, height_rel));
                                        });
                                    }
                                }}
                            >
                                <View
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 40,
                                        backgroundColor: '#276AA6',
                                        borderWidth: 3,
                                        borderColor: 'white',
                                    }}
                                />
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
        backgroundColor: '#0000007d',
    },
});

declare let global: {
    HermesInternal?: boolean;
};
