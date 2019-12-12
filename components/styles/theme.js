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
  darkBlue: '#353C3D',
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
    default: defaultFontStack.join(),
  },
  outline: {
    boxShadow:
      '0 0 0 1px rgba(50, 151, 211, 0.3), 0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px rgba(50, 151, 211, 0.3)',
    boxShadowInvalid:
      '0 0 0 1px hsla(4, 84%, 64%, 0.5), 0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px hsla(4, 84%, 64%, 0.5)',
    boxShadowComplete:
      '0 0 0 1px hsla(159, 47%, 50%, 0.5), 0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px hsla(159, 47%, 50%, 0.5)',
  },
  breakpoints: ['600px', '900px'],
  hidden: {
    all: 'display: none;',
    visually:
      'position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; -webkit-clip-path: inset(50%); clip-path: inset(50%); border: 0;',
  },
};
