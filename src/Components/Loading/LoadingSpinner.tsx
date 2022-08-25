import React from 'react';
import styled from 'styled-components';

const LoadingSpeaner = styled.div`
    width: 48px;
    height: 48px;
    border: 5px solid ${props => props.theme.black.lighter};
    border-bottom-color: #E50914;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotate 1s linear infinite;
    position: absolute;
    right: 0;
    left: 0; 
    top: 300px;
    margin: 0 auto; 
    @keyframes rotate {
        0%{
             transform: rotate(0deg);
        }50%{
            transform: rotate(180deg);
        }100%{
            transform: rotate(360deg);
        }
    }
    `

const LoadingSpinner = () => {
    return (
        <LoadingSpeaner />
    )
}
export default LoadingSpinner;