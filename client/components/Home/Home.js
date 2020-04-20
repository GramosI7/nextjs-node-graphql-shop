// Router next
import Link from "next/link";

// Graphql Tools
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// Styled-css
import styled from "styled-components";

const LIMIT_ITEM_QUERY = gql`
  query getLimitItem($limit: Int!) {
    getLimitItem(limit: $limit) {
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

export default function Home() {
  const { loading, error, data } = useQuery(LIMIT_ITEM_QUERY, {
    variables: { limit: 10 },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error : {error}</p>;

  return (
    <div>
      {data.getLimitItem.map((item, index) => (
        <WrapperImg key={index}>
          {item.image.slice(0, 2).map((img) => (
            <Link
              key={img.public_id}
              href={{
                pathname: "/item",
                query: { id: item._id },
              }}
            >
              <a>
                <img key={img.public_id} src={img.url} alt="" />
              </a>
            </Link>
          ))}
        </WrapperImg>
      ))}
    </div>
  );
}

const WrapperImg = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  padding: 30px 0;
  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
  img {
    cursor: pointer;
    width: 100%;
  }
`;
