import styled, { } from 'styled-components';
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from 'react';




const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background:linear-gradient(135deg,rgb(238, 0, 153),rgb(221, 0, 238));
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

const boxVariants = {
  drag: { backgroundColor: 'rgba(255,255,255,0.4)' }
}

function App() {
  const inputRange = [-700, 0, 700];
  const outputRange = [-360, 0, 360];
  const inputColor = [-700, 700]
  const outputColor = [
    "linear-gradient(135deg,rgb(255, 139, 139),rgb(235, 71, 71))",
    "linear-gradient(135deg, rgb(122, 134, 182),rgb(73, 92, 131))",
  ];
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, inputRange, outputRange);
  const background = useTransform(x, inputColor, outputColor);
  useEffect(() => {
    x.onChange(() => console.log(x.get()));
  }, [x])
  return (
    <Wrapper style={{ background }}>
      <Box style={{ x, rotateZ }} variants={boxVariants} drag='x' dragSnapToOrigin whileDrag='drag' />
    </Wrapper>
  )

}

export default App;
