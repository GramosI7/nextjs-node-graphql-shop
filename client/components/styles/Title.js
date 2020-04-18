import styled from "styled-components";

const TitleH1 = styled.h1`
  margin-top: 40px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
`;

export const TitleH4 = styled.h4`
  margin-top: 40px;
  text-align: ${(props) => (props.center ? "center" : "inherit")};
  text-transform: uppercase;
  font-weight: 400;
`;

export default TitleH1;
