import React, { } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet-async';
import { useSetRecoilState } from 'recoil';
import { isDarkState } from '../atom';

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
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

const ToggleButton = styled.button`
    position:absolute;
    left: 1.5rem;
    top: 1.5rem;
    border: none;
    background-color: ${(props) => props.theme.modalColor};
    border-radius: 15px;
    padding: 10px;
`

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.modalColor};
    color:${(props) => props.theme.textColor};
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 15px;
    a{
        transition:color 0.3s ease-in;
        display: block;
    }
    &:hover{
        color:${(props) => props.theme.accentColor}
    }
`;



const Coins = () => {
    const { isLoading, data } = useQuery<[ICoin]>("allCoins", fetchCoins);
    const setThemeState = useSetRecoilState(isDarkState);
    const toggleTheme = () => {
        setThemeState((themeState) => !themeState);
    }
    return (
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <Header>
                <ToggleButton onClick={toggleTheme}>Toggle Mode</ToggleButton>
                <Title>Coins</Title>
            </Header>
            {isLoading ? <Loader>Loading...</Loader> : (<CoinsList>
                {data?.slice(0, 100).map(coin => (
                    <Coin key={coin.id}>
                        <Link
                            to={`${coin.id}`}
                            state={{ name: coin.name }}>
                            <Img alt="coinImage" src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}></Img>
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                )
                )}
            </CoinsList>)}
        </Container>
    )
}

export default Coins;