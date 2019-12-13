import { css } from '@emotion/core';
import theme from './theme';

export const formStyles = css`
  form {
    width: 100%;
    margin: 0 auto;
  }

  .divider {
    padding: 16px 0 32px;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;

    hr {
      width: 100%;
      border: 1px solid #e7e7e7;
      border-width: 0.5px;
    }

    span {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      margin: -1px 0 0;
      padding: 0 10px;
      white-space: no-wrap;
      background: #fff;
      font-size: 1.4rem;
      font-weight: 400;
      color: #909090;
    }
  }

  label,
  input,
  textarea,
  select,
  p,
  span {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Helvetica Neue, Ubuntu, sans-serif;
    letter-spacing: 0;
  }

  p {
    font-size: 1.4rem;
    margin: 10px 0 15px;
    color: #000;
    letter-spacing: 0.2px;
  }

  fieldset {
    width: 100%;
    border: none;
    margin: 0 auto 40px;
    padding: 0;
  }

  label,
  label li {
    width: 100%;
    margin-bottom: 6px;
    display: block;
    color: #565656;
    font-weight: 500;
    font-size: 1.3rem;
  }

  input[type='text'],
  input[type='email'],
  input[type='password'],
  textarea,
  select {
    position: relative;
    width: 100%;
    padding: 8px 12px;
    background: #fff;
    appearance: none;
    font-size: 1.4rem;
    color: #303030;
    line-height: 1.5;
    border: 0;
    border-radius: 0;
    box-shadow: 0 0 0 1px #e4e7eb, 0 2px 4px 0 rgba(0, 0, 0, 0.07),
      0 1px 1.5px 0 rgba(0, 0, 0, 0.05);
    transition: box-shadow 80ms ease-in, color 80ms ease-in;

    &:focus {
      outline: none;
      box-shadow: ${theme.outline.boxShadow};
      z-index: 2;
    }

    &::placeholder {
      color: #afb0af;
    }
  }

  input,
  textarea,
  select {
    &.inputSingle {
      border-radius: 6px;
    }
    &.inputTop {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    &.inputBottom {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    &.inputright {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    &.inputLeft {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
  }

  input {
    /* height: 36px; FOR LARGE SIZES */
    height: 42px;

    &.honeypot {
      position: absolute;
      top: 0;
      left: 0;
      height: 1px;
      width: 1px;
      background: none;
      border: none;
      box-shadow: none;
      color: none;
      z-index: -999;
      padding: 0;
      margin: 0;
      line-height: 0;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  /* Radio Button Styles */
  .radio {
    display: inline-block;
    margin-top: 20px;
    border-radius: 6px;

    &:focus-within {
      outline: none;
      box-shadow: ${theme.outline.boxShadow};
      background: #f5f5f5;
    }

    &:hover {
      background: #f5f5f5;
    }

    label {
      font-size: 1.4rem;
      font-weight: 400;
      color: #000;
      letter-spacing: 0.2px;
      margin: 0;
      padding: 6px 8px;
    }
  }
  input[type='radio'] {
    margin-right: 10px;
    height: auto;
    border-radius: 50px;

    &:focus {
      outline: none;
    }
  }

  /* State Select Arrow Icon SVG Styles */
  div.select {
    position: relative;
  }
  svg.select-arrow-icon {
    position: absolute;
    top: 50%;
    right: 12px;
    margin-top: -6px;
    pointer-events: none;
    width: 12px;
    height: 12px;
    z-index: 3;
  }

  button {
    width: 100%;
    border-radius: 6px;
  }

  .StripeElement {
    box-shadow: 0 0 0 1px #e4e7eb, 0 2px 4px 0 rgba(0, 0, 0, 0.07),
      0 1px 1.5px 0 rgba(0, 0, 0, 0.05);
    padding: 12px;
    border-radius: 4px;
    /* font-family: 'Source Code Pro', monospace; */

    &.StripeElement--focus {
      box-shadow: ${theme.outline.boxShadow};
    }

    &.StripeElement--complete {
      box-shadow: ${theme.outline.boxShadowComplete};
    }

    &.StripeElement--invalid {
      box-shadow: ${theme.outline.boxShadowInvalid};
    }
  }
`;
