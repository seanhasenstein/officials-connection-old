/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const CampDetails = () => (
  <section css={styles}>
    <h2>Wisconsin Basketball Yearbook Officials Camps</h2>
    <p>
      We have sessions available for all officials, from experienced veterans to
      complete beginners. Our main focus is on teaching and developing the
      skills and knowledge that you need to advance your career as a basketball
      official.
    </p>
  </section>
);

const styles = css`
  margin: 0 auto;
  padding: 40px 25px;

  h2 {
    font-size: 2.6rem;
    font-weight: 500;
    line-height: 1.3;
    margin: 0 0 30px;
  }

  p {
    font-size: 1.9rem;
    line-height: 1.8;
    font-weight: 300;
  }
`;

export default CampDetails;
