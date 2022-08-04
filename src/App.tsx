import styled, { } from 'styled-components';
import { motion, AnimatePresence } from "framer-motion"
import { useState } from 'react';


const Wrapper = styled(motion.div)`
background: linear-gradient(135deg, #e09, #d0e);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 500px;
  height: 200px;
  border-radius: 30%;
  background-color: #fff;
  margin-bottom: 30px;
`

const boxVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1, rotateZ: 360 },
  exit: { opacity: 0, y: 20 }
}


function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing(prev => !prev);
  return (
    <Wrapper>
      <button onClick={toggleShowing}>Click</button>
      <AnimatePresence>
        {showing ? <Box variants={boxVariants} initial="initial" animate="animate" exit="exit" /> : null}
      </AnimatePresence>
    </Wrapper>
  )

}

export default App;
