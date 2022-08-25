import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SliderWrapper = styled(motion.div)`
    
`

const Row = styled(motion.div)`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6,1fr);
    width: 100%;
`;

const Box = styled(motion.div)`
    background-color:rgb(44,44,44);
    height: 200px;
    opacity: 0;
`;


const Loading = () => {
    const getOpacity = (index: number) => {
        return 1 / index;
    }
    return (
        <>
            <SliderWrapper >
                <AnimatePresence >
                    <Row >
                        {[1, 2, 3, 4, 5, 6].map((item, index) =>
                            <Box
                                custom={index}
                                key={index}
                                transition={{ duration: 4 }}
                                style={{ opacity: getOpacity(index) }}
                            >
                            </Box>)}
                    </Row>
                </AnimatePresence>
            </SliderWrapper>
        </>
    )
}
export default Loading;