import React, { useState } from "react";
import Banner from "../Banner";
import "./HomeScreen.css";
import Row from "../Row";
import requests from "../requests";
import { Box, Tab } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const [value, setValue] = useState("top-rated");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  return (
    <div className="homeSreen">
      <Banner />
      <div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="Top Rated" value="top-rated" />
              <Tab label="Phổ biến" value="get-popular" />
              <Tab label="Đang chiếu" value="now-playing" />
              <Tab label="Sắp chiếu" value="up-coming" />
            </TabList>
          </Box>
          <TabPanel className="movie-group" value={value}>
            <Row fetchUrl={requests()[value]} />
          </TabPanel>
        </TabContext>
      </div>
      <div style={{ position: "relative" }}>
        <button
          className="btn-more"
          onClick={() => navigate(`/movies/${value}`)}
        >
          {"Xem Thêm >>>"}
        </button>
      </div>
    </div>
  );
}
export default HomeScreen;
