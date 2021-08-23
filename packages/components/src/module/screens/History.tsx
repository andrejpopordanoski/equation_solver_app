import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { APP_NAME } from 'components/src/services/globals';
import { headers } from 'components/src/styles';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

export function History() {
    const [historyElements, setHistoryElements] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        AsyncStorage.getItem(`${APP_NAME}:history`).then(el => {
            if (el) setHistoryElements(JSON.parse(el));
        });
    }, []);

    // console.log('history els', historyElements);
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
                <View style={{ padding: 10 }}>
                    <Text style={[headers.H3()]}>History page</Text>
                </View>
                <ScrollView>
                    {historyElements?.map(el => {
                        const img = el?.solution_pods[0].subpods[0].img;
                        console.log(img);
                        return (
                            <TouchableOpacity
                                style={{ backgroundColor: 'gray', padding: 20 }}
                                activeOpacity={0.7}
                                onPress={() => {
                                    navigation.navigate('Results', {
                                        inputResult: el,
                                    });
                                }}
                            >
                                <Text>{el.latex_string}</Text>
                                {/* <Text>{el.latex_string}</Text> */}
                                {/* <Image source={{ uri: img.src }} style={{ width: 2 * img.width, height: 2 * img.height }} /> */}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
