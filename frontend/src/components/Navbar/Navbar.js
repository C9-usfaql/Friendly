import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css"
import logo from "../Image/logo.png"
const Navbar = ()=>{
    return(
        <div className='Nav'>
            <div  className="logo-div"><img  className="logo" src={require(`../Image/logo.png`)}/></div>
            <div className="nav-div">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>

            
            
            </div>
          
        
  
  
      </div>
    )
}

export default Navbar