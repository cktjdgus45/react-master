import 'styled-components';

interface Black {
    veryDark,
    darker,
    lighter
}

interface White {
    lighter,
    darker
}

interface Device {
    mobileS,
    mobileM,
    mobileL,
    tablet,
    laptop,
    laptopL,
    desktop
}

declare module 'styled-components' {
    export interface DefaultTheme {
        red: string,
        black: Black,
        white: White,
        device: Device
    }
}