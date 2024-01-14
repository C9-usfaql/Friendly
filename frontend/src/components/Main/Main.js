import React, { createContext, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarV from "../NavbarVirtcal/NavbarV";
import NavbarR from "../NavbarVirtcalRight/NavbarR";
import Home from "../Home/Home";
import "./style.css"
import { userContext } from "../../App";


const Main = ()=>{
    const {checkValue} = useContext(userContext);
    return(
        <div className={!checkValue? 'main' : 'mainNight'}>
        <NavbarV/>
        <Home/>
        <NavbarR/>
      </div>
    )
}

export default Main