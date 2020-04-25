// Styled-css
import styled from "styled-components";
import { motion } from "framer-motion";

// TODO: times keyframes and display none
export default function SuccessMessage({ children }) {
  return (
    <WrapperMessage
      animate={{ y: [-70, 0, 0, -70], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 4,
        ease: [0.6, 0.05, -0.01, 0.9],
        // times: [0.8, 3, 0.2],
      }}
    >
      {children}
    </WrapperMessage>
  );
}

const WrapperMessage = styled(motion.div)`
  position: absolute;
  top: 250px;
  left: 38%;
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
