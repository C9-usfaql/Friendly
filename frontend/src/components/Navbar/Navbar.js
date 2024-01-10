import React ,{useContext, useEffect, useState}from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css"
import { userContext } from "../../App";
import axios from "axios";
const Navbar = ()=>{
    const { token, userId } = useContext(userContext);
    const [imageUrl, setImageUrl] = useState("test");
    const navigate = useNavigate();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    useEffect(()=>{
        axios.get(`http://localhost:5000/users/${userId}`,config).then((result) => {
            setImageUrl(result.data.user.image)
        }).catch((err) => {
                console.log(err);
        });
    })
    return(
        <div className='Nav'>
            <div  className="logo-div"><img  className="logo" src={require(`../Image/logo.png`)} onClick={()=>{
                
                 navigate("/");
            }}/></div>
            <div className="nav-div">
            {token ? 
            <>
               <div style={{minWidth: "60%", minHeight: "50%"}}> <input style={{width: "50%", padding: "1%",borderRadius: "10px", border: "1px solid gray", } } placeholder="Search..." /></div> 
                <div className="avatar-div" onClick={()=>{
                    localStorage.clear();
                    //navigate("/register")
                }}>
                <img className="avatar" style={{width:"42px", borderRadius: "25px", border: "1px solid #4464ad"}} src={`${imageUrl}`}/></div>
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