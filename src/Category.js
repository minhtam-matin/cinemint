import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, Box, Tab } from "@mui/material";
import { Pagination } from "antd";
import axios from "./axios";
import "./category.css";
import Loader from "./loading/Loader";
import requests from "./requests";
import { TabList, TabPanel, TabContext } from "@mui/lab";

function Category({ isLargeRow = false }) {
  let { cate } = useParams();

  const [movie, setMovie] = useState(null);
  const [data, setData] = useState();

  const base_url = "http://image.tmdb.org/t/p/original/";
  const [pages, setPage] = useState(1);
  const [loading, setLoading] = useState();
  const [value, setValue] = useState("listMovie");
  const handleChange = (value) => {
    setPage(value);
  };
  const handleType = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const request = await axios.get(requests(pages, cate)[value]);
      setMovie(request.data.results);
      setData(request);
      setLoading(false);

      return request;
    }
    fetchData();
  }, [cate, pages, value]);
  function title() {
    switch (cate) {
      case "28":
        return "Hành Động";
      case "12":
        return "Phiêu Lưu";
      case "16":
        return "Hoạt Hình";
      case "35":
        return "Hài";
      case "80":
        return "Hình Sự";
      case "99":
        return "Tài Liệu";
      case "18":
        return "Chính Kịch";
      case "10751":
        return "Gia Đình";
      case "14":
        return "Giả Tưởng";
      case "36":
        return "Lịch Sử";
      case "27":
        return "Kinh Dị";
      case "10402":
        return "Nhạc";
      case "9648":
        return "Bí Ẩn";
      case "10749":
        return "Lãng Mạn";
      case "878":
        return "Khoa Học Viễn Tưởng";
      case "10770":
        return "Truyền Hình";
      case "53":
        return "Gây Cấn";
      case "10752":
        return "Chiến Tranh";
      case "37":
        return "Miền Tây";

      default:
        navigate("*");
    }
  }
  return (
    <div style={{ height: "fit-content", backgroundColor: "#111" }}>
      <h1 style={{ color: "#f26b38", textAlign: "center", margin: "1rem" }}>
        Phim {title()}
      </h1>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleType}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="Movie" value="listMovie" />
            <Tab label="TV" value="listTV" />
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
                    movie?.map(
                      (movie) =>
                        ((isLargeRow && movie.poster_path) ||
                          (!isLargeRow && movie.backdrop_path)) && (
                          <Grid
                            xs={4}
                            className="item_poster animate__animated animate__zoomIn"
                          >
                            <Link
                              to={
                                value === "listMovie"
                                  ? `/movie-detail/${movie.id}`
                                  : `/tv-detail/${movie.id}`
                              }
                            >
                              <img
                                className={`row_poster ${
                                  isLargeRow && "row_posterLarge"
                                }`}
                                key={movie.id}
                                src={`${base_url}${
                                  isLargeRow
                                    ? movie.poster_path
                                    : movie.backdrop_path
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
                                {value === "listMovie"
                                  ? movie.title
                                  : movie.name}
                              </h1>
                            </Link>
                          </Grid>
                        )
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
          </>
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default Category;
