import styled from "styled-components";

const Container = styled.div`
  max-width: ${(props) => (props.fluid ? "2024px" : props.theme.maxWidth)};
  margin: 0 auto;
  padding: 0px 24px;
`;

export default Container;
