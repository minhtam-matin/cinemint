import React from "react";
import { useNavigate } from "react-router-dom";

function NavMovies() {
  const navigate = useNavigate();
  return (
    <div className="nav-dropdwn">
      <div className="nav-title">
        <span>Movies</span>
      </div>
      <div className="nav-item">
        <ul>
          <li
            onClick={() => {
              navigate("/movies/top-rated");
            }}
          >
            Top Rated
          </li>
          <li
            onClick={() => {
              navigate("/movies/get-popular");
            }}
          >
            Phổ Biến
          </li>
          <li
            onClick={() => {
              navigate("/movies/now-playing");
            }}
          >
            Đang Chiếu
          </li>
          <li
            onClick={() => {
              navigate("/movies/up-coming");
            }}
          >
            Sắp Chiếu
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavMovies;
