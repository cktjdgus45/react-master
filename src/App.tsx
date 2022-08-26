import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import styled from 'styled-components';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 60px;
`;

function App() {

  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <Header />
          <Routes>
            <Route path="/tv" element={< Tv />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:keyword" element={<Search />} />
            <Route path="/" element={<Home />} />
            <Route path="/movies/:movieId/:subject" element={<Home />} />
            <Route path="/movies/:movieId/" element={<Home />} />
            <Route path="/tvshows/:tvId/:subject" element={<Tv />} />
            <Route path="/tvshows/:tvId/" element={<Tv />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  )

}

export default App;
