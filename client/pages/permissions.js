// Styled component
import Container from "../components/styles/Container";
import TitleH1 from "../components/styles/Title";

// Component
import PleaseSignIn from "../components/PleaseSignIn";
import TabPermission from "../components/Permissions/TabPermission";

export default function permissions() {
  return (
    <PleaseSignIn permissions={["ROOT"]}>
      <Container>
        <TitleH1>Permissions</TitleH1>
        <TabPermission />
      </Container>
    </PleaseSignIn>
  );
}
