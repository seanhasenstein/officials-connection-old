/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect, ReactComponent } from 'react';
import { withRouter } from 'next/router';
import Brand from './Brand';
import Hamburger from './Hamburger';
import theme from './styles/theme';
import ActiveLink from './ActiveLink';
import HomeIcon from './icons/HomeIcon';
import RegisterIcon from './icons/RegisterIcon';
import SignInIcon from './icons/SignInIcon';
import ContactIcon from './icons/ContactIcon';

const Header = ({ router }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // when nav is open, don't allow page scrolling
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    }
    // clean up the function and allow scrolling again
    return () => (document.body.style.overflow = 'unset');
  });

  return (
    <header css={styles}>
      <div className={isNavOpen ? 'bg open' : 'bg'} />
      <div className={isNavOpen ? 'row open' : 'row'}>
        <Brand />
        <Hamburger isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      </div>
      <nav className={isNavOpen ? 'open' : ''}>
        <ul
          css={css`
            list-style: none;
            padding: 0;
            margin: 0;
          `}
        >
          <li>
            <ActiveLink href="/" activeClassName="active">
              <a>
                <HomeIcon />
                Camp Details
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/register" activeClassName="active">
              <a>
                <RegisterIcon />
                Register
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/login" activeClassName="active">
              <a>
                <SignInIcon />
                Sign In
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/contact" activeClassName="active">
              <a>
                <ContactIcon />
                Contact
              </a>
            </ActiveLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = css`
  padding: 0;
  position: relative;

  .bg {
    background: #fff;
    opacity: 0;
    height: 0vh;
    width: 100%;
    z-index: 30;
    position: absolute;
    top: 0;
    left: 0;

    &.open {
      height: 100vh;
      opacity: 1;
    }
  }

  .row {
    position: relative;
    z-index: 50;
    background: #fff;
    padding: 18px 20px 14px;
    height: auto;
  }

  nav {
    position: fixed;
    top: 90px;
    left: 0;
    right: 10px;
    width: 96%;
    height: calc(100vh - 100px);
    padding: 15px 20px;
    margin: 0 10px;
    background: #fff;
    border: 10px solid #fff;
    border-radius: 6px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    z-index: -100;
    opacity: 0;

    &.open {
      top: 90px;
      z-index: 40;
      opacity: 1;
    }
  }

  ul {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;

    li {
      margin: 0px;
      padding: 5px 0;
    }
  }

  a {
    display: flex;
    align-items: center;
    padding: 12px;
    font-size: 1.7rem;
    letter-spacing: 1px;
    color: ${theme.colors.mediumGrey};
    text-transform: uppercase;
    font-weight: 500;
    border-radius: 6px;
    transition: all 200ms ease;
    outline: none;

    &:focus {
      box-shadow: 0 0 0 1px rgba(50, 151, 211, 0.3),
        0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px rgba(50, 151, 211, 0.3);
    }

    &.active {
      background: #f2f2f2;
      color: ${theme.colors.darkGrey};

      svg {
        fill: ${theme.colors.darkGrey};
      }
    }

    &:hover {
      color: ${theme.colors.darkGrey};

      svg {
        fill: ${theme.colors.darkGrey};
      }
    }

    svg {
      fill: ${theme.colors.mediumGrey};
      margin-right: 16px;
      height: 25px;
      width: 25px;
    }
  }
`;

export default withRouter(Header);
