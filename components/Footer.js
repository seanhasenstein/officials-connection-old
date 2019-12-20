/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Link from 'next/link';
import { CURRENT_CAMPER_QUERY, CAMPER_LOGOUT_MUTATION } from './Camper';
import theme from './styles/theme';

const Footer = () => {
  const { loading, error, data } = useQuery(CURRENT_CAMPER_QUERY);
  const [camperLogout] = useMutation(CAMPER_LOGOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_CAMPER_QUERY }],
  });

  return (
    <footer css={styles}>
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
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>

        {data && data.camper ? (
          <>
            <li>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
            <li>
              <a onClick={() => camperLogout()}>Logout</a>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">
              <a>Sign In</a>
            </Link>
          </li>
        )}
      </ul>
      <div>&copy; 2019 Officials Connection.</div>
    </footer>
  );
};

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
