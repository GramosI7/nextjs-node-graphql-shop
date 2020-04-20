// Styled-css
import styled from "styled-components";

// Styled component
import Container from "./styles/Container";

export default function Footer() {
  return (
    <FooterStyled>
      <Container fluid>
        <Inner>
          <Lists>
            <li>CUSTOMER CARE</li>
            <li>CONTACT</li>
            <li>SHIPPING & RETURNS</li>
            <li>FAQ</li>
            <li>AFTERPAY</li>
            <li>ZIPPAY</li>
          </Lists>
          <Lists>
            <li>INFO</li>
            <li>SIZE GUIDE</li>
            <li>STOCKISTS</li>
            <li>WHOLESALE</li>
            <li>SUSTAINABILITY</li>
            <li>1% FOR THE PLANET</li>
            <li>PRIVACY POLICY</li>
          </Lists>
          <Lists>
            <li>FOLLOW US</li>
            <li>INSTAGRAM</li>
            <li>FACEBOOK</li>
            <li>PINTEREST</li>
            <li>NEWSLETTER</li>
          </Lists>
          <Lists>
            <li>STORE</li>
            <li>126 CUBITT ST, CREMORNE 3121</li>
            <li>INFO@RYDERLABEL.COM</li>
            <li>(03) 9428 0008</li>
          </Lists>
        </Inner>
      </Container>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
  font-size: 1rem;
  font-weight: 300;
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  justify-content: center;
  @media (max-width: 660px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Lists = styled.ul`
  margin-top: 20px;
  list-style: none;
  display: grid;
  grid-template-rows: repeat(auto-fit, 29px);
  @media (max-width: 660px) {
    justify-items: center;
  }
  li {
    padding: 5px;
    &:first-child {
      font-weight: 600;
    }
  }
`;
