import React ,{useContext}from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css"
import { userContext } from "../../App";
const Navbar = ()=>{
    const {token} = useContext(userContext)
    return(
        <div className='Nav'>
            <div  className="logo-div"><img  className="logo" src={require(`../Image/logo.png`)}/></div>
            <div className="nav-div">
            {token ? 
            <>
               <div style={{minWidth: "90%", minHeight: "50%"}}> <input style={{width: "50%", padding: "1%",borderRadius: "10px", border: "1px solid gray", } } placeholder="Search..." /></div> 
                <div className="avatar-div"><img className="avatar" to="/login" style={{width:"42px", borderRadius: "25px", border: "0"}} src={require('../Image/user.png')}/></div>
            </> : <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </>
            }
            </div>
          
        
  
  
      </div>
    )
}

export default Navbar