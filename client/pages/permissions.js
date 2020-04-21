import React from "react";
import Container from "../components/styles/Container";
import PleaseSignIn from "../components/PleaseSignIn";
import TitleH1 from "../components/styles/Title";
import TabPermission from "../components/Permissions/TabPermission";

export default function permissions() {
  return (
    <PleaseSignIn>
      <Container>
        <TitleH1>Permissions</TitleH1>
        <TabPermission />
      </Container>
    </PleaseSignIn>
  );
}
