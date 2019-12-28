import styled from '@emotion/styled';

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyle key={i}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyle>
    ));
  }
  return (
    <ErrorStyles>
      Shoot! {error.message.replace('GraphQL error: ', '')}
    </ErrorStyles>
  );
};

const ErrorStyles = styled.div`
  color: #b80118;
  margin: 0 0 30px;
  font-family: Barlow Condensed, sans-serif;
  letter-spacing: 0.25px;
  font-size: 1.8rem;
`;

export default DisplayError;
