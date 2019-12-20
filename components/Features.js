import styled from '@emotion/styled';

const Features = () => (
  <Wrapper>
    <ul>
      <li>
        <h3>Experienced Camp Staff</h3>
        <p>
          Our camps are led by highly knowledgable and experienced clinicians.
        </p>
      </li>
      <li>
        <h3>Classroom Lectures</h3>
        <p>Attend multiple classroom lectures led by our clinicians.</p>
      </li>
      <li>
        <h3>Work WIAA Boy's Varsity Games</h3>
        <p>
          Work 3-4 boys varsity games (both camps are run in conjunction with a
          Mark Miller Summer Tournament.
        </p>
      </li>
      <li>
        <h3>Live On-Court Instruction</h3>
        <p>
          Each game you work have clinicians providing both written and verbal
          instruction and feedback.
        </p>
      </li>
      <li>
        <h3>Individualized Film Study</h3>
        <p>
          One of your games is filmed and includes live audio commentary from
          one of our clinicians.
        </p>
      </li>
      <li>
        <h3>Networking Opportunities</h3>
        <p>
          Network and learn from game assignors and commissioners that attend
          our camps.
        </p>
      </li>
      <li>
        <h3>WIAA Certification</h3>
        <p>Both of our camps include WIAA certification and credit.</p>
      </li>
      <li>
        <h3>Meal, Snacks, Refreshments</h3>
        <p>
          Each session includes one cooked meal as well as snacks and
          refreshments between games.
        </p>
      </li>
    </ul>
  </Wrapper>
);

const Wrapper = styled.ul`
  padding: 25px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 0 0 35px;
    padding-bottom: 25px;
    border-bottom: 1px solid #ebebeb;

    :last-of-type {
      margin: 0;
      border: none;
    }
  }

  h3 {
    margin: 0 0 15px;
    font-size: 2.2rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.9);
  }
`;

export default Features;
