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
  width: 150px;
  height: 150px;
  border-radius: 30%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: absolute;
  top: 100px;
`

const boxVariants = {
  initial: (back: boolean) => (
    {
      x: back ? -500 : 500,
      opacity: 0,
      scale: 0
    }
  ),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 1 }
  },
  exit: (back: boolean) => (
    {
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: { duration: 1 }
    }
  )
}


function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const goNext = () => {
    setBack(false);
    setVisible(prev => prev === 10 ? 10 : prev + 1)
  };
  const goBefore = () => {
    setBack(true);
    setVisible(prev => prev === 1 ? 1 : prev - 1)
  };
  return (
    <Wrapper>
      <AnimatePresence>
        <Box custom={back} variants={boxVariants} initial="initial" animate="animate" exit="exit" key={visible}>{visible}</Box>
      </AnimatePresence>
      <button onClick={goBefore}>before</button>
      <button onClick={goNext}>next</button>
    </Wrapper>
  )

}

export default App;
