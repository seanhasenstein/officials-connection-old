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
  margin: 10px;
  background: #333;
  border-radius: 10px;

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
        font-size: 1.9rem;
        letter-spacing: 1px;
        transition: color 100ms ease;
        border-radius: 8px;

        &:hover {
          color: #fff;
          background: #2a2a2a;
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
    font-size: 1.7rem;
    letter-spacing: 1px;
    font-weight: 300;
    font-style: italic;
  }
`;

export default Footer;
