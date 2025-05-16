import { useErrorBoundary } from "react-error-boundary";
import styled from 'styled-components';


const ErrorPage = styled.div
`
 background-color: whitesmoke;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 50px;

`;

const Error = styled.div
`
  color: black;
  padding: 20px;
  border-radius: 5px;
  text-align: center;

`;

const ErrorMessage = styled.p
`
  font-family:monospace;
  font-size: 18px;
  font-weight: bold;
  color: red;
`;

export default function ErrorFallback({ error }) {
  const { resetBoundary } = useErrorBoundary();

  console.log(error.message);
  return (
    <ErrorPage>
      <Error role="alert">
        <h2>Something went wrong. Try after sometime</h2>
        <ErrorMessage>
          {error.message}
        </ErrorMessage>
        {resetBoundary && <button onClick={resetBoundary}>Try again</button>}
      </Error>
    </ErrorPage>
  );
}
