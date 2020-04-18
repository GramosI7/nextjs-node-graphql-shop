import styled from "styled-components";

const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  height: 100%;
  font-weight: 300;
  font-size: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Loading() {
  return (
    <FixedContainer>
      <Title>Loading ...</Title>
    </FixedContainer>
  );
}
