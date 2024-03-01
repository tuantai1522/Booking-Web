import { Button, Typography } from "@mui/material";
import styled from "styled-components";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <StyledErrorFallback>
        <Typography variant="h1" component="h1">
          Something went wrong
        </Typography>
        <Typography>{error.message}</Typography>
        <Button variant="contained" onClick={resetErrorBoundary}>
          Back
        </Button>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
