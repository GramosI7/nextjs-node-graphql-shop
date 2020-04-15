import { useState } from "react";
import styled from "styled-components";

// Styled Component
import Container from "../styles/Container";

// Component
import ItemDropdown from "./ItemDropdown";
import Hamburger from "./Hamburger";

import Link from "next/link";

const Header = styled.header`
  font-size: 1.2rem;
  font-weight: 300;
  padding: 20px 0;
`;

const Inner = styled.div`
  display: none;
  grid-template-columns: 1.8fr 2fr;
  font-size: 1.2rem;
  @media (min-width: 935px) {
    display: grid;
  }
  img {
    width: 112px;
    cursor: pointer;
  }
`;

const LeftSide = styled.div`
  display: grid;
  grid-template-columns: 200px 0.7fr;
  align-items: center;
  justify-items: center;
`;

const NavLists = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  justify-items: center;
  gap: 40px;
  list-style: none;
`;

const RightSide = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100px);
  justify-content: flex-end;
  justify-items: center;
  align-items: center;
`;

// Responsive
const InnerResponsive = styled.div`
  display: none;
  grid-template-columns: 200px 1fr;
  align-items: center;
  @media (max-width: 935px) {
    display: grid;
  }
  img {
    cursor: pointer;
    justify-self: center;
    width: 112px;
  }
`;

const LogoHamburger = styled.div`
  justify-self: flex-end;
  display: grid;
  height: 20px;
  margin-right: 35px;
  cursor: pointer;
  .line {
    width: 20px;
    height: 1px;
    background-color: #000;
  }
`;

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <Header>
      <Container fluid>
        <Inner>
          <LeftSide>
            <Link href="/">
              <img src={require("../../public/images/shop-logo-ryder.png")} alt="" />
            </Link>
            <nav>
              <NavLists>
                <ItemDropdown title="SHOP" list={["all", "new-arrivals", "dresses", "australien-wheels", "tops", "bottoms", "knitwears"]} />
                <ItemDropdown title="OUR WORLD" list={["about-us", "our-store", "for-our-planet", "rendez-vous"]} />
              </NavLists>
            </nav>
          </LeftSide>
          <RightSide>
            <div className="header__search">
              <Link href="/create">
                <a>CREATE</a>
              </Link>
            </div>
            <div className="header__search">SEARCH</div>
            <div className="header__account">
              <Link href="/account">
                <a>ACCOUNT</a>
              </Link>
            </div>
            <div className="header__cart">CART</div>
          </RightSide>
        </Inner>
        {/* Responsive */}
        <InnerResponsive>
          <Link href="/">
            <img src={require("../../public/images/shop-logo-ryder.png")} alt="" />
          </Link>
          <LogoHamburger onClick={() => setOpen(!open)}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </LogoHamburger>
          <Hamburger open={open} handleHamburger={setOpen} />
        </InnerResponsive>
        {/* Responsive */}
      </Container>
    </Header>
  );
}
