// Styled-css
import styled from "styled-components";

// TODO: modern loading

export default function Loading() {
  return (
    <FixedContainer>
      <Icon />
    </FixedContainer>
  );
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto", background: "none" }}
      width="204"
      height="204"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#85a2b6"
        strokeDasharray="188.496 64.832"
        strokeWidth="5"
        transform="rotate(229.068 50 50)"
      >
        <animateTransform
          attributeName="transform"
          dur="1.1627906976744184s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  );
}

const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  height: 100%;
  font-weight: 300;
  font-size: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
