import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import arrow from "../../public/svg/arrow-down.svg";
import cross from "../../public/svg/cross.svg";

export default function Hamburger({ open, handleHamburger }) {
  console.log(open);
  return (
    <AnimatePresence>
      {open && (
        <ContainerHamburger initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <CrossImg src={cross} alt="cross" onClick={() => handleHamburger(false)} />
          <HamburgerStyled initial="hidden" animate={open ? "visible" : "hidden"} variants={fadeRight}>
            <HamburgerTop>
              <div className="search">Search</div>
              <div className="account">Account</div>
            </HamburgerTop>
            <HamburgerLists>
              <HamburgerListItem>
                SHOP <ArrowImg src={arrow} alt="" />
              </HamburgerListItem>
              <HamburgerListItem>
                OUR WORLDS <ArrowImg src={arrow} alt="" />
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
      duration: 0.3,
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
  grid-template-rows: repeat(2, 50px);
`;

const HamburgerListItem = styled.li`
  cursor: pointer;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
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
