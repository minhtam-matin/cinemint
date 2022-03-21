import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { Pagination } from "antd";
import Loader from "./loading/Loader";
import axios from "./axios";
import "./querry.css";
function QuerryPage() {
  let { key } = useParams();
  const [loading, setLoading] = useState();
  const base_url = "http://image.tmdb.org/t/p/original/";
  const [res, setRes] = useState();
  const [pages, setPage] = useState(1);
  const handleChange = (value) => {
    setPage(value);
  };
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const request = await axios.get(
        `search/multi?api_key=6e304c5c45d3e12cb557e11fb8d3cb77&language=en-US&query=${key}&page=${pages}&include_adult=false`
      );
      setRes(request?.data);
      setLoading(false);
      console.log(res);
    }

    fetchData();
  }, [key, pages]);
  return (
    <div style={{ backgroundColor: "#111" }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>
            Kết quả tìm kiếm cho '{key.replace("-", " ")}'
          </h1>
          <Grid container spacing={1} className="row_posters">
            {res?.results.map((movie) => (
              <Grid
                xs={6}
                className="item_querry animate__animated animate__zoomIn"
              >
                <Link
                  to={
                    movie.media_type === "tv"
                      ? `/tv-detail/${movie.id}`
                      : movie.media_type === "movie"
                      ? `/movie-detail/${movie.id}`
                      : `/person-detail/${movie.id}`
                  }
                >
                  <img
                    className={`row_poster`}
                    key={movie.id}
                    src={
                      movie.media_type === "person"
                        ? `${base_url}${movie.profile_path}`
                        : `${base_url}${movie.poster_path}`
                    }
                    alt={movie.name}
                  />
                  <div>
                    <h1
                      style={{
                        color: "orange",
                        display: "block",
                        fontSize: "2.5rem",
                        fontWeight: 400,
                        transition: "transform 450ms",
                      }}
                    >
                      {movie.media_type === "movie" ? movie.title : movie.name}
                    </h1>
                    <h1 style={{ marginTop: "1rem" }}>
                      Type: {movie.media_type}
                    </h1>
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <div className="pagin-container">
        <Pagination
          className="pagin-content"
          defaultCurrent={1}
          total={res?.total_pages}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default QuerryPage;
