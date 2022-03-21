import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid, Box, Tab } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import {
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import requests from "../requests";
import axios from "../axios";
import "./person-detail.css";
import Loader from "../loading/Loader";

function PersonDetail() {
  let { id } = useParams();
  let year = new Date();
  const [loading, setLoading] = useState();
  const [value, setValue] = useState("personMovies");
  const [req, setReq] = useState();
  const [movie, setMovie] = useState();
  const [social, setSocial] = useState();
  const base_url = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/";
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const request = await axios.get(requests(id)["person-detail-en"]);
      const moviesReq = await axios.get(requests(id)[value]);

      const socailReq = await axios.get(requests(id).personSocials);
      setReq(request?.data);
      setSocial(socailReq?.data);
      setLoading(false);
      if (request?.data.known_for_department === "Acting") {
        setMovie(moviesReq?.data.cast);
      } else {
        setMovie(moviesReq?.data.crew);
      }
    }
    fetchData();
    console.log(movie);
  }, [id, value]);
  const handleType = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ background: "#111" }}>
      <div className="container_person">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="pers-left">
              <img src={`${base_url}${req?.profile_path}`} alt="avt_profile" />
              <div className="social-content">
                <>
                  {social?.twitter_id !== null ? (
                    <a
                      className="icon-social"
                      href={`https://twitter.com/${social?.twitter_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterOutlined />
                    </a>
                  ) : null}
                </>
                <>
                  {social?.instagram_id !== null ? (
                    <a
                      className="icon-social"
                      href={`https://www.instagram.com/${social?.instagram_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InstagramOutlined />
                    </a>
                  ) : null}
                </>
                <>
                  {social?.facebook_id !== null ? (
                    <a
                      className="icon-social"
                      href={`https://www.facebook.com/${social?.facebook_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookOutlined />
                    </a>
                  ) : null}
                </>
                <>
                  {social?.imdb_id !== null ? (
                    <a
                      className="icon-social imdb"
                      href={`https://www.imdb.com/name/${social?.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      IMDb
                    </a>
                  ) : null}
                </>
              </div>
              <div className="info-item">
                <h5>Known For</h5>
                <p>{req?.known_for_department}</p>
              </div>

              <div className="info-item">
                <h5>Gender</h5>
                <p>{req?.gender === 2 ? "Male" : "Female"}</p>
              </div>
              <div className="info-item">
                <h5>Birthday</h5>
                <p>
                  {req?.birthday} (
                  {year.getFullYear() - req?.birthday.slice(0, 4)} tuổi)
                </p>
              </div>
              <div className="info-item">
                <h5>Place of Birth</h5>
                <p>{req?.place_of_birth}</p>
              </div>
              <div className="info-item">
                <h5>Also Known As</h5>
                <p>
                  {req?.also_known_as.map((index) => {
                    return (
                      <>
                        <span>{index}</span> <br />
                      </>
                    );
                  })}
                </p>
              </div>
            </div>
            <div className="pers-right">
              <h1>{req?.name}</h1>
              <p style={{ color: "#fff" }}>{req?.biography}</p>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleType}
                    aria-label="lab API tabs example"
                    centered
                  >
                    <Tab label="Movie" value="personMovies" />
                    <Tab label="TV" value="personTv" />
                  </TabList>
                </Box>
                <TabPanel lassName="movie-group" value={value}>
                  <>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <Grid container spacing={2} className="row_posters">
                          {movie?.length === 0 ? (
                            <h1
                              style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                            >
                              Chưa có phim nào
                            </h1>
                          ) : (
                            movie?.map((movie) => (
                              <Grid
                                xs={4}
                                className="item_poster animate__animated animate__zoomIn"
                              >
                                <Link
                                  to={
                                    value === "personMovies"
                                      ? `/movie-detail/${movie.id}`
                                      : `/tv-detail/${movie.id}`
                                  }
                                >
                                  <img
                                    className={`row_poster`}
                                    key={movie.id}
                                    src={`${base_url}${movie.poster_path}`}
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
                                    {value === "personMovies"
                                      ? movie.title
                                      : movie.name}
                                  </h1>
                                </Link>
                              </Grid>
                            ))
                          )}
                        </Grid>
                      </>
                    )}
                  </>
                </TabPanel>
              </TabContext>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PersonDetail;
