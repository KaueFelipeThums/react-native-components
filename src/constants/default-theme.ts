import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const COLORS = {
  light: {
    primary: '#60b565', //VERDE
    background: '#f5f5f5', //BRANCO
    verde: '#B7D69B', // VERDE
    text: '#000', // TEXTO PRIMARIO
    textVariant: '#8c8c8c', // TEXTO INPUT
    itemBackground: '#fff', // CINZA CLARO
    itemBorder: '#f0f0f0', // CINZA CLARO
    shadow: '#a6a6a6',
    // VERMELHO
    red: '#fa6b6b', // VERMELHO
    redLight: '#fdcece', // VERMELHO

    // LARANJA
    orange: '#FBB461', // LARANJA
    orangeLight: '#FFE8C7', // LARANJA LIGHT

    // VERDE
    green: '#60b565',
    greenLight: '#D8ECD9',

    // AZUL
    blue: '#2194f2',
    blueLight: '#d1e8fa',

    // PRETO
    black: '#000',

    // CINZA
    gray: '#a6a5a7',
    grayLight: '#cbcbcb',

    // BRANCO
    white: '#fff',
  },
  dark: {
    primary: '#60b565', //VERDE
    background: '#383838', //BRANCO
    verde: '#B7D69B', // VERDE
    text: '#fff', // TEXTO PRIMARIO
    itemBackground: '#5A5A5A', // CINZA CLARO
    itemBorder: '#757474', // CINZA CLARO
    textVariant: '#c9c5c5', // TEXTO INPUT
    shadow: '#262626',

    // VERMELHO
    red: '#fa6b6b', // VERMELHO
    redLight: '#fdcece', // VERMELHO

    // LARANJA
    orange: '#FBB461', // LARANJA
    orangeLight: '#FFE8C7', // LARANJA LIGHT

    // VERDE
    green: '#60b565',
    greenLight: '#D8ECD9',

    // AZUL
    blue: '#2194f2',
    blueLight: '#d1e8fa',

    // PRETO
    black: '#000',

    // CINZA
    gray: '#99989a',
    grayLight: '#cbcbcb',

    // BRANCO
    white: '#fff',
  },
};

const SIZES = {
  // GLOBAL
  base: 8,
  font: 16,
  radius: 10,
  padding: 18,

  // FONT
  largeTitle: 40,
  h1: 22,
  h2: 18,
  h3: 14,
  h4: 12,
  h5: 10,
  body1: 22,
  body2: 16,
  body3: 14,
  body4: 12,
  body5: 10,

  // SCREEN DIMENSIONS
  width,
  height,
};

const FONTS = {
  largeTitle: {fontFamily: 'Poppins-Black', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h1},
  h2: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h2},
  h3: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3},
  h4: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h4},
  h5: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h5},
  body1: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body1},
  body2: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body2},
  body3: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body3},
  body4: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body4},
  body5: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body5},
};

export {FONTS, SIZES, COLORS};
