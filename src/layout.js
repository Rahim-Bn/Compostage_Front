import React from "react";
import SideNav from "./components/SideNav";

const Layout=({children})=>{
    return(
        <>
        <SideNav/>
        {children}
        </>
    );
};
export default Layout;