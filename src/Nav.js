import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./nav.css";
import CineLogo from "./images/cinemintLogo.png";
import Auth from "./Auth";
import { SearchOutlined } from "@ant-design/icons";
import NavCate from "./NavCate";
import NavMovies from "./NavMovies";
import NavTV from "./NavTV";
import People from "./people";

export default function NavCine() {
  const [show, handleShow] = useState("nav_white");

  const navigate = useNavigate();

  const transitionNav = () => {
    if (window.scrollY > 0) {
      handleShow("nav_black");
    } else {
      handleShow("nav_white");
    }
  };
  const [keyWord, setKeyWord] = useState();
  useEffect(() => {
    window.addEventListener("scroll", transitionNav);
    return () => window.removeEventListener("scroll", transitionNav);
  }, []);

  return (
    <div className={`nav ${show}`}>
      <div className="nav_contain">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="nav_logo"
          src={CineLogo}
          alt="logo"
        />
        <div className="search">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (keyWord === undefined) {
                alert("Không nhập gì kiu tui tìm biết gì tìm má");
              } else {
                navigate(`/search/${keyWord.replace(" ", "-")}`);
              }
            }}
          >
            <input type="text" onChange={(e) => setKeyWord(e.target.value)} />
            <button type="submit">
              <SearchOutlined />
            </button>
          </form>
        </div>
        <div className="drdw-cate">
          <NavMovies />
        </div>
        <div className="drdw-cate">
          <NavTV />
        </div>
        <div className="drdw-cate">
          <NavCate />
        </div>
        <div className="drdw-cate">
          <People />
        </div>
        <div className="drdw-cate">
          <Auth />
        </div>
      </div>
    </div>
  );
}
