import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import styled from 'styled-components';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
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
            <Route path="/search/:mediaType/:id" element={<Search />} />
            <Route path="/search/:keyword" element={<Search />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movies/:movieId/:subject" element={<Home />} />
            <Route path="/movies/:movieId/" element={<Home />} />
            <Route path="/tvshows/:tvId/:subject" element={<Tv />} />
            <Route path="/tvshows/:tvId/" element={<Tv />} />
            <Route path="/tv" element={< Tv />} />
            <Route path="/" element={<Home />} />
          </Routes>
          {/* <Footer></Footer> */}
        </Wrapper>
      </BrowserRouter>
    </>
  )

}

export default App;
