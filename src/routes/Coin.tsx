import React from 'react';
import { useParams } from 'react-router-dom';

const Coin = () => {
    const { coinId } = useParams();
    return (
        <>
            <>{coinId}</>
        </>
    )
}

export default Coin;