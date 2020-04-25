// Tools Graphql
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// Styled-css
import styled from "styled-components";

// Linj nextjs
import Link from "next/link";
import { useRouter } from "next/router";

// Styled Components
import Container from "./styles/Container";
import { TitleH4 } from "./styles/Title";

// Components
import GuideSize from "./GuideSize";
import SuccessMessage from "./SuccessMessage";
import PleaseSignIn from "./PleaseSignIn";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

const ITEM_QUERY = gql`
  query getItem($_id: ID!) {
    getItem(_id: $_id) {
      _id
      title
      description
      price
      image {
        public_id
        url
      }
    }
  }
`;

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($_id: ID!) {
    deleteItem(_id: $_id) {
      _id
      title
      description
      price
    }
  }
`;

// TODO: Format price with function in utils
export default function PageItem({ id, message }) {
  const { loading, error, data } = useQuery(ITEM_QUERY, {
    variables: { _id: id },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error : {error.graphQLErrors[0].extensions.general}</p>;

  const { getItem } = data;

  return (
    <Container>
      {message && <SuccessMessage>{message}</SuccessMessage>}
      <Inner>
        <PleaseSignIn permissions={["ROOT", "ADMIN"]} empty>
          <ButtonDelete id={getItem._id} />
        </PleaseSignIn>

        <TopImg src={getItem.image[0].url} alt="image clothes" />
        <TitleH4>{getItem.title}</TitleH4>
        <WrapperPrice>
          <LeftSide>
            <p className="price">$ {getItem.price}</p>
            <p className="paiement-x4">or make 4 interest-free payments of ${getItem.price / 4} AUD fortnightly with Afterpay</p>
          </LeftSide>

          <RigthSide>
            <div className="inner">
              <Button>ADD TO CART</Button>
              <span>
                <Link href="/info-paiement">
                  <a>More Info</a>
                </Link>
              </span>
            </div>
          </RigthSide>
        </WrapperPrice>
        <Description dangerouslySetInnerHTML={{ __html: getItem.description }} />
        <ContainerSizeGuide>
          <GuideSize />
          <Link href="/sizeguide">
            <a className="link-size">Size guide</a>
          </Link>
        </ContainerSizeGuide>
        <ContainerImgBottom>
          <img src={getItem.image[1].url} alt="image clothes" />
          <img src={getItem.image[2].url} alt="image clothes" />
        </ContainerImgBottom>
      </Inner>
    </Container>
  );
}

const Inner = styled.div`
  padding: 40px 0;
`;

const TopImg = styled.img`
  display: block;
  margin: 0 auto;
  @media (max-width: 680px) {
    width: 100%;
  }
`;

const WrapperPrice = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 50px;
  @media (max-width: 680px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const LeftSide = styled.div`
  .price {
    font-weight: 300;
    font-size: 1.4rem;
  }
  .paiement-x4 {
    font-size: 1.2rem;
  }
`;

const RigthSide = styled.div`
  display: grid;
  align-items: flex-end;
  @media (max-width: 680px) {
    margin-top: 10px;
  }
  .inner {
    justify-self: flex-end;
    display: grid;
    height: 100%;
    @media (max-width: 680px) {
      justify-self: inherit;
    }
  }
  span {
    font-size: 1.2rem;
    text-decoration: underline;
    justify-self: center;
  }
`;

const Button = styled.button`
  justify-self: flex-end;
  color: ${(props) => props.theme.grey};
  font-size: 1.2rem;
  padding: 10px 40px;
  font-weight: 700;
  border: 1px solid ${(props) => props.theme.grey};
  background-color: #fff;
  @media (max-width: 680px) {
    width: 100%;
    justify-self: center;
  }
`;

const Description = styled.div`
  font-size: 1.6rem;
  line-height: 1.4;
`;

const ContainerSizeGuide = styled.div`
  margin: 30px 0;
  .link-size {
    text-decoration: underline;
    font-size: 1.4rem;
  }
`;

const ContainerImgBottom = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  gap: 40px;
  @media (max-width: 680px) {
    grid-template-columns: repeat(1, 1fr);
  }
  img {
    width: 100%;
  }
`;

function ButtonDelete({ id }) {
  const router = useRouter();

  const [deleteItem, { loading, error }] = useMutation(DELETE_ITEM_MUTATION, {
    update(_, { data }) {
      console.log(data);
      router.push({
        pathname: "/",
      });
    },
    onError(err) {
      console.log(err.graphQLErrors);
    },
    variables: { _id: id },
  });

  return (
    <ContainerButtonEdit>
      {loading && <Loading />}
      <InnerButton>
        <Link
          href={{
            pathname: "/modify",
            query: { id },
          }}
        >
          <a>
            <button>Modify</button>
          </a>
        </Link>

        <button onClick={() => deleteItem()}>Delete</button>
      </InnerButton>
      {error && <ErrorMessage>Error: {error.graphQLErrors[0].extensions.general}</ErrorMessage>}
    </ContainerButtonEdit>
  );
}

const ContainerButtonEdit = styled.div`
  padding: 20px 0;
  text-align: center;
`;

const InnerButton = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 200px);
  gap: 20px;
  button {
    cursor: pointer;
    justify-self: center;
    font-size: 1.2rem;
    padding: 10px 40px;
    font-weight: 700;
    background-color: #fff;
    text-transform: uppercase;
    height: 40px;
    &:nth-child(1) {
      color: blue;
      border: 1px solid blue;
    }
    &:nth-child(2) {
      color: red;
      border: 1px solid red;
    }
  }
`;
