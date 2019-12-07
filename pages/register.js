/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Head from 'next/head';
import Layout from '../components/Layout';
import { formStyles } from '../components/styles/form';
import theme from '../components/styles/theme';
import StatesInputSelect from '../components/StatesInputSelect';
import SelectArrowIcon from '../components/icons/SelectArrowIcon';
import CheckIcon from '../components/icons/CheckIcon';

const fakeKaukaunaSessions = [
  {
    id: '1',
    camp: 'Kaukuana',
    level: "Women's College",
    classifications: [],
    mechanics: '3 Person',
    dates: ['Friday 6/28', 'Saturday 6/29'],
    timeFrames: '10am-7pm and 9am-6pm',
    price: 17000,
  },
  {
    id: '2',
    camp: 'Kaukuana',
    level: "Women's College",
    classifications: [],
    mechanics: '3 Person',
    dates: ['Saturday 6/29', 'Sunday 6/30'],
    timeFrames: ['8am-6pm', '8am-4pm'],
    price: 17000,
  },
  {
    id: '3',
    camp: 'Kaukuana',
    level: "Men's College",
    classifications: [],
    mechanics: '3 Person',
    dates: ['Saturday 6/29', 'Sunday 6/30'],
    timeFrames: ['8am-6pm', '8am-4pm'],
    price: 17000,
  },
  {
    id: '4',
    camp: 'Kaukuana',
    level: 'High School',
    classifications: ['Master', 'L5'],
    mechanics: '3 Person',
    dates: ['Friday 6/28'],
    timeFrames: ['9am-7pm'],
    price: 8500,
  },
  {
    id: '5',
    camp: 'Kaukuana',
    level: 'High School',
    classifications: ['Master', 'L5', 'L4'],
    mechanics: '3 Person',
    dates: ['Saturday 6/29'],
    timeFrames: ['8am-6pm'],
    price: 8500,
  },
  {
    id: '6',
    camp: 'Kaukuana',
    level: 'High School',
    classifications: ['All Levels'],
    mechanics: '2 Person',
    dates: ['Saturday 6/29'],
    timeFrames: ['11am-9pm'],
    price: 8500,
  },
  {
    id: '7',
    camp: 'Kaukuana',
    level: 'High School',
    classifications: ['All Levels'],
    mechanics: '3 Person',
    dates: ['Saturday 6/29'],
    timeFrames: ['11am-9pm'],
    price: 8500,
  },
  {
    id: '8',
    camp: 'Kaukuana',
    level: 'High School',
    classifications: ['All Levels'],
    mechanics: '2 Person',
    dates: ['Sunday 6/30'],
    timeFrames: ['8am-5pm'],
    price: 8500,
  },
  {
    id: '9',
    camp: 'Kaukuana',
    level: 'High School',
    classifications: ['All Levels'],
    mechanics: '3 Person',
    dates: ['Sunday 6/30'],
    timeFrames: ['8am-5pm'],
    price: 8500,
  },
];

