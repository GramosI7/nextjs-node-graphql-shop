// Styled-css
import styled from "styled-components";

export default function ErrorMessage({ children }) {
  return <ContainerError>{children}</ContainerError>;
}

const ContainerError = styled.p`
  font-size: 1.4rem;
  color: red;
`;
