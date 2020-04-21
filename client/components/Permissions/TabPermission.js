import React, { useEffect } from "react";

// Tools Graphql
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ErrorMessage from "../ErrorMessage";
import styled from "styled-components";
import UserPermission from "./UserPermission";

const USERS_QUERY = gql`
  query users {
    users {
      _id
      username
      email
      role
    }
  }
`;

export default function TabPermission() {
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage>Error: {error.graphQLErrors[0].message}</ErrorMessage>;

  return (
    <Inner>
      <Table>
        <thead>
          <tr>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Role</Th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((element) => (
            <UserPermission key={element._id} {...element} />
          ))}
        </tbody>
      </Table>
    </Inner>
  );
}

const Inner = styled.div`
  padding: 100px 0;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: 2rem;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
