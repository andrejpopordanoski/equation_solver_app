import { StyleSheet } from 'react-native';

export const colors = {
    mainTheme: 'rgb(12,198,183)', // zolta
    background: '#ffffff',
    pauseScreenBackground: '#323232', // 'rgba(50, 50, 50, 0.8)',
    dark: '#323232',
    darkWithOpacity1: 'rgba(50, 50, 50, 0.55)', // Vrz zoltata, sometimes
    darkWithOpacity2: 'rgba(50, 50, 50, 0.15)', // Vrz zoltata posvetla, sometimes
    disabled: '#C9C9C8',
    primaryText: 'rgb(80,176,200)',
    secoundaryText: '#6b6968',
    descriptionText: '#8F8E8D',
    red: '#C1272D',
    gray1: '#B0B0AF', // games unselected, how to play incons/shapes, dividers
    gray2: '#E0DFDF',
    white: '#ffffff',
    transparent: 'rgba(50, 50, 50, 0)',
    brand1: 'rgb(12,198,183)',
    brand2: 'rgb(27,162,237)',
    bg1: 'rgb(238,246,253)',
    text1: '#161616',
    bg3: '#2A2A2A',
    text2: '#545454',
    text3: '#8A8A8A',
    text4: '#B2B2B2',
    bg2: '#E5E5E5',
    textWhite: '#FFFFFF',

};

// function createColorStyles(type: any) {
//     let obj = {};
//     for (let color in colors) {
//         if (colors.hasOwnProperty(color)) {
//             if (type === 'background') {
//                 obj[`${color}`] = { backgroundColor: `${colors[color]}` };
//             } else if (type === 'color') {
//                 obj[`${color}`] = { color: `${colors[color]}` };
//             }
//         }
//     }
//     return obj;
// }
//
// export const backgroundColorStyles = StyleSheet.create(createColorStyles('background'));
//
// export const textColorStyles = StyleSheet.create(createColorStyles('color'));
