import React from "react";
import SideNav from "./components/SideNav";
import SideNav2 from "./components/SideNav2";

const Layout = ({ children, useSideNav2 }) => {
  return (
    <>
      {useSideNav2 ? <SideNav2 /> : <SideNav />}
      {children}
    </>
  );
};

export default Layout;
