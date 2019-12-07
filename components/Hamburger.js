/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import theme from './styles/theme';

const Hamburger = ({ isNavOpen, setIsNavOpen }) => (
  <button
    css={styles}
    onClick={() => setIsNavOpen(!isNavOpen)}
    className={isNavOpen ? 'open' : ''}
  >
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
  right: 16px;
  outline: none;
  z-index: 50;

  &:focus {
    box-shadow: 0 0 0 1px rgba(50, 151, 211, 0.3),
      0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px rgba(50, 151, 211, 0.3);
  }

  span {
    width: 25px;
    height: 2px;
    border-radius: 40px;
    background: ${theme.colors.darkGrey};
  }

  span:nth-last-of-type(2) {
    margin: 5px 0;
  }

  &.open {
    width: 39px;

    span {
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

      :first-of-type {
        transform: rotate(45deg);
        transform-origin: 10%;
      }
      :nth-of-type(2) {
        opacity: 0;
      }
      :last-of-type {
        transform: rotate(-45deg);
        transform-origin: 8%;
      }
    }
  }
`;

export default Hamburger;
