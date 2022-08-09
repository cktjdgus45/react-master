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

const Grid = styled(motion.div)`
  display: grid;
  width: 50vw;
  gap: 10px;
  grid-template-columns: repeat(3,1fr);
  div:first-child,
  div:last-child{
    grid-column: span 2;
  }
`

const Box = styled(motion.div)`
  height: 150px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`

const Overlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height:100%;
  position:absolute;
`

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const items = ['1', '2', '3', '4'];
  return (
    <Wrapper>
      <Grid>
        {items.map(item => (
          <Box onClick={() => setSelectedId(item)} key={item} layoutId={item}>{item}</Box>
        ))}
      </Grid>
      <AnimatePresence>
        {
          selectedId ?
            <Overlay onClick={() => setSelectedId(null)} initial={{ backgroundColor: 'rgba(0,0,0,0)' }} animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }} exit={{ backgroundColor: 'rgba(0,0,0,0)' }}>
              <Box layoutId={selectedId} style={{ width: 400, height: 200 }}>{selectedId}</Box>
            </Overlay> : null
        }
      </AnimatePresence>
    </Wrapper>
  )

}

export default App;
