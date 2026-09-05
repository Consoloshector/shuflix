import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from "./components/navbar";
import HeroBanner from './components/hero_banner'
import TvRow from "./components/tv_row";
import TvDetail from "./components/TV_detail";
import MovieRow from "./components/movie_row";
import MovieDetail from "./components/Movie_detail";
import MediaMore from "./components/media_more";


function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={
          <>
            <HeroBanner />
            <TvRow title={'Seriallar'} />
            <MovieRow title={'Filmlər'} />
          </>
        } />

        <Route path="/tv/:id" element={<TvDetail />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/media_more/:type" element={<MediaMore />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;