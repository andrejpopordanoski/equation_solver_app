import { getMerPrediction, resetCroppedImageState, resetMerPrediction } from 'components/src/redux/actions/data.actions';
import { debugLogger } from 'components/src/services/logger';
import { stateIsLoaded, stateIsLoading } from 'components/src/services/stateHelpers';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { headers } from 'components/src/styles';
import AsyncStorage from '@react-native-community/async-storage';
import { APP_NAME } from 'components/src/services/globals';
import { SharedElement } from 'react-navigation-shared-element';
import MathView, { MathText } from 'react-native-math-view';
import { useNavigation } from '@react-navigation/core';
import { useImageSize } from '../components/ImageWrapper';
import { ErrorBoundary } from '../components/ErrorBoundary';

export function Results({ route }) {
    // console.log('route', route);
    const navigation = useNavigation();
    const inputResult = route?.params?.inputResult;
    const cropImageState = useSelector(state => state.cropImage);
    const merPrediction = useSelector(state => state.merPrediction);
    const [hasError, setHasError] = useState(false);
    let { width, height } = useImageSize();
    if (inputResult) {
        width = inputResult.width;
        height = inputResult.height;
    }
    console.log('width here', width, height);

    // const [width, setWidth] = useState(inputResult ? inputResult.width : 0);
    // const [height, setHeight] = useState(inputResult ? inputResult.height : 0);
    const dispatch = useDispatch();
    const [image, setImage] = useState(false);

    const [equation, setEquation] = useState('');
    const [result, setResult] = useState('');
    const [solutionPods, setSolutionPods] = useState([]);
    const [solutionStatus, setSolutionStatus] = useState({});
    const [showPredictLoader, setShowPredictLoader] = useState(false);

    useEffect(() => {
        if (stateIsLoaded(cropImageState)) {
            setImage(cropImageState?.data);
            dispatch(resetCroppedImageState());
        }
    }, [cropImageState]);

    useEffect(() => {
        if (hasError) {
            Alert.alert('Error has occured', 'Error has occured when trying to parse your request. Please try again.');
        }
    }, [hasError]);

    useEffect(() => {
        if (stateIsLoaded(merPrediction) && !inputResult) {
            const res = merPrediction?.data;
            setEquation(`Equation: ${res?.latex_string}`);
            setResult(res?.latex_string);
            setSolutionPods(res?.solution_pods);
            setSolutionStatus(res?.solution_status);
            AsyncStorage.getItem(`${APP_NAME}:history`).then((el: any) => {
                let element;
                if (!el) {
                    element = [];
                } else {
                    element = JSON.parse(el);
                }

                element.push({ ...res, image: cropImageState?.data, width, height });

                AsyncStorage.setItem(`${APP_NAME}:history`, JSON.stringify(element));
            });
            dispatch(resetMerPrediction());
        }
    }, [merPrediction]);

    useEffect(() => {
        if (inputResult) {
            setEquation(`Equation: $${inputResult?.latex_string.replace('\\\\', '\\')}$`);
            setResult(inputResult?.latex_string);
            setSolutionPods(inputResult?.solution_pods);
            setSolutionStatus(inputResult?.solution_status);
        }
    }, [inputResult]);

    debugLogger.jsonInfo(equation);

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                {(image || inputResult) && (
                    <>
                        {!inputResult && (
                            <SharedElement id="image">
                                <Image
                                    source={{ uri: `data:image/png;base64,${inputResult ? inputResult.image : image}` }}
                                    style={{
                                        width: '100%',
                                        height: width > 0 ? (height / width) * Dimensions.get('window').width : 100,
                                    }}
                                />
                            </SharedElement>
                        )}
                        {inputResult && (
                            <Image
                                source={{ uri: `data:image/png;base64,${inputResult ? inputResult.image : image}` }}
                                style={{
                                    width: '100%',
                                    height: width > 0 ? (height / width) * Dimensions.get('window').width : 100,
                                }}
                            />
                        )}
                    </>
                )}
                {stateIsLoading(merPrediction) && (
                    <View>
                        <Text> Loading ..</Text>
                    </View>
                )}
                <View style={{ flex: 1, padding: 10 }}>
                    {/* <Text>{`Equation: $i-+-^{^{7^{i}}}+-^{==+^{i}i=^{ii}}$`}</Text> */}
                    {equation !== null && (
                        <ErrorBoundary>
                            {!hasError && (
                                <MathView
                                    math={equation}
                                    renderError={({ error }: any) => {
                                        setHasError(true);
                                        return (
                                            <>
                                                <Text>Error has occured</Text>
                                            </>
                                        );
                                    }}
                                />
                            )}
                            {hasError && <Text style={[headers.H5()]}>{equation}</Text>}
                        </ErrorBoundary>
                    )}
                    {(equation || inputResult) && (
                        <>
                            <ScrollView>
                                {solutionPods?.map((sp: any) => {
                                    return (
                                        <View style={{ padding: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={[headers.H5(null, 'Medium')]}>{sp.title}:</Text>
                                            <View>
                                                {sp?.subpods?.map((subp: any) => (
                                                    <View>
                                                        <Image
                                                            source={{ uri: subp.img.src }}
                                                            style={{ width: subp.img.width, height: subp.img.height }}
                                                        />
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    );
                                })}
                                {solutionPods.length == 0 && (
                                    <View style={{ flex: 1, padding: 20 }}>
                                        <Text style={[headers.H4(null, 'Italic')]}>No results available</Text>
                                    </View>
                                )}
                            </ScrollView>
                        </>
                    )}
                </View>
            </SafeAreaView>
        </>
    );
}
