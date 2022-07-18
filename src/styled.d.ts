import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        boardColor: string;
        cardColor: string;
    }
}