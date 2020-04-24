import React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Container from "../../components/styles/Container";
import TitleH1 from "../../components/styles/Title";
import styled from "styled-components";
import Link from "next/link";

const GET_ITEMS_QUERY = gql`
  query getItems {
    getItems {
      _id
      title
      price
      image {
        public_id
        url
      }
    }
  }
`;

export default function all() {
  const { loading, error, data } = useQuery(GET_ITEMS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error : {error.graphQLErrors[0].extensions.general}</p>;

  return (
    <section>
      <Container>
        <TitleH1>All</TitleH1>
        <WrapperItems>
          {data.getItems.map((item, index) => (
            <Link
              href={{
                pathname: "/item",
                query: { id: item._id },
              }}
              key={index}
            >
              <a>
                <Item>
                  <img src={item.image[0].url} alt="" />
                  <InfoItem className="info-item">
                    <span className="title">{item.title}</span>
                    <span className="price">${item.price}</span>
                  </InfoItem>
                </Item>
              </a>
            </Link>
          ))}
        </WrapperItems>
      </Container>
    </section>
  );
}

const WrapperItems = styled.div`
  padding: 30px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  grid-row-gap: 50px;
`;

const Item = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`;

const InfoItem = styled.div`
  text-align: center;
  margin-top: -13px;
  .title {
    /* font-weight: 400; */
  }
  .price {
    font-weight: 400;
    margin-left: 20px;
  }
`;
