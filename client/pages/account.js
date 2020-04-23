import React from "react";
import Container from "../components/styles/Container";
import TitleH1 from "../components/styles/Title";
import PleaseSignIn from "../components/PleaseSignIn";

export default function account() {
  return (
    <PleaseSignIn permissions={["USER"]}>
      <Container>
        <TitleH1>My Account</TitleH1>
        <p>TODO: create page account info.</p>
      </Container>
    </PleaseSignIn>
  );
}
