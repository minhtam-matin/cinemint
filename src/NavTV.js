import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavTV() {
  const navigate = useNavigate();
  return (
    <div className="nav-dropdwn">
      <div className="nav-title">
        <span>TV Shows</span>
      </div>
      <div className="nav-item">
        <ul>
          <li
            onClick={() => {
              navigate("/tv/tv-top-rated");
            }}
          >
            Top Rated
          </li>
          <li
            onClick={() => {
              navigate("/tv/tv-get-popular");
            }}
          >
            Phổ Biến
          </li>
        </ul>
      </div>
    </div>
  );
}
