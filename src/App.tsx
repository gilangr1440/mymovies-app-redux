import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Detail from "./pages/Detail";
import Favorite from "./pages/Favorite";
import { useDispatch } from "react-redux";
import { setFavorites } from "./utils/redux/reducers/reducer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getFavMovies = localStorage.getItem("FavMovie");
    if (getFavMovies) {
      dispatch(setFavorites(JSON.parse(getFavMovies)));
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movie/:id_movie" element={<Detail />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
