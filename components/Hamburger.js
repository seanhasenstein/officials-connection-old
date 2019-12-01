/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import theme from './styles/theme';

const Hamburger = ({ navToggle, setNavToggle }) => (
  <button css={styles} onClick={() => setNavToggle(!navToggle)}>
    <span />
    <span />
    <span />
  </button>
);

const styles = css`
  display: flex;
  flex-direction: column;
  border: none;
  box-shadow: none;
  background: none;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 25px;
  right: 0px;

  span {
    width: 25px;
    height: 2px;
    border-radius: 40px;
    background: ${theme.colors.darkGrey};
  }

  span:nth-last-of-type(2) {
    margin: 5px 0;
  }
`;

export default Hamburger;
