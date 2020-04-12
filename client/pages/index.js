import React from "react";
// import { Query } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Form from "../components/Form";

const ALL_ITEM_QUERY = gql`
  {
    getItems {
      title
      description
      price
    }
  }
`;

export default function index() {
  const { loading, error, data } = useQuery(ALL_ITEM_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error}`;
  return (
    <div>
      <h1>Home Page !</h1>
      <p>I found {data.getItems.length} Item</p>
      <Form />
    </div>
  );
}

export { ALL_ITEM_QUERY };
