/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Link from 'next/link';

const NavLinks = () => (
  <ul
    css={css`
      list-style: none;
      padding: 0;
      margin: 0;
    `}
  >
    <li>
      <Link href="/">
        <a>Camp Details</a>
      </Link>
    </li>
    <li>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </li>
    <li>
      <Link href="/login">
        <a>Sign In</a>
      </Link>
    </li>
    <li>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </li>
  </ul>
);

export default NavLinks;
