import styled, { } from 'styled-components';
import { motion } from "framer-motion"
import { useRef } from 'react';




const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
    width: 600px;
  height: 600px;
  background-color: rgba(255,255,255,0.4);
  border-radius: 40px;
  display:flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255,0.2);
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(2,1fr);
`;

const boxVariants = {
  tap: { borderRadius: "100px", scale: 1 },
  drag: { backgroundColor: 'rgba(255,255,255,0.4)' }
}

function App() {
  const constraintRef = useRef(null);
  return (
    <Wrapper>
      <BiggerBox ref={constraintRef}>
        <Box variants={boxVariants} drag dragConstraints={constraintRef} whileTap='tap' whileDrag='drag' />
      </BiggerBox>
    </Wrapper>
  )

}

export default App;
