import axios from "./axios";
import React, { useEffect, useState } from "react";
import "./row.css";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movie, setMovie] = useState([]);
  const base_url = "http://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovie(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <Grid container spacing={2} className="row_posters">
        {movie.slice(0, 6).map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <Grid xs={4} className="item_poster">
                <Link to={`/movie-detail/${movie.id}`}>
                  <img
                    className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                    key={movie.id}
                    src={`${base_url}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name}
                  />
                  <h1
                    style={{
                      color: "orange",
                      display: "block",
                      fontSize: "1.5rem",
                      fontWeight: 400,
                      transition: "transform 450ms",
                    }}
                  >
                    {movie.title}
                  </h1>
                </Link>
              </Grid>
            )
        )}
      </Grid>
    </div>
  );
}

export default Row;
