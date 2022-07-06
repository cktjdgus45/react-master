import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
}

interface IHistroical {
    time_open: number
    time_close: number
    open: string
    high: string
    low: string
    close: string
    volume: string
    market_cap: number
}

interface ICandleData {
    x: Date,
    y: number[]
}

const Price = ({ coinId }: ChartProps) => {
    const { isLoading, data } = useQuery<IHistroical[]>(["price", "ohlcv", coinId], () => fetchCoinHistory(coinId))

    return (
        <>
            {isLoading ? "Loading Chart..." : (
                <ApexChart
                    type='candlestick'
                    height={350}
                    series={
                        [{
                            data: data?.map(data => {
                                return {
                                    x: new Date(data.time_close),
                                    y: [parseInt(data.open), parseInt(data.high), parseInt(data.low), parseInt(data.close)] as number[]
                                }
                            }) as unknown as ICandleData[]
                        }]
                    }
                    options={
                        {
                            chart: {
                                toolbar: {
                                    show: false,
                                },
                                background: "transparent"
                            },
                            grid: {
                                show: true,

                            },
                            theme: {
                                mode: 'dark',
                            },

                            xaxis: {
                                type: 'datetime',
                                categories: data?.map(date => date.time_close)
                            },
                            yaxis: {
                                tooltip: {
                                    enabled: true
                                }
                            }
                        }
                    }
                />
            )}
        </>
    )
}

export default Price;