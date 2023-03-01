import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../components/Card";
import Layout from "../components/Layout";

import { setFavorites } from "../utils/redux/reducers/reducer";
import { MovieType } from "../utils/types/movie";

const Homepage = () => {
  const dispatch = useDispatch();
  const [datas, setDatas] = useState<MovieType[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  function getMovies(page: number) {
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=c38ad3ae2d784446ea3aabf37f6b5e58&language=en-US&page=${page}`)
      .then((data) => {
        const { results, total_pages } = data.data; // destructuring
        setDatas(results);
        setTotalPage(total_pages);
      })
      .catch((error) => {
        alert(error.toString());
      });
  }

  useEffect(() => {
    getMovies(1);
  }, []);

  function nextPage() {
    const newPage = page + 1;
    setPage(newPage);
    getMovies(newPage);
  }

  function previousPage() {
    const newPage = page - 1;
    setPage(newPage);
    getMovies(newPage);
  }

  function handleFavorite(data: MovieType) {
    const checkExist = localStorage.getItem("FavMovie");
    if (checkExist) {
      let parseFav: MovieType[] = JSON.parse(checkExist);
      parseFav.push(data);
      localStorage.setItem("FavMovie", JSON.stringify(parseFav));
      dispatch(setFavorites(parseFav));
    } else {
      localStorage.setItem("FavMovie", JSON.stringify([data]));
      alert("Movie added to favorite");
    }
  }

  return (
    <div>
      <>
        <Layout>
          <h1 className="text-center text-3xl py-10">Now Playing Movies</h1>
          <div className="grid grid-cols-4 gap-3 p-3">
            {datas.map((data: any, index) => {
              return <Card key={index} id={data.id} title={data.original_title} image={data.poster_path} labelButton="ADD TO FAVORITE" onClickFav={() => handleFavorite(data)} />;
            })}
          </div>
          <div className="btn-group flex justify-center py-5">
            <button disabled={page <= 1} className="btn" onClick={() => previousPage()}>
              «
            </button>
            <button className="btn">Page {page}</button>
            <button disabled={page === totalPage} className="btn" onClick={() => nextPage()}>
              »
            </button>
          </div>
        </Layout>
      </>
    </div>
  );
};

export default Homepage;
