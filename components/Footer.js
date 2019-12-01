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
  padding: 60px 30px 30px;
  border-left: 10px solid #fff;
  border-right: 10px solid #fff;
  border-bottom: 10px solid #fff;
  background: ${theme.colors.darkGrey};
  background: #333;

  ul {
    text-align: center;
    padding: 0;
    margin-bottom: 50px;

    li {
      margin: 20px 0;

      a {
        display: block;
        color: rgba(255, 255, 255, 0.6);
        padding: 10px;
        font-size: 1.9rem;
        letter-spacing: 1px;
        transition: color 300ms ease-in;

        &:hover {
          color: ${theme.colors.accent};
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
