import React, { useState, useEffect, useRef } from "react";

// Styled-css
import styled from "styled-components";

// Graphql
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const UPDATE_PERMISSION_MUTATION = gql`
  mutation UPDATE_PERMISSION_MUTATION($_id: ID!, $permission: Permission!) {
    updatePermission(_id: $_id, permission: $permission) {
      _id
      username
      email
      role
      createdAt
    }
  }
`;

export default function UserPermission({ _id, username, email, role }) {
  const [stateRole, setStateRole] = useState(role);
  const isFirstRun = useRef(true);

  const [updatePermission, { loading }] = useMutation(UPDATE_PERMISSION_MUTATION, {
    update(_, { data }) {
      console.log(data);
    },
    onError(err) {
      console.log(err.graphQLErrors);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { _id, permission: stateRole },
  });

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    updatePermission();
  }, [stateRole]);

  function handleChangePermission() {
    setStateRole(stateRole === "ADMIN" ? "USER" : "ADMIN");
  }
  return (
    <tr>
      <Td>{username}</Td>
      <Td>{email}</Td>
      <Td>
        <Checkbox type="checkbox" onChange={handleChangePermission} checked={stateRole === "ADMIN" ? true : false} />
        {stateRole}
      </Td>
    </tr>
  );
}

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Checkbox = styled.input`
  margin: 0 20px;
`;
