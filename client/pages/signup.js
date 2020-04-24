// Styled component
import Container from "../components/styles/Container";
import TitleH1 from "../components/styles/Title";

// Component
import Form from "../components/Form/SignUp/Form";

export default function signup() {
  return (
    <Container>
      <TitleH1>Sign Up</TitleH1>
      <Form />
    </Container>
  );
}
