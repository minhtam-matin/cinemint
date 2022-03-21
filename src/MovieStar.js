import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requests from "./requests";
import axios from "./axios";
import Loader from "./loading/Loader";
import { Grid } from "@mui/material";
import { Pagination } from "antd";

function MovieStar() {
  const [person, setPerson] = useState();
  const [data, setData] = useState();

  const base_url = "http://image.tmdb.org/t/p/original/";
  const [pages, setPage] = useState(1);
  const [loading, setLoading] = useState();
  const handleChange = (value) => {
    setPage(value);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const request = await axios.get(requests(pages)["movie-start"]);
      setPerson(request.data.results);
      setData(request);
      setLoading(false);
      return request;
    }

    fetchData();
  }, [pages]);
  return (
    <div style={{ height: "fit-content", backgroundColor: "#111" }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid container spacing={2} className="row_posters">
            {person?.map((movie) => (
              <Grid
                xs={3}
                className="item_poster animate__animated animate__zoomIn"
              >
                <Link to={`/person-detail/${movie.id}`}>
                  <img
                    className={`row_poster ${"row_posterLarge"}`}
                    key={movie.id}
                    src={`${base_url}${movie.profile_path}`}
                    alt={movie.name}
                  />
                  <h1
                    style={{
                      color: "orange",
                      display: "block",
                      fontSize: "1.5rem",
                      fontWeight: 400,
                      transition: "transform 450ms",
                      textAlign: "center",
                    }}
                  >
                    {movie.name}
                  </h1>
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
          total={data?.data.total_pages}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default MovieStar;
