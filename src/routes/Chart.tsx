import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';

interface ChartProps {
    coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
    console.log(coinId)
    const { isLoading, data } = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId))
    return (
        <>
            <h1>chart</h1>
        </>
    )
}

export default Chart;