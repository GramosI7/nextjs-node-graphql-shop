import PageModifyItem from "../components/PageModifyItem/PageModifyItem";
import Container from "../components/styles/Container";
import TitleH1 from "../components/styles/Title";

export default function modify({ query }) {
  return (
    <Container>
      <TitleH1>Modify item</TitleH1>
      <PageModifyItem id={query.id} />
    </Container>
  );
}
