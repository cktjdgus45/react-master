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

declare module 'styled-components' {
    export interface DefaultTheme {
        red: string,
        black: Black,
        white: White
    }
}