import React, { useEffect, useContext, useState,createContext } from 'react'
import "./style.css"
import axios from "axios";
import { userContext } from "../../App"
import { Navigate, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CreatePost from '../CreatePost/main';
import Posts from '../Posts/Posts';
import OnePost from '../OnePost/OnePost';
import { dataContext } from '../Main/Main';
function Home() {
    
    const navigate = useNavigate();
    const { token, userId} = useContext(userContext);
    const { data, setData} = useContext(dataContext);
    const { dataFollowing, setDataFollowing} = useContext(dataContext);

    const [islike, setIsLike] = useState(false);
    const [commentData, setCommentData] = useState(null);
    const [imageUser, setImageUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    function compareDates(a, b) {
        const dateA = new Date(convertDateFormat(a.datePost));
        const dateB = new Date(convertDateFormat(b.datePost));
        return dateB - dateA; // Sort in descending order (latest date first)
    }

    function convertDateFormat(dateString) {
        const parts = dateString.split(/[\s/:\s]/);
        return `${parts[1]}/${parts[0]}/${parts[2]} ${parts[3]}:${parts[4]}`;
    }

    const getAllPosts=()=>{
       /*  axios.get("http://localhost:5000/posts",config).then((result) => {
            setData(result.data.posts);
            
        }).catch((err) => {
            if(err.response.status === 403){
                navigate("/login");
                localStorage.clear();
            }
        }); */
        axios.get(`http://localhost:5000/users/follow/user/${userId}`,config).then((result) => {
            result.data.posts.sort(compareDates);
            setDataFollowing(result.data.posts);
        }).catch((err) => {
            if(err.response.status === 403){
                navigate("/login");
                localStorage.clear();
            }
        });

        axios.get("http://localhost:5000/posts",config).then((result) => {
            result.data.posts.sort(compareDates);
            setData(result.data.posts);
            
        }).catch((err) => {
            if(err.response.status === 403){
                navigate("/login");
                localStorage.clear();
            }
        });  
        
         
    }
    useEffect(()=>{
    getAllPosts();
    axios.get(`http://localhost:5000/users/${userId}`, config).then((result) => {
      localStorage.setItem("InfoMe",JSON.stringify(result.data.user));
    }).catch((err) => {
      
    });
    },[]);

  return (
        <div className='home-contenter'>
        
        <CreatePost/>

        <Posts/>
        
        </div>
    

  )
}

export default Home