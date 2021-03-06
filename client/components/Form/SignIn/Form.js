import React, { useState } from "react";

// Styled-css
import styled from "styled-components";

// Next router
import { useRouter } from "next/router";
import Link from "next/link";

// Graphql
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// Component
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";

import { CURRENT_USER_QUERY } from "../../User";

const USER_SIGNIN = gql`
  mutation USER_SIGNIN($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      _id
      username
      email
      createdAt
    }
  }
`;

export default function Form() {
  const router = useRouter();

  const [stateInput, setStateInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setStateInput({ ...stateInput, [name]: value });
  };

  const [userLogin, { loading }] = useMutation(USER_SIGNIN, {
    update(_, { data }) {
      console.log(data);
      router.push({
        pathname: "/",
      });
    },
    onError(err) {
      console.log(err.graphQLErrors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    variables: stateInput,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    userLogin();
  };

  return (
    <FormStyled onSubmit={onSubmit}>
      {loading && <Loading />}

      <Label htmlFor="email">
        Email
        <Input type="text" name="email" onChange={onChange} value={stateInput.email} error={Object.keys(errors).includes("email")} />
        {Object.keys(errors).includes("email") && <ErrorMessage>{errors["email"]}</ErrorMessage>}
      </Label>

      <Label htmlFor="password">
        Password
        <Input
          type="password"
          name="password"
          onChange={onChange}
          value={stateInput.password}
          error={Object.keys(errors).includes("password")}
        />
        {Object.keys(errors).includes("password") && <ErrorMessage>{errors["password"]}</ErrorMessage>}
      </Label>

      <Button>Sign In</Button>

      <Link href="/signup">
        <LinkAccount>You don't have an account ?</LinkAccount>
      </Link>
    </FormStyled>
  );
}
const FormStyled = styled.form`
  padding: 20px 0 100px;
  display: grid;
  gap: 20px;
`;

const Label = styled.label`
  display: grid;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 5px 10px;
  border: 1px solid ${(props) => (props.error ? "red" : "rgba(0, 0, 0, 0.2)")};
`;

const Button = styled.button`
  font-weight: 500;
  font-size: 1.2rem;
  text-transform: uppercase;
  border-radius: 1px;
  color: ${(props) => props.theme.white};
  justify-self: center;
  padding: 10px 35px;
  border: none;
  background-color: ${(props) => props.theme.grey};
`;

const LinkAccount = styled.a`
  text-align: center;
  text-decoration: underline;
  justify-self: center;
  cursor: pointer;
`;
