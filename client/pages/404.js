import React from "react";
import Container from "../components/styles/Container";
import PageError from "../components/PageError";

export default function Custom404() {
  return (
    <Container>
      <PageError>404</PageError>
    </Container>
  );
}
