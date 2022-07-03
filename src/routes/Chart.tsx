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
    close: number
    volume: string
    market_cap: number
}

const Chart = ({ coinId }: ChartProps) => {
    console.log(coinId)
    const { isLoading, data } = useQuery<IHistroical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
    return (
        <>
            {isLoading ? "Loading Chart..." : (
                <ApexChart
                    type='line'
                    options={
                        {
                            stroke: {
                                curve: "smooth",
                                width: 4
                            },
                            chart: {
                                id: 'coin-price',
                                toolbar: {
                                    show: false,
                                },
                                background: "transparent"
                            },
                            grid: {
                                show: false
                            },
                            fill: {
                                type: 'gradient',
                                gradient: {
                                    gradientToColors: ['#FFFFFF'],
                                    stops: [0, 100],
                                },
                            },
                            colors: ['#FF0063'],
                            theme: {
                                mode: 'dark',
                            },
                            yaxis: {
                                labels: {
                                    show: false
                                }
                            },
                            xaxis: {
                                type: 'datetime',
                                labels: {
                                    show: false,
                                    datetimeFormatter: { month: "mmm yy" }
                                },
                                axisTicks: {
                                    show: false
                                },
                                axisBorder: {
                                    show: false
                                },
                                categories: data?.map(date => date.time_close)
                            },
                            tooltip: {
                                y: {
                                    formatter: (value) => `${value.toFixed(0)}K`
                                }
                            }
                        }
                    }
                    width="500"
                    height="300"
                    series={
                        [
                            {
                                name: '종가',
                                data: data?.map(price => price.close) as number[],
                            },
                        ]
                    }
                />)}
        </>
    )
}

export default Chart;