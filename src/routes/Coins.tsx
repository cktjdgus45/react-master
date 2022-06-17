import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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


const Coins = () => {
    const [coins, setCoins] = useState<ICoin[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await fetch('https://api.coinpaprika.com/v1/coins');
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })()

    }, [])
    console.log(coins)
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : (<CoinsList>
                {coins.map(coin => (
                    <Coin key={coin.id}>
                        <Link to={`${coin.id}`}>{coin.name} &rarr;</Link>
                    </Coin>
                )
                )}
            </CoinsList>)}
        </Container>
    )
}

export default Coins;