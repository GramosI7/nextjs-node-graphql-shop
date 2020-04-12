import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import arrow from "../../public/svg/arrow-down.svg";
import cross from "../../public/svg/cross.svg";
import Link from "next/link";

export default function Hamburger({ open, handleHamburger }) {
  const arrayOne = ["all", "new-arrivals", "dresses", "australien-wheels", "tops", "bottoms", "knitwears"];
  const arrayTwo = ["about-us", "our-store", "for-our-planet", "rendez-vous"];
  return (
    <AnimatePresence>
      {open && (
        <ContainerHamburger initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <CrossImg src={cross} alt="cross" onClick={() => handleHamburger(false)} />
          <HamburgerStyled initial="hidden" exit="hidden" animate={open ? "visible" : "hidden"} variants={fadeRight}>
            <HamburgerTop>
              <div className="search">Search</div>
              <div className="account">Account</div>
            </HamburgerTop>
            <HamburgerLists>
              <HamburgerListItem>
                <div className="flex">
                  SHOP <ArrowImg src={arrow} alt="" />
                </div>
                <DropdownLists>
                  {arrayOne.map((item, index) => (
                    <li key={index}>
                      <Link href={`/items/${item}`}>
                        <a>{item}</a>
                      </Link>
                    </li>
                  ))}
                </DropdownLists>
              </HamburgerListItem>
              <HamburgerListItem>
                <div className="flex">
                  OUR WORLDS <ArrowImg src={arrow} alt="" />
                </div>
                <DropdownLists>
                  {arrayTwo.map((item, index) => (
                    <li key={index}>
                      <Link href={`/items/${item}`}>
                        <a>{item}</a>
                      </Link>
                    </li>
                  ))}
                </DropdownLists>
              </HamburgerListItem>
            </HamburgerLists>
          </HamburgerStyled>
        </ContainerHamburger>
      )}
    </AnimatePresence>
  );
}

const fadeRight = {
  visible: {
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.1,
    },
  },
  hidden: {
    x: "200%",
    transition: {
      duration: 0.5,
      delay: 0.1,
    },
  },
};

const fade = {
  visible: {
    display: "block",
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  hidden: {
    display: "none",
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const ContainerHamburger = styled(motion.div)`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const HamburgerStyled = styled(motion.div)`
  height: 100vh;
  width: 330px;
  background-color: #fff;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 1.6rem;
`;

const HamburgerTop = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  height: 100px;
  text-transform: uppercase;
  .search {
    cursor: pointer;
    justify-self: flex-start;
    padding: 20px 15px;
  }
  .account {
    cursor: pointer;
    justify-self: flex-end;
    padding: 20px 15px;
  }
`;

const HamburgerLists = styled.ul`
  list-style: none;
  display: grid;
`;

const DropdownLists = styled.ul`
  text-transform: uppercase;
  width: 100%;
  list-style: none;
  display: grid;
  grid-auto-rows: 40px;
  align-items: center;
  visibility: hidden;
  grid-auto-rows: 0px;
  li {
    height: 100%;
    padding-left: 30px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: grid;
    align-items: center;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const HamburgerListItem = styled.li`
  position: relative;
  cursor: pointer;
  padding: 0 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  ${DropdownLists}:hover & {
    visibility: visible;
    grid-auto-rows: 40px;
  }
  .flex {
    padding: 10px 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ArrowImg = styled.img`
  width: 12px !important;
  height: 12px;
  margin-right: 5px;
  padding-top: 5px;
  display: inline;
  transform-origin: center center;
  transition: transform 0.3s ease;
`;

const CrossImg = styled.img`
  cursor: pointer;
  width: 12px !important;
  height: 12px;
  position: absolute;
  right: 350px;
  top: 20px;
`;
