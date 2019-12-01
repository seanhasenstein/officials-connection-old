import { css } from '@emotion/core';

const defaultFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
];

const colors = {
  red: '#B80118',
  yellow: '#FFC000',
  blue: '#10719E',
  darkGrey: '#3A3C3C',
  mediumGrey: '#6C7A7D',
  lightGrey: '#CAD9DB',
};

export default {
  colors: {
    ...colors,
    primary: '#B80118',
    secondary: '#6C7A7D',
    accent: '#FFC000',
    dark: '#3A3C3C',
    medium: '#6C7A7D',
    light: '#CAD9DB',
    lightest: '#D5E6E8',
  },
  fonts: {
    body: defaultFontStack.join(),
    heading: defaultFontStack.join(),
  },
  breakpoints: ['600px', '900px'],
};
