import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "animate.css";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./Profile";
import Page404 from "./Page404";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Category from "./Category";
import MovieGroup from "./MovieGroup";
import TvGroup from "./TvGroup";
import MovieStar from "./MovieStar";
import MovieDetail from "./Details/MovieDetail";
import TvDetail from "./Details/TvDetail";
import PersonDetail from "./Details/PersonDetail";
import QuerryPage from "./QuerryPage";
import BookingPage from "./bookingTicket/BookingPage";
import "./responsive.css";

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            username: user.displayName,
            email: user.email,
            phone: user.phoneNumber,
            avatar: user.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeScreen />} />

            <Route
              path="/profile"
              element={user ? <Profile /> : <HomeScreen />}
            />
            <Route path="/movies/:moviegroup" element={<MovieGroup />} />
            <Route path="/tv/:tvgroup" element={<TvGroup />} />
            <Route path="/category/:cate" element={<Category />} />
            <Route path="/movie-star" element={<MovieStar />} />
            <Route path="/movie-detail/:id" element={<MovieDetail />} />
            <Route
              path="/movie-detail/:id/booking-ticket"
              element={<BookingPage />}
            />
            <Route path="/tv-detail/:id" element={<TvDetail />} />
            <Route path="/person-detail/:id" element={<PersonDetail />} />
            <Route path="/search/:key" element={<QuerryPage />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
