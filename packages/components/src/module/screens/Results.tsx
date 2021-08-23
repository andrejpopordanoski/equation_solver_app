import { getMerPrediction } from 'components/src/redux/actions/data.actions';
import { debugLogger } from 'components/src/services/logger';
import { stateIsLoaded, stateIsLoading } from 'components/src/services/stateHelpers';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { headers } from 'components/src/styles';
import AsyncStorage from '@react-native-community/async-storage';
import { APP_NAME } from 'components/src/services/globals';

export function Results({ route }) {
    // console.log('route', route);
    const inputResult = route?.params?.inputResult;
    const cropImageState = useSelector(state => state.cropImage);
    const merPrediction = useSelector(state => state.merPrediction);

    const [width, setWidth] = useState(inputResult ? inputResult.width : 0);
    const [height, setHeight] = useState(inputResult ? inputResult.height : 0);
    const dispatch = useDispatch();

    const [equation, setEquation] = useState('');
    const [result, setResult] = useState('');
    const [solutionPods, setSolutionPods] = useState([]);
    const [solutionStatus, setSolutionStatus] = useState({});
    const [showPredictLoader, setShowPredictLoader] = useState(false);

    useEffect(() => {
        if (stateIsLoaded(cropImageState) && !width && !height) {
            Image.getSize(`data:image/png;base64,${cropImageState?.data}`, (width, height) => {
                console.log(width, height);
                setWidth(width);
                setHeight(height);
            });
            dispatch(getMerPrediction(cropImageState?.data));
        }
    }, [cropImageState]);
    if (height && width) {
        console.log((height / width) * Dimensions.get('window').width);
    }
    useEffect(() => {
        if (stateIsLoaded(merPrediction) && !inputResult) {
            const res = merPrediction?.data;
            setEquation(`Equation: $${res?.latex_string}$`);
            setResult(res?.latex_string);
            setSolutionPods(res?.solution_pods);
            setSolutionStatus(res?.solution_status);
            AsyncStorage.getItem(`${APP_NAME}:history`).then((el: any) => {
                console.log('el is', el);
                let element;
                if (!element) {
                    element = [];
                } else {
                    element = JSON.parse(el);
                }
                console.log('element now', element);

                element.push({ ...res, image: cropImageState?.data, width, height });
                console.log('element now', element);
                AsyncStorage.setItem(`${APP_NAME}:history`, JSON.stringify(element));
            });
        }
    }, [merPrediction]);

    useEffect(() => {
        console.log('inputResult activated', inputResult);
        if (inputResult) {
            setEquation(`Equation: $${inputResult?.latex_string}$`);
            setResult(inputResult?.latex_string);
            setSolutionPods(inputResult?.solution_pods);
            setSolutionStatus(inputResult?.solution_status);
        }
    }, [inputResult]);

    debugLogger.jsonInfo(merPrediction);

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                {(cropImageState?.data || inputResult) && (
                    <>
                        <Text>Yes</Text>
                        <Image
                            source={{ uri: `data:image/png;base64,${inputResult ? inputResult.image : cropImageState?.data}` }}
                            style={{
                                width: '100%',
                                height: width > 0 ? (height / width) * Dimensions.get('window').width : 0,
                            }}
                        />
                    </>
                )}
                {stateIsLoading(merPrediction) && (
                    <View>
                        <Text> Loading ..</Text>
                    </View>
                )}
                <View style={{ flex: 1, padding: 10 }}>
                    {/* <Text>{`Equation: $i-+-^{^{7^{i}}}+-^{==+^{i}i=^{ii}}$`}</Text> */}

                    {(stateIsLoaded(merPrediction) || inputResult) && (
                        <>
                            <Text style={[headers.H4()]}>{equation}</Text>
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
                            </ScrollView>
                            {/* <View style={{ marginTop: '20px' }}>
                                <Text>Solution:</Text>
                                <View style={{ marginTop: '20px' }}>
                                    {solutionPods?.map((sp: any) => {
                                        console.log(sp);
                                        return (
                                            <View>
                                                <Text>{sp.title}:</Text>
                                                <View>
                                                    {sp.subpods.map((subp: any) => (
                                                        <View>
                                                            <Image source={{ uri: subp.img.src }} style={{ width: 50, height: 50 }} />
                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View> */}
                        </>
                    )}
                </View>
            </SafeAreaView>
        </>
    );
}
