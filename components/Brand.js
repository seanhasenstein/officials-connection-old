/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import theme from './styles/theme';

const Brand = () => (
  <div css={styles}>
    <h1>Officials Connection</h1>
    <h2>Wisconsin Basketball Yearbook Officials Camps</h2>
  </div>
);

const styles = css`
  display: inline-block;
  z-index: 50;

  h1 {
    margin: 0;
    font-size: 3.5rem;
    font-weight: 400;
    font-style: italic;
    color: #000;
    line-height: 1;
    letter-spacing: 0;
  }
  h2 {
    text-align: right;
    color: ${theme.colors.primary};
    font-size: 1.3rem;
    font-weight: 400;
    font-style: italic;
    letter-spacing: 0.5px;
  }
`;

export default Brand;
