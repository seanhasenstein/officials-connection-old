/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withRouter } from 'next/router';
import { CURRENT_CAMPER_QUERY, CAMPER_LOGOUT_MUTATION } from './Camper';
import Hamburger from './Hamburger';
import theme from './styles/theme';
import ActiveLink from './ActiveLink';
import LogoSvg from './icons/LogoSvg';

const Header = () => {
  const { loading, error, data } = useQuery(CURRENT_CAMPER_QUERY);
  const [camperLogout] = useMutation(CAMPER_LOGOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_CAMPER_QUERY }],
  });
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // when nav is open, don't allow page scrolling
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    }
    // clean up to allow scrolling again
    return () => (document.body.style.overflow = 'unset');
  });

  return (
    <header css={styles}>
      <LogoSvg />
      <Hamburger isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <nav className={isNavOpen ? 'open' : ''}>
        <div className="main">
          <ActiveLink href="/" activeClassName="active">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/" activeClassName="active">
            <a>Camp Features</a>
          </ActiveLink>
          <ActiveLink href="/" activeClassName="active">
            <a>Sessions Schedule</a>
          </ActiveLink>
          <ActiveLink href="/contact" activeClassName="active">
            <a>Contact Us</a>
          </ActiveLink>
        </div>
        <div className="cta">
          <ActiveLink href="/register" activeClassName="active">
            <a>Register</a>
          </ActiveLink>

          {data && data.camper ? (
            <a onClick={() => camperLogout()}>Logout</a>
          ) : (
            <ActiveLink href="/login" activeClassName="active">
              <a>Sign In</a>
            </ActiveLink>
          )}
        </div>
      </nav>
    </header>
  );
};

const styles = css`
  padding: 0;
  padding: 18px 20px;
  width: 100%;
  background: #fff;
  text-align: center;
  box-shadow: 0 0 0 1px #e4e7eb, 0 2px 4px 0 rgba(0, 0, 0, 0.07),
    0 1px 1.5px 0 rgba(0, 0, 0, 0.05);

  /* Logo SVG */
  svg {
    width: 210px;
  }

  /* Hamburger button styles are in ./components/Hamburger.js */

  /* NAVIGATION STYLES */
  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: -35%;
    left: 0;
    right: 0;
    width: 100%;
    height: calc(100vh - 80px);
    padding: 0 38px;
    background: #fff;
    border: 10px solid #fff;
    z-index: -100;
    opacity: 0;
    text-align: left;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &.open {
      top: 79px;
      z-index: 40;
      opacity: 1;
    }
  }

  .main {
    a {
      display: block;
      padding: 10px 5px;
      margin: 25px 0;
      font-family: ${theme.fonts.body};
      font-size: 1.8rem;
      letter-spacing: 0.5px;
      color: rgba(46, 49, 52, 0.8);
      text-transform: uppercase;
      font-weight: 500;
      border-bottom: 1px solid rgba(46, 49, 52, 0.12);
      outline: none;
      font-size: 15px;
      letter-spacing: 0.5px;

      &:focus {
        box-shadow: ${theme.outline.boxShadow};
        border-radius: 6px;
      }

      &:hover {
        color: #000;
      }

      &:first-of-type {
        margin-top: 42px;
      }
    }
  }

  & .cta {
    padding: 25px 0 15px;
    border-top: 1px solid rgba(46, 49, 52, 0.12);
    display: flex;
    justify-content: space-around;

    a {
      font-size: 1.5rem;
      padding: 14px 20px;
      letter-spacing: 0.0714em;
      line-height: 1;
      text-transform: uppercase;
      color: rgba(46, 49, 52, 0.8);
      border-radius: 4px;

      /* Register button */
      &:first-of-type {
        background: #006fde;
        color: #fff;
        box-shadow: 0 1px 2px 0 rgba(46, 49, 52, 0.4);
      }

      &:last-of-type {
        padding-right: 0;
      }
    }
  }
`;

export default withRouter(Header);
