import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    color : ${(props) => props.theme.textColor};
`

const Coins = () => {
    return (
        <>
            <Title>코인</Title>
        </>
    )
}

export default Coins;