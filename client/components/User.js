// Graphql Tools
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query me {
    me {
      _id
      email
      username
      createdAt
      role
    }
  }
`;

export default function User({ children }) {
  const payload = useQuery(CURRENT_USER_QUERY);
  return <div>{children(payload)}</div>;
}

export { CURRENT_USER_QUERY };