const Register = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log('The form was submitted!');
  };

  return (
    <Layout>
      <Head>
        <title>Register - Officials Connection</title>
      </Head>
      <div css={styles}>
        <h2>2020 Camper Registration</h2>
        <p>Fill out the following form to register for either of our 2020 camps.</p>
        <form onSubmit={handleSubmit} css={formStyles}>
          {/* CHOOSE SESSIONS SECTION */}
          <div className="divider">
            <hr />
            <span>Choose Your Session(s)</span>
          </div>
          <fieldset>
            <label htmlFor="camp1">Kaukauna Camp</label>
            <div className="checkbox-list">
              {fakeKaukaunaSessions.map(session => (
                <div key={session.id}>
                  <input
                    type="checkbox"
                    id={`session-${session.id}`}
                    name={`session-${session.id}`}
                    value="1"
                  />
                  <label htmlFor={`session-${session.id}`} className="session">
                    <CheckIcon />
                    <ul>
                      <li>
                        {session.level}
                        {session.classifications.length > 0
                          ? ` (${session.classifications
                              .map((c, i, a) => {
                                if (i === 0) return c;
                                if (a.length === 2) {
                                  if (i === 1) return ` & ${c}`;
                                }
                                if (a.length === 3) {
                                  if (i === 1) return `, ${c}, `;
                                  if (i === 2) return ` & ${c}`;
                                }
                              })
                              .join('')})`
                          : null}
                        {/* {session.classification !== } */}
                      </li>
                      <li>
                        {session.dates.map((d, i) => {
                          if (i === 0) return d;
                          if (i === 1) return ` & ${d}`;
                        })}
                      </li>
                      <li>${session.price / 100}</li>
                      <li>{session.mechanics}</li>
                    </ul>
                  </label>
                </div>
              ))}
            </div>
          </fieldset>

          {/* CAMPER INFORMATION */}
          <div className="divider">
            <hr />
            <span>Camper Information</span>
          </div>
          {/* CAMPER CONTACT INFORMATION */}
          <fieldset>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className="inputTop"
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className="inputBottom"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="inputSingle"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" id="phone" className="inputSingle" />
          </fieldset>
          <fieldset>
            <label htmlFor="address">Home Address</label>
            <input
              type="text"
              id="street1"
              name="street1"
              placeholder="Street Address"
              className="inputTop"
            />
            <input
              type="text"
              id="street2"
              name="street2"
              placeholder="Apt. #"
            />
            <input type="text" id="city" name="city" placeholder="City" />
            <div className="select">
              <StatesInputSelect />
              <SelectArrowIcon />
            </div>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              placeholder="Zip Code"
              className="inputBottom"
            />
          </fieldset>

          {/* WIAA INFORMATION */}
          {/* Setup useReducer and if sessions selected includes hs then show these 2 fields */}
          <fieldset>
            <label htmlFor="wiaaNumber">WIAA Information</label>
            <div className="select">
              <select className="inputTop">
                <option>Select Your Classification</option>
                <option value="MASTER">Master</option>
                <option value="L5">L5</option>
                <option value="L4">L4</option>
                <option value="L3">L3</option>
                <option value="L2">L2</option>
                <option value="L1">L1</option>
                <option value="NEW">New Official</option>
              </select>
              <SelectArrowIcon />
            </div>
            <input
              type="text"
              id="wiaaNumber"
              name="wiaaNumber"
              placeholder="WIAA Number"
              className="inputBottom"
            />
          </fieldset>
          {/* ) : null } */}

          {/* FOOD ALLERGIES */}
          <fieldset>
            <label htmlFor="foodAllergies">Food Allergies</label>
            <textarea
              className="inputSingle"
              placeholder="Please list any food allergies that you have."
            />
          </fieldset>

          {/* EMERGENCY CONTACT */}
          <fieldset>
            <label htmlFor="emergencyContact">Emergency Contact</label>
            <input
              type="text"
              id="ec-name"
              name="ec-name"
              placeholder="Name"
              className="inputTop"
            />
            <input
              type="text"
              id="ec-number"
              name="ec-number"
              placeholder="Phone Number"
              className="inputBottom"
            />
          </fieldset>

          <fieldset>
            <label htmlFor="notes">
              Registration Notes
            </label>
            <textarea className="inputSingle" placeholder="Please list any notes or questions that you may have regarding your camp registration..." />
          </fieldset>

          {/* LIABILITY AGREEMENT */}
          <fieldset>
            <label htmlFor="agreement">Liability Agreement</label>
            <p>
              By clicking this box you agree to release the WBYOC from all
              liablity for injuries and illness while attending camp.
            </p>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  id="agreement"
                  name="agreement"
                  value="I Agree"
                />
                I agree to these terms.
              </label>
            </div>
          </fieldset>
          {/* STRIPE CC INFO */}

          <button>Submit Registration</button>
        </form>
      </div>
    </Layout>
  );
};

const styles = css`
  width: calc(100% - 20px);
  margin: 50px auto;
  max-width: 380px;
  /* background: hsla(211, 29%, 93%, 1); */

  h2 {
    font-size: 2.4rem;
    font-weight: 400;
    margin-bottom: 30px;
  }

  p {
    margin-bottom: 30px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
  }

  .checkbox-list {
    label {
      padding: 15px 15px 18px;
      background: #fff;
      border-radius: 6px;
      border: 2px solid transparent;
      cursor: pointer;
      position: relative;
      box-shadow: 0 0 0 1px #e4e7eb, 0 2px 4px 0 rgba(0, 0, 0, 0.07),
        0 1px 1.5px 0 rgba(0, 0, 0, 0.05);

      ul {
        position: relative;
      }

      li {
        color: #515151;
        position: relative;
        font-size: 1.5rem;
        letter-spacing: 0;

        &:first-of-type {
          font-weight: 600;
          letter-spacing: 0;
          margin-bottom: 9px;
          color: #222;
        }

        &:nth-of-type(2) {
          margin-bottom: 23px;
          color: hsla(215, 12%, 59%, 1);
        }

        &:nth-of-type(3),
        &:last-of-type {
          width: 50%;
          display: inline-block;
          margin-bottom: 0;
        }

        &:last-of-type {
          font-weight: 600;
          color: hsla(215, 12%, 59%, 1);
          text-align: right;
        }
      }
    }

    input {
      opacity: 0;
      width: 1px;
      height: 0;
      outline: none;
      box-shadow: none;
      border: 0;
      color: transparent;
      background: none;
      margin: 0;
      padding: 0;

      &:focus + label {
        outline: none;
        box-shadow: ${theme.outline.boxShadow};
      }

      &:checked:focus + label {
        box-shadow: none;
      }

      &:checked + label {
        background: hsla(166, 76%, 98%, 1);
        border-color: hsla(159, 47%, 50%, 1);

        li {
          color: hsla(175, 45%, 17%, 1);

          &:first-of-type {
            color: hsla(177, 36%, 30%, 1);
          }

          &:last-of-type {
            color: hsla(163, 43%, 32%, 0.85);
          }
        }

        svg.icon-check {
          display: block;
        }
      }
    }
  }

  svg.icon-check {
    width: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;

    .primary {
      fill: hsla(165, 51%, 77%, 1);
    }
    .secondary {
      fill: hsla(163, 77%, 20%, 1);
    }
  }
`;

export default Register;
