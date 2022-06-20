import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

interface RouteState {
    name: string;
}

const Loader = styled.span`
    text-align: center;
    display:block;
`

const Title = styled.h1`
    color : ${(props) => props.theme.textColor};
    font-size: 48px;
`
const Container = styled.div`
    padding: 0px 20px;
`;

const Img = styled.img`
    width:35px;
    height:35px;
    margin-right:10px;
`

const Header = styled.header`
    height:10vh;
    display:flex;
    justify-content: center;
    align-items: center;
`;

const Coin = () => {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams();
    const location = useLocation();
    const state = location.state as RouteState;

    return (
        <Container>
            <Header>
                <Title>{state?.name || 'Loading...'}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : null}
        </Container>
    )
}

export default Coin;