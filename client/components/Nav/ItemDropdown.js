// Styled-css
import styled from "styled-components";

// Link nextjs
import Link from "next/link";

// Image Arrow
import arrow from "../../public/svg/arrow-down.svg";

const ItemDropdownStyled = styled.div`
  position: relative;
  cursor: pointer;
  &:hover .dropdown {
    transform: scaleY(1);
  }
  .dropdown {
    transition: transform 0.2s ease;
    transform: scaleY(0);
    transform-origin: top center;
    position: absolute;
    top: 100%;
    left: -30px;
    ul {
      min-width: 200px;
      list-style: none;
      background-color: #fff;
      display: grid;
      li {
        padding: 10px 5px;
        text-transform: uppercase;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const ArrowImg = styled.img`
  width: 12px !important;
  height: 12px;
  margin-left: 5px;
  padding-top: 5px;
  display: inline;
  transform-origin: center center;
  transition: transform 0.3s ease;
  ${ItemDropdownStyled}:hover & {
    transform: rotate(180deg);
    padding-bottom: 5px;
    padding-top: 0px;
  }
`;

export default function ItemDropdown({ title, list }) {
  return (
    <ItemDropdownStyled>
      {title}
      <ArrowImg src={arrow} alt="" />
      <div className="dropdown">
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <Link href={`/items/${item}`}>
                <a>{item}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ItemDropdownStyled>
  );
}
