import styled, { } from 'styled-components';
import { motion } from "framer-motion"




const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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


function App() {

  return (
    <Wrapper>
      <Box whileHover={{ rotateZ: 90, scale: 1.5 }} whileTap={{ borderRadius: "100px", scale: 1 }} />
    </Wrapper>
  )

}

export default App;
