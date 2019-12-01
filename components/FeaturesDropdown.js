/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import theme from './styles/theme';

const FeaturesDropdown = () => {
  const [buttonToggle, setButtonToggle] = useState(false);
  const handleClick = e => {
    setButtonToggle(!buttonToggle);
  };
  return (
    <section css={wrapper}>
      <ul>
        <li>
          <button css={button}>
            Camp Features <span>+</span>
          </button>
          <div className={'content'}>This will be the dropdown content...</div>
        </li>
        <li>
          <button css={button}>
            Kaukauna Details <span>+</span>
          </button>
          <div className={'content'}>This will be the dropdown content...</div>
        </li>
        <li>
          <button css={button}>
            Plymouth Details <span>+</span>
          </button>
          <div className={'content'}>This will be the dropdown content...</div>
        </li>
        <li>
          <button css={button}>
            Camp Staff <span>+</span>
          </button>
          <div className={'content'}>This will be the dropdown content...</div>
        </li>
        <li>
          <button css={button} onClick={handleClick}>
            Frequently Asked Questions <span>+</span>
          </button>
          <div className={buttonToggle ? 'content open' : 'content'}>
            This will be the dropdown content...
          </div>
        </li>
      </ul>
    </section>
  );
};

const wrapper = css`
  border-left: 10px solid #fff;
  border-right: 10px solid #fff;
  border-bottom: 10px solid #fff;

  ul {
    list-style: none;
    padding: 0 13px;
  }

  li {
    border-bottom: 1px solid #e5e5e5;
    padding: 0;

    &:last-of-type {
      border: none;
    }
  }

  .content {
    display: none;

    &.open {
      display: block;
    }
  }
`;

const button = css`
  width: 100%;
  border: none;
  padding: 20px 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  color: ${theme.colors.darkGrey};
  font-size: 1.8rem;

  span {
    font-size: 2.2rem;
  }
`;

export default FeaturesDropdown;
