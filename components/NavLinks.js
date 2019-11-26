import Link from 'next/link';

const NavLinks = () => (
  <ul>
    <li>
      <Link href="/">
        <a>Home</a>
      </Link>
    </li>
    <li>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </li>
    <li>
      <Link href="/login">
        <a>Login</a>
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
