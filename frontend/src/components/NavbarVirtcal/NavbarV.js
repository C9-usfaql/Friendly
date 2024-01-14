import React, { useEffect, useState, useContext } from 'react'
import "./style.css"
import axios from 'axios';
import { userContext } from "../../App"
import { useNavigate } from 'react-router-dom';
function NavbarV() {
    const navigate = useNavigate();
    const { token, userId ,checkValue} = useContext(userContext);
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
        <div className={!checkValue? 'nav-bar': 'nav-bar-night'}>
            <div className="containers" >
                <img src={require(`../Image/cover.jpg`)} className='cover-image'/>
                <img src={`${imageUser}`} className='user-image'/>
            </div>
            <div className="container-userinfo">
            <div className='nameUser'>{nameUser}</div>
            <div className='id-user'>{userId}</div>
            </div>
            

            <div className='container-info-profile' style={{display:"flex", flexDirection:"row", margin:"20px", justifyContent:"center", textAlign:"center", gap:"15px"}}>
                <div>
                <div>{lengthPosts}</div>
                <div>Post</div>
                </div>

                <div>
                <div>{lengthFollower}</div>
                <div>Followers</div>
                </div>

                <div>
                <div>{lengthFollowing}</div>
                <div>Following</div>
                </div>
            </div>

            <div className='btn-open-profile' onClick={()=>{
                localStorage.setItem("userIdG", userId);
                navigate("/profile");
            }}>Profile</div>
        </div>
        <div className={!checkValue? 'nav-bar': 'nav-bar-night'}>
            <div className='menu home'>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M10 12h4v4h-4z" /></svg>
            Home
            </div>
            <div className='menu explore'>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-edge" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.978 11.372a9 9 0 1 0 -1.593 5.773" /><path d="M20.978 11.372c.21 2.993 -5.034 2.413 -6.913 1.486c1.392 -1.6 .402 -4.038 -2.274 -3.851c-1.745 .122 -2.927 1.157 -2.784 3.202c.28 3.99 4.444 6.205 10.36 4.79" /><path d="M3.022 12.628c-.283 -4.043 8.717 -7.228 11.248 -2.688" /><path d="M12.628 20.978c-2.993 .21 -5.162 -4.725 -3.567 -9.748" /></svg>
                Explore
            </div>
            <div className='menu profile'>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-movie" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M8 4l0 16" /><path d="M16 4l0 16" /><path d="M4 8l4 0" /><path d="M4 16l4 0" /><path d="M4 12l16 0" /><path d="M16 8l4 0" /><path d="M16 16l4 0" /></svg>
                Trundle</div>
        </div>
       
    </div>

    
    
  )
}

export default NavbarV