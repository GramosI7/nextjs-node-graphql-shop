// Styled Component
import Container from "../components/styles/Container";
import TitleH1 from "../components/styles/Title";

// Component
import Home from "../components/Home/Home";

export default function index() {
  return (
    <Container>
      <TitleH1>Home</TitleH1>
      <Home />
    </Container>
  );
}
// export { ALL_ITEM_QUERY };
