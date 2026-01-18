import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import "./RowPost.css";
import axios from "../../axios";
import { imageUrl, API_KEY } from "../../constants/constants";

function RowPost({ title, url, isSmall }) {
  const [movies, setMovies] = useState([]);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch(() => {
        console.log("Network error");
      });
  }, [url]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const handleMovie = (id) => {
    if (videoId) {
      setVideoId("");
      return;
    }

    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length > 0) {
          setVideoId(response.data.results[0].key);
        } else {
          console.log("No trailer found");
        }
      });
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="posters">
        {movies.map((obj) => {
          if (!obj.backdrop_path) return null;

          return (
            <img
              key={obj.id}
              onClick={() => handleMovie(obj.id)}
              src={imageUrl + obj.backdrop_path}
              alt={obj.name || obj.title}
              className={isSmall ? "smallPoster" : "poster"}
            />
          );
        })}
      </div>

      {videoId && <Youtube opts={opts} videoId={videoId} />}
    </div>
  );
}

export default RowPost;
