import { useState } from "react";

// Styled-css
import styled from "styled-components";

// Image Arrow
import arrow from "../../public/svg/arrow-down.svg";

// Link nextjs
import Link from "next/link";

export default function HamburgerItemDropdown({ title, items }) {
  const [open, setOpen] = useState(false);
  return (
    <HamburgerListItem>
      <div className="flex" onClick={() => setOpen(!open)}>
        {title} <ArrowImg src={arrow} alt="" />
      </div>
      <DropdownLists open={open}>
        {items.map((item, index) => (
          <li key={index}>
            <Link href={`/items/${item}`}>
              <a>{item}</a>
            </Link>
          </li>
        ))}
      </DropdownLists>
    </HamburgerListItem>
  );
}

const DropdownLists = styled.ul`
  text-transform: uppercase;
  width: 100%;
  list-style: none;
  display: grid;
  align-items: center;
  transform-origin: top center;
  transition: all 0.3s ease-out;
  height: ${(props) => (props.open ? "auto" : "0")};
  overflow: hidden;
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
  text-transform: uppercase;
  .flex {
    transition: all 1s;
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
