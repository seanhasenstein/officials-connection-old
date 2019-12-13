/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import NavLinks from './NavLinks';
import theme from './styles/theme';

const Footer = () => (
  <footer css={styles}>
    <NavLinks />
    <div>&copy; 2019 Officials Connection.</div>
  </footer>
);

const styles = css`
  padding: 60px 30px 45px;
  margin: 10px 0 0;
  background: #333;

  ul {
    text-align: center;
    padding: 0;
    margin-bottom: 50px;

    li {
      margin: 16px 0;

      a {
        display: block;
        color: rgba(255, 255, 255, 0.6);
        padding: 16px 10px;
        font-family: ${theme.fonts.heading};
        font-size: 1.8rem;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        transition: color 100ms ease;
        border-radius: 8px;

        &:hover {
          color: #fff;
        }

        &:focus {
          outline: none;
          box-shadow: ${theme.outline.boxShadow};
        }
      }
    }
  }

  div {
    text-align: center;
    color: rgba(255, 255, 255, 0.2);
    font-family: ${theme.fonts.heading};
    font-size: 1.6rem;
    letter-spacing: 1.3px;
    text-transform: uppercase;
  }
`;

export default Footer;
