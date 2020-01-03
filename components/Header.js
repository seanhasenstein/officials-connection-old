/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withRouter } from 'next/router';
import Link from 'next/link';
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
      <div className="wrapper">
        <Link href="/">
          <a>
            <LogoSvg />
          </a>
        </Link>
        <Hamburger isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <nav className={isNavOpen ? 'open' : ''}>
          <div className="main">
            <ActiveLink href="/" activeClassName="active">
              <a>Home</a>
            </ActiveLink>
            <ActiveLink href="/" activeClassName="active">
              <a>WBYOC Camps</a>
            </ActiveLink>
            <ActiveLink href="/faq" activeClassName="active">
              <a>FAQ</a>
            </ActiveLink>
            <ActiveLink href="/contact" activeClassName="active">
              <a>Contact</a>
            </ActiveLink>
          </div>
          <div className="cta">
            <ActiveLink href="/register" activeClassName="active">
              <a>Register</a>
            </ActiveLink>

            {data && data.camper ? (
              <a href="#" onClick={() => camperLogout()}>
                Logout
              </a>
            ) : (
              <ActiveLink href="/login" activeClassName="active">
                <a>Sign In</a>
              </ActiveLink>
            )}
          </div>
        </nav>
      </div>
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
      font-size: 1.5rem;
      letter-spacing: 0.5px;
      color: rgba(46, 49, 52, 0.8);
      text-transform: uppercase;
      font-weight: 500;
      border-bottom: 1px solid rgba(46, 49, 52, 0.12);
      outline: none;

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

  /* Tablet/Large Screen Styles */
  @media (min-width: 900px) {
    display: flex;
    justify-content: center;

    .wrapper {
      display: flex;
      justify-content: space-between;
      max-width: 1200px;
      width: 100%;
    }

    nav {
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      position: relative;
      top: 0;
      left: 0;
      height: auto;
      padding: 0;
      /* background: #fff; */
      border: none;
      z-index: 1;
      opacity: 1;

      &.open {
        top: 0;
      }
    }

    .main a,
    .cta a,
    .cta a:first-of-type {
      font-family: ${theme.fonts.heading};
      font-size: 1.8rem;
      font-weight: normal;
      color: #444;
      padding: 0 5px;
      margin: 0 25px;
      text-transform: none;
      border-bottom: none;
      outline: none;

      &:focus {
        box-shadow: ${theme.outline.boxShadow};
        border-radius: 6px;
      }

      &:hover {
        color: #000;
      }
    }

    .main {
      display: flex;

      a:first-of-type {
        margin: 0 15px 0 0;
      }
    }

    .cta {
      padding: 0;
      border-top: none;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;

      /* Register button */
      a:first-of-type {
        background: none;
        box-shadow: none;
      }

      a:last-of-type {
        padding-right: 0;
      }
    }
  }
`;

export default withRouter(Header);
