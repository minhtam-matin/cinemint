import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import requests from "./requests";
import { Grid } from "@mui/material";
import { Pagination } from "antd";
import axios from "./axios";
import Loader from "./loading/Loader";

function TvGroup({ isLargeRow = false }) {
  let { tvgroup } = useParams();
  const [data, setData] = useState();
  const [movie, setMovie] = useState([]);
  const base_url = "http://image.tmdb.org/t/p/original/";
  const [pages, setPage] = useState(1);
  const [loading, setLoading] = useState();
  const handleChange = (value) => {
    setPage(value);
  };
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const request = await axios.get(requests(pages)[`${tvgroup}`]);
      setMovie(request.data.results);
      setData(request);
      setLoading(false);
      return request;
    }
    setLoading(false);
    fetchData();
  }, [requests(pages)[`${tvgroup}`]]);
  function title() {
    switch (tvgroup) {
      case "tv-top-rated":
        return "Top Rated";

      case "tv-get-popular":
        return "Phổ biến";
      default:
        navigate("*");
    }
  }
  return (
    <div style={{ height: "fit-content", backgroundColor: "#111" }}>
      <h1 style={{ color: "#f26b38", textAlign: "center", margin: "1rem" }}>
        {title()} TV
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid container spacing={2} className="row_posters">
            {movie?.map(
              (movie) =>
                ((isLargeRow && movie.poster_path) ||
                  (!isLargeRow && movie.backdrop_path)) && (
                  <Grid
                    xs={4}
                    className="item_poster animate__animated animate__zoomIn"
                  >
                    <Link to={`/tv-detail/${movie.id}`}>
                      <img
                        className={`row_poster ${
                          isLargeRow && "row_posterLarge"
                        }`}
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
                        {movie.name}
                      </h1>
                    </Link>
                  </Grid>
                )
            )}
          </Grid>
        </>
      )}
      <div className="pagin-container">
        <Pagination
          className="pagin-content"
          defaultCurrent={1}
          total={data?.data.total_pages}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default TvGroup;
