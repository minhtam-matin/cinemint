import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import NavCine from "./Nav";

function Layout() {
  return (
    <div>
      <NavCine />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
