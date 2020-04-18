import styled from "styled-components";
import Container from "../components/styles/Container";
import Form from "../components/Form/Create/Form";

export default function create() {
  return (
    <Container>
      <Title>Add an article</Title>
      <Form />
    </Container>
  );
}

const Title = styled.h1`
  margin-top: 40px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
`;
