import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from './theme';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthService from './firebase/auth_service';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GlobalStyle = createGlobalStyle`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
html{
	&::-webkit-scrollbar{
        width: 0.0000000001px;
	} 
	&::-webkit-scrollbar-thumb{
        opacity:0;
        pointer-events: none;
        z-index: -99999;
	}
	&::-webkit-scrollbar-track{
        opacity:0;
        pointer-events:none;
        z-index : -99999;
	} 
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  line-height: 1.2;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  color:${props => props.theme.white.darker};
  background-color: black;
  overflow-x: hidden;
}
a {
  text-decoration:none;
  color:inherit;
}
input{
  border: none;
  outline: none;
}

button{
  cursor: pointer;
}

`;

const authService = new AuthService();

const queryClient = new QueryClient();

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App authService={authService} />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);

