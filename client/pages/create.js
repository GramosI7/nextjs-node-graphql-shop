import styled from "styled-components";
import Container from "../components/styles/Container";
import Form from "../components/Form/Create/Form";
import PleaseSignIn from "../components/PleaseSignIn";

// CREATE AN ITEM PAGE
export default function create() {
  return (
    <PleaseSignIn permissions={["ROOT", "ADMIN"]}>
      <Container>
        <Title>Add an article</Title>
        <Form />
      </Container>
    </PleaseSignIn>
  );
}

const Title = styled.h1`
  margin-top: 40px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
`;
