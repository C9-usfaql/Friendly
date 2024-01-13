import React, { useEffect, useState, useContext } from 'react'
import "./style.css"
import axios, { all } from 'axios';
import { userContext } from "../../App"
import { useNavigate } from 'react-router-dom';
function NavbarV() {
    const navigate = useNavigate();
    const { token, userId,  } = useContext(userContext);
    const infoMe = JSON.parse(localStorage.getItem("InfoMe"));
    const [allUser, setAllUser] = useState(null);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    useEffect(()=>{
        axios.get(`http://localhost:5000/users/`, config).then((result) => {
            setAllUser(result.data.Users);
            console.log(result);
        }).catch((err) => {
            
        });
    },[])
    console.log("allUser",allUser);
  return (
    <div className='contenter-nav'>

        <div className='nav-bar'>
            <div style={{fontWeight:"bold", textAlign:"left", marginLeft:"10px", marginBottom:"10px", paddingTop:"10px"}}>Suggested For you</div>
            <div style={{borderBottom: "1px solid rgb(200,200,200)", width:"90%",marginLeft:"5%"}} ></div>
            <div>
            {allUser?.map((e,i)=>{
                console.log("IDDDDDDDDDDDDD", infoMe);
                 
                if(userId === e._id){

                }else if(infoMe.following.includes(e._id)){
                }else{
                
                return(
                    <div onClick={()=>{
                        localStorage.setItem("userIdG", e._id);
                        navigate("/profile");
                    }}>
                <div style={{display: "flex", flexDirection: "row",justifyContent:"space-between", marginTop:"5px",marginLeft:"5px" ,padding: "5px", textAlign:"center", placeItems: "center" ,gap:"10px"}}>
                <div style={{display:"flex", textAlign:"center", placeItems: "center" , gap:"5px"}}>
                <img src={`${e.image}`} style={{width:"48px", borderRadius:"4px"}}/>
                <div style={{fontWeight:"bold"}}>{e.firstName}</div>
                </div>
                <button className='btn-follow'>Follow</button>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)", width:"80%",marginLeft:"10%"}} ></div>
            </div>
                )
            }
            })}
            </div>
            </div>
    </div>

    
    
  )
}

export default NavbarV