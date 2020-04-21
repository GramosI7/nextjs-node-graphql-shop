import React from "react";

import { useQuery } from "@apollo/react-hooks";

import Form from "./Form/SignIn/Form";

import { CURRENT_USER_QUERY } from "./User";
import Container from "./styles/Container";

import styled from "styled-components";

export default function PleaseSignIn({ children }) {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <div>Loading...</div>;
  if (!data.me) {
    return (
      <Container>
        <Inner>
          <p>Please, sign in before continuing.</p>
          <Form />
        </Inner>
      </Container>
    );
  }
  return children;
}

const Inner = styled.div`
  padding: 120px 0 80px;
  p {
    text-align: center;
    font-size: 2.4rem;
  }
`;
