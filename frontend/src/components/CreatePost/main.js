import React, { useContext, useEffect, useState } from 'react'
import "./style.css"
import axios from "axios";
import { userContext } from "../../App"
import { Navigate, useNavigate } from 'react-router-dom';
import { dataContext } from '../Main/Main';

const { initializeApp } = require("firebase/app");
const {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } = require("firebase/storage");
  
  const firebaseConfig = {
    apiKey: "AIzaSyCYj7agxninbQcoLIQ130oy9Lcy5bGiV8c",
    authDomain: "frindly-d4395.firebaseapp.com",
    projectId: "frindly-d4395",
    storageBucket: "frindly-d4395.appspot.com",
    messagingSenderId: "55025000747",
    appId: "1:55025000747:web:946b40b554b337149c256e",
  };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage();

function CreatePost() {
    const navigate = useNavigate();
    const [content,setContent] = useState("");
    const  [postDetails, setPostDetails] = useState({})
    const [imageUser, setImageUser] = useState(null);
    const { token, userId, checkValue} = useContext(userContext);
    const {  data, setData } = useContext(dataContext);
    const [ImagePost, setImagePost] = useState({});
    const [loading, setLoading] = useState(true);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const arr = [{id:12312,content:'test',author:123123},]
    let imageFile = null;
// const getAllposts=()=>{
//     axios.get("http://localhost:5000/posts",config).then((result) => {
//         setData(result.data.posts);
//     }).catch((err) => {
//         if(err.response.status === 403){
//             navigate("/login");
//             localStorage.clear();
//         }
//     });
     
// }
    useEffect(()=>{
        axios.get(`http://localhost:5000/users/${userId}`, config).then((result) => {
            setImageUser(result.data.user.image);
        }).catch((err) => {
            
        });
    },[]);
    // console.log("from Main>>:",data);
  return (
    <div className={!checkValue? 'createPost-div': 'createPost-div-night'}>
    <img src={`${imageUser}`} style={{width:"48px", height:"48px", marginLeft:"10px",border:"0", borderRadius:"32px"}}/>
    <div style={{width:"80%",height:"100%",borderRadius:"4px", display:"flex", flexDirection:"column",padding:"10px"}}> 
    <input className={!checkValue?'input-content':'input-content-night'} placeholder='what Think?' value={content} id='content' onChange={(e)=>{
        setContent(e.target.value);
    }} />
    
        <div className='contenter-input-image' style={{textAlign:"left"}}>
            <div className='input-image'><i className="gg-image"></i> 
            <input type="file" id="img" name="img" accept="image/*" onChange={(e)=>{
                const file = e.target.files[0];
                if (file) {
                    setImagePost(file);
                    
                }else{
                    
                }
            }}></input></div>
            <div id="myProgress">
                <div id="myBar"></div>
                </div>

        </div>
    </div>
    
    <button style={{backgroundColor:"#00ADB5",border:"0",color:"white", fontSize:"16px", padding:"10px", borderRadius:"5px", paddingTop:"16px",paddingBottom:"16px"}} 
    onClick={(e)=>{
        e.preventDefault()

        console.log(ImagePost.name);
       
        if(ImagePost.name){
            console.log("imageFile", ImagePost);
            const storageRef = ref(storage, `${ImagePost.name}`);
            const uploadTask = uploadBytesResumable(storageRef, ImagePost);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                document.querySelector("#myProgress").style.display = "block";
                const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.querySelector("#myBar").style.width = `${progress}%`
                document.querySelector("#img").value = "";
                document.querySelector("#content").value = "";
                setContent("");
              },
              (error) => {
                console.error('Error uploading file:', error);
              },
              () => {
                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    axios.post("http://localhost:5000/posts/create", {content, author:userId, image: downloadURL},{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }}).then((result) => {
                        document.querySelector("#myProgress").style.display = "none";
                       console.log("post added successfully");
                       console.log("result from create post", result);
                       // ?/ spread array [result , ]
                       setData([ ...data,result.data.data])
  
                }).catch((err) => {
                    console.log("error from create post" , err);
                });
                setImagePost(null)
                });
              }
            );
        }else{
            console.log(content,userId);
            axios.post("http://localhost:5000/posts/create", {content, author:userId, image:""},{
                headers: {
                    Authorization: `Bearer ${token}`
                }}).then((result) => {
                    console.log("result from create post", result);
                     setData([ ...data,result.data.data ])
                    setContent("");

            }).catch((err) => {
                console.log("error from create post" , err);
            });
        }

        
    }}>Post</button>
    </div>
  )
}

export default CreatePost