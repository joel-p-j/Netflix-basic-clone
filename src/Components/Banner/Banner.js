import React, { useEffect, useState } from "react";
import { API_KEY, imageUrl } from "../../constants/constants";
import "./Banner.css";
import axios from "../../axios";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`/trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const results = response.data.results;
        const randomMovie =
          results[Math.floor(Math.random() * results.length)];
        setMovie(randomMovie);
      })
      .catch(() => {
        console.log("Banner fetch failed");
      });
  }, []);

  const truncate = (text, max) =>
    text?.length > max ? text.substring(0, max - 1) + "…" : text;

  return (
    <header
  className="banner"
  style={{
    backgroundImage: movie?.backdrop_path
      ? `url(${imageUrl}${movie.backdrop_path})`
      : "none",
  }}
>
  <div className="banner-overlay" />

  <div className="banner-content">
    <h1 className="banner-title">
      {movie?.title || movie?.name || movie?.original_name}
    </h1>

    <div className="banner-buttons">
      <button className="btn play">▶ Play</button>
      <button className="btn list">+ My List</button>
    </div>

    <p className="banner-desc">
      {movie?.overview?.slice(0, 150)}...
    </p>
  </div>

  <div className="banner-fadeBottom" />
</header>

  );
}

export default Banner;
