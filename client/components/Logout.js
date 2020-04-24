// Tools Graphql
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// Linj nextjs
import { useRouter } from "next/router";

// QUERY USER
import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation logout {
    logout {
      message
    }
  }
`;

export default function Logout() {
  const router = useRouter();

  const [userLogout] = useMutation(SIGN_OUT_MUTATION, {
    update(_, { data }) {
      console.log("logout", data);
      router.push({
        pathname: "/",
      });
    },
    onError(err) {
      console.log(err.graphQLErrors);
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return <div onClick={() => userLogout()}>LOGOUT</div>;
}
