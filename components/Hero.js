/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import theme from './styles/theme';
import { primaryButton, secondaryButton } from './styles/buttons';

const Hero = () => (
  <section css={styles}>
    <h3>2020 Registration now open!</h3>
    <ul>
      <li>Kaukauna Camp</li>
      <li>June 19-21, 2020</li>
    </ul>
    <ul>
      <li>Plymouth Camp</li>
      <li>July 10-12, 2020</li>
    </ul>
    <p>High School, Men's College, and Women's College Sessions available!</p>
    <div className="cta">
      <button css={secondaryButton}>Camp Details</button>
      <button css={primaryButton}>Register</button>
    </div>
  </section>
);

const styles = css`
  text-align: center;
  padding: 58px 40px;
  background: ${theme.colors.darkGrey};
  background-image: linear-gradient(
      to right,
      rgba(30, 30, 30, 0.85) 40%,
      rgba(30, 30, 30, 0.8) 100%
    ),
    url('./images/hero.jpg');
  background-repeat: no-repeat;
  background-position: center right;
  background-size: cover;

  h3 {
    margin: 0;
    font-family: ${theme.fonts.body};
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1.3;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }

  ul {
    list-style: none;
    padding: 0;

    li:nth-of-type(1) {
      font-family: ${theme.fonts.heading};
      font-size: 3rem;
      font-weight: 400;
      margin-bottom: 10px;
      color: #fff;
    }

    li:nth-of-type(2) {
      margin: 0;
      font-size: 1.7rem;
      font-weight: 300;
      color: ${theme.colors.accent};
      letter-spacing: 0.7px;
    }
  }

  p {
    letter-spacing: 0.3px;
    color: rgba(240, 240, 240, 0.6);
  }

  h3,
  ul,
  p {
    margin-bottom: 52px;
  }

  .cta {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  button {
    width: 100%;
    padding: 12px;
    letter-spacing: 1px;
    outline: none;
    border-radius: 5px;

    &:first-of-type {
      border: 1px solid #333;
      border-color: #333 #333 #111;
      box-shadow: inset 0 1px 1px #bbb;
      color: #fff;
      margin-bottom: 18px;

      &:focus {
        box-shadow: inset 0 1px 1px #bbb, 0 0 0 1px rgba(50, 151, 211, 0.3),
          0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px rgba(50, 151, 211, 0.3);
      }
    }

    &:last-of-type {
      border: 1px solid #64000c;
      box-shadow: inset 0 1px 1px #e8011e;
      border-color: #620a15 #620a15 #4f060f;
      color: #f3fafe;

      &:focus {
        box-shadow: inset 0 1px 1px #e8011e, 0 0 0 1px rgba(50, 151, 211, 0.3),
          0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px rgba(50, 151, 211, 0.3);
      }
    }
  }

  @media (max-width: 360px) {
    padding: 35px 20px;

    ul {
      li:first-of-type {
        font-size: 2.4rem;
      }
      li:last-of-type {
        font-size: 2rem;
      }
    }

    p {
      font-size: 1.8rem;
    }

    h3,
    ul,
    p {
      margin-bottom: 35px;
    }
  }
`;

export default Hero;
