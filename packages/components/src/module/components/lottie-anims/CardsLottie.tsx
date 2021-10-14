import React from 'react';
import { View, Dimensions, StyleSheet, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

import animation from 'components/assets/61530-confetti.json';
import { colors } from 'components/src/styles';

interface LottieLoaderInterface {
    style: ViewStyle;
    progress: any;
}

export default function CardsLottie({ style, progress }: LottieLoaderInterface) {
    return (
        <View
            style={[
                style,
                {
                    flex: 1,
                    transform: [{ rotate: '270deg' }],
                },
            ]}
        >
            <LottieView style={[{ width: style?.width, height: style?.height }]} source={animation} progress={progress} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 10,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
