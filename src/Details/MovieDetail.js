import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Rate } from "antd";
import "antd/dist/antd.css";
import requests from "../requests";
import axios from "../axios";
import "./movie-detail.css";
import Loader from "../loading/Loader";

function MovieDetail() {
  let { id } = useParams();

  const [movie, setMovie] = useState(null);
  const base_url = "http://image.tmdb.org/t/p/original";
  const [lengthGenres, setLengthGenres] = useState();
  const [lastGenres, setLastGenres] = useState();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState();
  const [overView, setOverView] = useState();
  const [person, setPerson] = useState();
  const [rate, setRate] = useState();
  const [recommend, setRecommend] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const request = await axios.get(requests(id)["movie-detail"]);
      const requestEn = await axios.get(requests(id)["movie-detail-en"]);
      const people = await axios.get(requests(id).castMovie);
      const recommendReq = await axios.get(requests(id).recommendMovie);
      setMovie(request?.data);
      setPerson(people.data);
      setOverView(requestEn?.data);
      setLengthGenres(request?.data.genres.length - 1);
      setGenres(request?.data.genres);
      setLastGenres(request?.data.genres[lengthGenres]);
      setRecommend(recommendReq.data);

      setLoading(false);
    }

    fetchData();
  }, [id, lengthGenres]);

  function handleRate(newHover) {
    setRate(newHover);
  }
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="detail-container">
          <div className="backdrop">
            <div>
              <img
                style={{ width: "100%", height: "auto" }}
                src={`${base_url}${movie?.backdrop_path}`}
                alt="background"
              />
            </div>
          </div>
          <div className="detail-content">
            <img
              className="poster"
              src={`${base_url}${movie?.poster_path}`}
              alt="poster"
            />
            <div className="content">
              <h1>{movie?.title}</h1>
              <h5>{overView?.tagline}</h5>
              <span>Điểm đánh giá: {movie?.vote_average} </span>
              <span>
                <Rate
                  allowHalf
                  defaultValue={movie?.vote_average / 2}
                  onChange={handleRate}
                />
              </span>
              <p>
                Thời lượng: {movie?.runtime} phút{" "}
                <span style={{ fontStyle: "italic" }}>( {movie?.status} )</span>
              </p>
              <p>
                Thể loại:{" "}
                {genres?.slice(0, -1).map((index) => (
                  <>
                    <Link to={`/category/${index.id}`}>{index.name}</Link>
                    <span>, </span>
                  </>
                ))}
                {
                  <Link to={`/category/${lastGenres?.id}`}>
                    {lastGenres?.name}
                  </Link>
                }
              </p>
              <p>{overView?.overview}</p>
              <p>
                Diễn viên:{" "}
                {person?.cast.slice(0, 3).map((index, key) => {
                  if (key < 2) {
                    return (
                      <>
                        <Link to="/">{index.name}</Link>
                        <span>, </span>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <Link to="/">{index.name}</Link>
                        <span>,...</span>
                      </>
                    );
                  }
                })}
              </p>
              <p>
                Đạo diễn:{" "}
                {person?.crew.map((index) => {
                  if (index.job === "Director") {
                    return <Link to="/">{index.name}</Link>;
                  }
                })}
              </p>
              <button
                className="booking"
                disabled={movie?.status !== "Released" ? true : false}
                onClick={() =>
                  navigate(`/movie-detail/${movie?.id}/booking-ticket`)
                }
              >
                Đặt Vé
              </button>
            </div>
          </div>
          <div className="recommend">
            <h2>Recommendations:</h2>
            <div className="recommend_item">
              {recommend?.results.map((rmd) => (
                <Link to={`/movie-detail/${rmd.id}`}>
                  <img
                    src={`${base_url}${rmd.poster_path}`}
                    alt="recommend-movie"
                  />
                  <div className="reccomend-title">
                    <span>{truncate(`${rmd.title}`, 15)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetail;
