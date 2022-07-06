import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams, Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface RouteState {
    name: string;
}

interface RouteParams {
    coinId: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}
const Loader = styled.span`
    text-align: center;
    display:block;
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
  background-color: #3F4E4F;
`;

const Button = styled.button`
    position: absolute;
    left: 1rem;
    top: 1rem;
    font-size: 20px;
    border-radius: 15px;
    border: none;
    color: ${(props) => props.theme.bgColor};
    &:hover{
        color: ${(props) => props.theme.accentColor};
    }
`

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  padding: 7px 0px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.modalColor};
  color: ${(props) =>
        props.isActive ? props.theme.textColor : props.theme.accentColor};
  a {
    display: block;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.modalColor};
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  text-align: center;
`;

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

const Coin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as RouteState;
    const { coinId } = useParams() as unknown as RouteParams;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId],
        () => fetchCoinTickers(coinId),
    );
    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <></>
                <Title>
                    <Button onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price</span>
                            <span>{`${tickersData?.quotes.USD.price.toFixed(3)}K`}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>
                    <Routes>
                        <Route path="price" element={<Price coinId={coinId} />}>
                        </Route>
                        <Route path="chart" element={<Chart coinId={coinId} />}>
                        </Route>
                    </Routes>
                </>
            )}
        </Container>
    )
}

export default Coin;