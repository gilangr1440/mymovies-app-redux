import React, { Component, FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface Movies {
  id: string;
  title: string;
  image: string;
  navigate?: any;
  params?: any;
  labelButton?: string;
  onClickFav?: () => void;
}

const Card: FC<Movies> = ({ id, title, image, labelButton, onClickFav }) => {
  const navigate = useNavigate();

  function onClickDetail() {
    navigate(`/movie/${id}`);
  }
  return (
    <div id={id} className="card card-compact w-50 bg-base-100 shadow-xl p-3">
      <figure>
        <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title cursor-pointer" onClick={() => onClickDetail()}>
          {title}
        </h2>
        <div className="card-actions justify-center">
          {/* <button className="btn btn-primary">Add to favorite</button> */}
          <Button label={labelButton} onClick={onClickFav} />
        </div>
      </div>
    </div>
  );
};

export default Card;
