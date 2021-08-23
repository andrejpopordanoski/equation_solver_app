import { StyleSheet } from 'react-native';
import { colors } from './index';

export const globalStyles = StyleSheet.create({
    fillSpace: {
        flex: 1,
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    justifyEnd: {
        justifyContent: 'flex-end',
    },
    justifyStart: {
        justifyContent: 'flex-start',
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },
    justifyEvenly: {
        justifyContent: 'space-evenly',
    },
    alignCenter: {
        alignItems: 'center',
    },
    alignEnd: {
        alignItems: 'flex-end',
    },
    alignStart: {
        alignItems: 'flex-start',
    },
    alignSelfCenter: {
        alignSelf: 'center',
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        flexDirection: 'column',
    },
    textCenter: {
        textAlign: 'center',
    },
    fullCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textField: {
        fontFamily: 'Gotham-Book',
        fontSize: 19,
    },
});
