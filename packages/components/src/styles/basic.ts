import { Platform, StyleSheet, TextStyle } from 'react-native';
import { colors } from './colors';

export const basicStyles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    paddingContainer: {
        paddingHorizontal: 20,
    },
    marginContainer: {
        marginHorizontal: 20,
    },
    paddingSecoundaryContrainer: {
        paddingLeft: 12.5,
        paddingRight: 12.5,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    menuTitlesWrapper: {
        paddingTop: 120,
        paddingBottom: 24,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    menuTitlesWrapper2: {
        paddingTop: 70,
        paddingBottom: 4,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        flexGrow: 1,
        flexBasis: 0,
    },
    settingsTitleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
});

export const headers = {
    H1(color?: string, fontType?: string, size?: number, lineHeight?: number): TextStyle {
        return {
            lineHeight: lineHeight || 40,
            paddingTop: Platform.OS === 'ios' ? 5 : 0,
            includeFontPadding: false,
            textAlignVertical: 'center',
            color: color || colors.text1,
            fontSize: size || 32,
            fontFamily: fontType ? `Gotham-${fontType}` : 'Gotham-Book',
        };
    },
    H2(color?: string, fontType?: string, size?: number, lineHeight?: number): TextStyle {
        return {
            lineHeight: lineHeight || 32,
            includeFontPadding: false,
            paddingTop: Platform.OS === 'ios' ? 5 : 0,
            textAlignVertical: 'center',
            color: color || colors.text1,
            fontSize: size || 24,
            fontFamily: fontType ? `Gotham-${fontType}` : 'Gotham-Book',
        };
    },
    H3(color?: string, fontType?: string, size?: number, lineHeight?: number): TextStyle {
        return {
            lineHeight: lineHeight || 27,
            paddingTop: Platform.OS === 'ios' ? 5 : 0,
            includeFontPadding: false,
            textAlignVertical: 'center',
            color: color || colors.text1,
            fontSize: size || 20,
            fontFamily: fontType ? `Gotham-${fontType}` : 'Gotham-Book',
        };
    },
    H4(color?: string, fontType?: string, size?: number, lineHeight?: number): TextStyle {
        return {
            lineHeight: lineHeight || 24,
            paddingTop: Platform.OS === 'ios' ? 5 : 0,
            includeFontPadding: false,
            textAlignVertical: 'center',
            color: color || colors.text1,
            fontSize: size || 18,
            fontFamily: fontType ? `Gotham-${fontType}` : 'Gotham-Book',
        };
    },
    H5(color?: string, fontType?: string, size?: number, lineHeight?: number): TextStyle {
        return {
            lineHeight: lineHeight || 22,
            paddingTop: Platform.OS === 'ios' ? 5 : 0,
            includeFontPadding: false,
            textAlignVertical: 'center',
            color: color || colors.text1,
            fontSize: size || 16,
            fontFamily: fontType ? `Gotham-${fontType}` : 'Gotham-Book',
        };
    },
    H6(color?: string, fontType?: string, size?: number, lineHeight?: number): TextStyle {
        return {
            lineHeight: lineHeight || 20,
            paddingTop: Platform.OS === 'ios' ? 5 : 0,
            includeFontPadding: false,
            textAlignVertical: 'center',
            color: color || colors.text1,
            fontSize: size || 13,
            fontFamily: fontType ? `Gotham-${fontType}` : 'Gotham-Book',
        };
    },
};
