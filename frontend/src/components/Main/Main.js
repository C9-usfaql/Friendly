import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarV from "../NavbarVirtcal/NavbarV";
import Home from "../Home/Home";
import "./style.css"
const Main = ()=>{
    return(
        <div className='main' style={{ display: "flex", gap: "16px", textAlign: "center" ,justifyContent:"center", marginBottom: "10px"}}>
        <NavbarV/>
        <Home/>
        <NavbarV/>
      </div>
    )
}

export default Main