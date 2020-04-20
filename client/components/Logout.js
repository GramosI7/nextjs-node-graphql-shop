import React from "react";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useRouter } from "next/router";

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

  const [userLogout, { loading }] = useMutation(SIGN_OUT_MUTATION, {
    update(_, { data }) {
      console.log(data);
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
