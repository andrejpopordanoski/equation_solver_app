import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { APP_NAME } from 'components/src/services/globals';
import { headers } from 'components/src/styles';
import React, { useEffect, useRef, useState } from 'react';
import MathView, { MathText } from 'react-native-math-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import ErrorBoundary from 'components/src/components/ErrorBoundary';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { ErrorBoundary } from '../components/ErrorBoundary';

export function History({ isOpen }) {
    const [historyElements, setHistoryElements] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        // if (isOpen) {
        AsyncStorage.getItem(`${APP_NAME}:history`).then(el => {
            if (el) setHistoryElements(JSON.parse(el).reverse());
        });
        // }
    }, [isOpen]);

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <View style={{ padding: 20, marginTop: 20 }}>
                    <Text style={[headers.H1(null, 'Medium')]}>History</Text>
                </View>
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    {historyElements?.map((el: any) => {
                        // console.log(el);
                        return (
                            <TouchableOpacity
                                style={{ backgroundColor: 'rgba(251, 251, 251, 1)', padding: 20, borderRadius: 10, marginVertical: 10 }}
                                activeOpacity={0.7}
                                onPress={() => {
                                    navigation.navigate('Results', {
                                        inputResult: el,
                                    });
                                }}
                            >
                                {/* <Text>{el.latex_string}</Text> */}
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <ErrorBoundary>
                                        <View style={{ flex: 1 }}>
                                            <View>
                                                {!el.hasError && (
                                                    <MathView
                                                        math={`${el?.latex_string}`}
                                                        direction="ltr"
                                                        renderError={({ error }: any) => {
                                                            el.hasError = true;
                                                            setHistoryElements([...historyElements]);
                                                            return (
                                                                <>
                                                                    <Text>Error has occured</Text>
                                                                </>
                                                            );
                                                        }}
                                                    />
                                                )}
                                                {el.hasError && <Text> {el?.latex_string} </Text>}
                                            </View>
                                            <Text style={[headers.H5('#276AA6', 'Medium'), { paddingTop: 10 }]}> See full details</Text>
                                        </View>
                                    </ErrorBoundary>
                                    <AntDesign name="arrowright" size={40} color="#276AA6" />
                                </View>

                                {/* <Text>{el.latex_string}</Text> */}
                                {/* <Image source={{ uri: img.src }} style={{ width: 2 * img.width, height: 2 * img.height }} /> */}
                            </TouchableOpacity>
                        );
                    })}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
