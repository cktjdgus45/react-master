import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
    color : ${(props) => props.theme.textColor};
    font-size: 48px;
`
const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height:10vh;
    display:flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.btnColor};
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


const coins = [{
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
},
{
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
},
{
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
},]


const Coins = () => {
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            <CoinsList>
                {coins.map(coin => (
                    <Coin key={coin.id}>
                        <Link to={`${coin.id}`}>{coin.name} &rarr;</Link>
                    </Coin>
                )
                )}
            </CoinsList>
        </Container>
    )
}

export default Coins;