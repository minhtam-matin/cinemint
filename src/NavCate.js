import React, { useState, useEffect } from "react";
import "./NavCate.css";
import requests from "./requests";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

function NavCate() {
  const navigate = useNavigate();
  const [lists, setLists] = useState();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests().genres);
      setLists(request.data.genres);
      return request;
    }

    fetchData();
  }, []);
  return (
    <div className="nav-dropdwn">
      <div className="nav-title">
        <span>Thể Loại</span>
      </div>
      <div className="nav-item">
        <ul>
          {lists?.map((index) => (
            <li onClick={() => navigate(`/category/${index.id}`)}>
              {index.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavCate;
