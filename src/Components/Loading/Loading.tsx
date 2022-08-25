import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useTime, useTransform } from 'framer-motion';

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
`;





const Loading = () => {
    const time = useTime();
    const opacity = useTransform(time, [0, 6000], [0, 1], { clamp: false });
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
                                style={{ opacity }}
                            >
                            </Box>)}
                    </Row>
                </AnimatePresence>
            </SliderWrapper>
        </>
    )
}
export default Loading;