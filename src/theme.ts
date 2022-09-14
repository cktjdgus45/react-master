import { DefaultTheme } from 'styled-components';

const sizes = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
};

export const theme: DefaultTheme = {
    red: '#E50914',
    black: {
        veryDark: '#141414',
        darker: '#181818',
        lighter: '#2F2F2F'
    },
    white: {
        lighter: '#FFFFFF',
        darker: '#E5E5E5'
    },
    device: {
        mobileS: `(max-width: ${sizes.mobileS})`,
        mobileM: `(max-width: ${sizes.mobileM})`,
        mobileL: `(max-width: ${sizes.mobileL})`,
        tablet: `(max-width: ${sizes.tablet})`,
        laptop: `(max-width: ${sizes.laptop})`,
        laptopL: `(max-width: ${sizes.laptopL})`,
        desktop: `(max-width: ${sizes.desktop})`,
    }
}


