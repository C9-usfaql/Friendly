import React, { useEffect, useState, useContext } from 'react'
import "./style.css"
import axios from 'axios';
import { userContext } from "../../App"
function NavbarV() {
    const { token, userId } = useContext(userContext);
    const [nameUser, setNameUser] = useState(null);
    const [imageUser, setImageUser] = useState(null);
    const [lengthFollower, setLengthFollower] = useState(null);
    const [lengthFollowing, setLengthFollowing] = useState(null);
    const [lengthPosts, setLengthPosts] = useState(null);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    useEffect(()=>{
        axios.get(`http://localhost:5000/users/${userId}`, config).then((result) => {
            setNameUser(result.data.user.firstName + " "+ result.data.user.lastName);
            setImageUser(result.data.user.image);
            setLengthFollower(result.data.user.follower.length);
            setLengthFollowing(result.data.user.following.length);
            setLengthPosts(result.data.user.posts.length);
        }).catch((err) => {
            
        });
    },[])
    
  return (
    <div className='contenter-nav'>

        <div className='nav-bar'>
            <div style={{fontWeight:"bold", textAlign:"left", marginLeft:"10px", marginBottom:"10px", paddingTop:"10px"}}>Suggested For you</div>
            <div style={{borderBottom: "1px solid rgb(200,200,200)", width:"90%",marginLeft:"5%"}} ></div>
            <div style={{display: "flex", flexDirection: "row", marginTop:"5px",marginLeft:"5px" ,padding: "5px", textAlign:"center", placeItems: "center" ,gap:"10px"}}>
                
                <img src={require(`../Image/user.png`)} style={{width:"48px"}}/>
                <div>Anas Yousef</div>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)", width:"80%",marginLeft:"10%"}} ></div>
            <div style={{display: "flex", flexDirection: "row", marginTop:"5px", marginLeft:"5px" ,padding: "5px", textAlign:"center", placeItems: "center" ,gap:"10px"}}>
                
                <img src={require(`../Image/user.png`)} style={{width:"48px"}}/>
                <div>Ahmad Khaled</div>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)", width:"80%",marginLeft:"10%"}} ></div>
            <div style={{display: "flex", flexDirection: "row", marginTop:"5px",marginLeft:"5px" ,padding: "5px", textAlign:"center", placeItems: "center" ,gap:"10px"}}>
                
                <img src={require(`../Image/user.png`)} style={{width:"48px"}}/>
                <div>yara marwan</div>
            </div>
            
            
            </div>
    </div>

    
    
  )
}

export default NavbarV