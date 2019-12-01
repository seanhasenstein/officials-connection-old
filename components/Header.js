/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { withRouter } from 'next/router';
import NavLinks from './NavLinks';
import Brand from './Brand';
import Hamburger from './Hamburger';
import theme from './styles/theme';

const Header = ({ router }) => {
  const [navToggle, setNavToggle] = useState(false);
  return (
    <header css={styles}>
      <div className="row">
        <Brand />
        <Hamburger navToggle={navToggle} setNavToggle={setNavToggle} />
      </div>
      <nav className={navToggle ? 'open' : ''}>
        <NavLinks />
      </nav>
    </header>
  );
};

const styles = css`
  padding: 0 20px;
  position: relative;

  .row {
    position: relative;
    z-index: 2;
    background: #fff;
    padding: 20px 0 28px;
  }

  nav {
    position: absolute;
    top: -100vh;
    left: 0;
    width: 100%;
    height: 100vh;
    padding: 25px;
    background: #fff;
    transition: top 400ms ease;

    &.open {
      top: 96px;
      z-index: 0;
    }
  }

  ul {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;

    li {
      margin: 0px 10px;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
  }

  a {
    display: block;
    padding: 12px;
    font-size: 1.6rem;
    letter-spacing: 1px;
    color: ${theme.colors.darkGrey};
    text-transform: uppercase;
    font-weight: 500;
  }
`;

export default withRouter(Header);
