import React from "react";
import { useNavigate } from "react-router-dom";

function People() {
  const navigate = useNavigate();
  return (
    <div className="nav-dropdwn">
      <div className="nav-title">
        <span onClick={() => navigate("/movie-star")}>Ngôi Sao</span>
      </div>
    </div>
  );
}

export default People;
