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
  align-items: center;
  justify-content: space-around;
  border: none;
  box-shadow: none;
  background: none;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 28px;
  right: 16px;
  height: 35px;
  outline: none;
  z-index: 50;

  &:focus {
    box-shadow: 0 0 0 1px rgba(50, 151, 211, 0.3),
      0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px rgba(50, 151, 211, 0.3);
  }

  span {
    display: inline-block;
    width: 22px;
    height: 1px;
    border-radius: 40px;
    background: ${theme.colors.darkGrey};
  }

  span {
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out,
      -webkit-transform 0.2s ease-in-out;

    &:first-of-type {
      transform-origin: 10%;
    }
    &:last-of-type {
      transform-origin: 20%;
    }
  }

  &.open {
    span {
      margin: -3px -4px 0px 0px;

      :first-of-type {
        transform: rotate(45deg);
      }
      :nth-of-type(2) {
        opacity: 0;
      }
      :last-of-type {
        transform: rotate(-45deg);
      }
    }
  }
`;

export default Hamburger;
