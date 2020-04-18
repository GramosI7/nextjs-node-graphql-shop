import React from "react";
import styled from "styled-components";

export default function SuccessMessage({ children }) {
  return <WrapperMessage>{children}</WrapperMessage>;
}

const WrapperMessage = styled.div`
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  text-align: center;
  font-weight: 400;
  font-size: 1.8rem;
  padding: 10px 0;
  width: 340px;
  color: #fff;
  background-color: #55a966;
  border: 3px solid #8fd69d;
`;
