// styled css
import styled from "styled-components";

// Component styled
import Container from "./styles/Container";

export default function PageError({ children }) {
  return (
    <Container>
      <Inner>
        <p>{children}</p>
      </Inner>
    </Container>
  );
}

const Inner = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    text-align: center;
    color: red;
    font-size: 3rem;
  }
`;
