// graphql Tools
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "./User";

// Styled css
import styled from "styled-components";

// Styled component
import Container from "./styles/Container";
import PageError from "./PageError";

// Component
import Form from "./Form/SignIn/Form";

export default function PleaseSignIn({ children, permissions = ["USER"], empty }) {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);

  if (data && !data.me && empty) return null;

  if (loading) return <div>Loading...</div>;
  if (data && !data.me) {
    return (
      <Container>
        <Inner>
          <p>Please, sign in before continuing.</p>
          <Form />
        </Inner>
      </Container>
    );
  }

  function hasPermission(user, permissionsNeeded) {
    const matchedPermissions = [];
    permissionsNeeded.forEach((element, index) => {
      if (element === user.role) {
        matchedPermissions.push(element);
      }
    });
    // if page is for user return the children
    if (permissionsNeeded.includes("USER")) return false;
    // if page is for ADMIN or ROOT return the children
    if (matchedPermissions.length) return false;
    // else return the error
    return true;
  }

  if (hasPermission(data.me, permissions) && empty) return null;

  if (hasPermission(data.me, permissions)) return <PageError>You have not permission !</PageError>;

  return children;
}

const Inner = styled.div`
  padding: 120px 0 80px;
  p {
    text-align: center;
    font-size: 2.4rem;
  }
`;
