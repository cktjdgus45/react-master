import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import styled from 'styled-components';
import Header from './Components/Header/Header';
import AuthService from './firebase/auth_service';
import Home from './Routes/Home';
import Intro from './Routes/Intro';
import Join from './Routes/Join';
import Login from './Routes/Login';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 60px;
`;

interface IAppProps {
  authService: AuthService
}

function App({ authService }: IAppProps) {
  return (
    <>
      <BrowserRouter>
        <Header authService={authService} />
        <Wrapper>
          <Routes>
            <Route path="/search/:mediaType/:id" element={<Search />} />
            <Route path="/search/:keyword" element={<Search />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movies/:movieId/:subject" element={<Home authService={authService} />} />
            <Route path="/movies/:movieId/" element={<Home authService={authService} />} />
            <Route path="/tvshows/:tvId/:subject" element={<Tv />} />
            <Route path="/tvshows/:tvId/" element={<Tv />} />
            <Route path="/tv" element={< Tv />} />
            <Route path="/" element={<Home authService={authService} />} />
          </Routes>
        </Wrapper>
        <Routes>
          <Route path="/react-master" element={<Intro />} />
          <Route path="/login" element={<Login authService={authService} />} />
          <Route path="/join" element={<Join authService={authService} />} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;
