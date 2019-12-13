/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const CampDetails = () => (
  <section css={styles}>
    <h2>Wisconsin Basketball Yearbook Officials Camps</h2>
    <p>
      Camps for all officials, from experienced veterans to complete beginners.
      Develop the skills and knowledge that you need to advance your career as a
      basketball official.
    </p>
  </section>
);

const styles = css`
  margin: 0 auto;
  padding: 50px 25px;
`;

export default CampDetails;
