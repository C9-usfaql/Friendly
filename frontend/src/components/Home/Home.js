import React, { useEffect, useContext, useState } from 'react'
import "./style.css"
import axios from "axios";
import { userContext } from "../../App"

function Home() {
    const { token, userId } = useContext(userContext);
    const [data,setData] = useState([]);
    const [content,setContent] = useState(null);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    useEffect(()=>{
        axios.get("http://localhost:5000/posts",config).then((result) => {
            console.log(result.data);
            setData(result.data.posts);
        }).catch((err) => {
        });
    },[]);
  return (
    <div className='home-contenter'>

        {/* Start Div input post */}
        <div style={{width: "100%", backgroundColor: "white", height:"25%", borderRadius:"10px" ,display:"flex", flexDirection:"row", placeItems:"center", gap:"10px"}}>
        <img src={require(`../Image/user.png`)} style={{width:"64px", height:"64px", marginLeft:"10px",border:"0"}}/>
        <input style={{width:"80%",height:"50%",borderRadius:"4px", border:"1px solid rgb(200,200,200)"}} placeholder='what Think?' onChange={(e)=>{
            setContent(e.target.value);
        }} />
        <button style={{backgroundColor:"#4464AD",border:"0",color:"white", fontSize:"16px", padding:"10px", borderRadius:"5px", paddingTop:"16px",paddingBottom:"16px"}} onClick={()=>{
            axios.post("http://localhost:5000/posts/create", {content, author:userId},config).then((result) => {
                axios.get("http://localhost:5000/posts",config).then((result) => {
                    console.log(result.data);
                    setData(result.data.posts);
                }).catch((err) => {
                });
            }).catch((err) => {
                
            });
        }}>Post</button>
        </div>
        {/* End Div input post */}

        {/* Start of Post box */}
        <div>
        {data.slice().reverse().map((post, i)=>{
            
        return(
            <div className='contenter-post'>
                {/* A bar containing a photo and username */}
                <div className='containing-top-post'>
                    <div className='containing-photo-username'>
                    <img style={{width:"48px" , borderRadius:"24px"}} src={post.author.image}/>
                    <div style={{display: "flex", flexDirection:"column"}}>
                        <div className='name-user'>{post.author.firstName + " "+ post.author.lastName}</div>
                        <div>{post.datePost}</div>
                    </div>
                    </div>
                    
                    <div>***</div>
                </div>
                {/* End Bar  */}
                {/* Start line */}
                <div className='line'></div>
                {/* End line */}
                
                {/* Start Div Content Post */}
                <div className='content-post'>{post.content}</div>
                {/* End Div Content Post */}

                {/* Start Show Count Like % Comments in Post */}
                <div style={{textAlign:"left" , margin:"10px", color:"rgb(150,150,150)"}}>{post.likes.length} Like  {post.comments.length} Comments</div>
                {/* End Show Count Like % Comments in Post */}

                {/* Start line */}
                <div className='line'></div>
                {/* End line */}

                {/*Start A bar containing three buttons to interact with the post */}
                <div className='bottom-bar-post'>
                    {/* Start The like button in the post */}
                    <div className='interact-button' onClick={(e)=>{
                        if(post.likes.length >0){
                        const findUserIdInLikes = post.likes.find((e,i)=>{

                            return e.admirer === userId;
                        })
                        console.log("findUserIdInLikes =>", findUserIdInLikes);
                        
                        if(findUserIdInLikes){
                            console.log("Already Liked");
                        }else{
                            axios.get(`http://localhost:5000/posts/${post._id}/like`,config).then((result) => {
                                    console.log("Add Like");
                                }).catch((err) => {
                                    console.log("Error", err);
                                });
                                axios.get("http://localhost:5000/posts",config).then((result) => {
                                    console.log(result.data);
                                    setData(result.data.posts);
                                }).catch((err) => {
                                });
                        }
                        }else{
                            console.log(post);
                                axios.get(`http://localhost:5000/posts/${post._id}/like`,config).then((result) => {
                                    console.log("Add Like");
                                    axios.get("http://localhost:5000/posts",config).then((result) => {
                                    console.log(result.data);
                                    setData(result.data.posts);
                                }).catch((err) => {
                                });
                                }).catch((err) => {
                                    console.log("Error", err);
                                });
                                
                        }
                    }}>
                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4464AD" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                        </svg>
                        <div style={{placeContent:"center",textAlign:"center"}}>Like</div>
                    </div>
                    {/* End The like button in the post */}
                    <div style={{borderLeft: "1px solid rgb(220,220,220)", height:"1vh"}} ></div>
                    

                    {/* Start The Comment button in the post */}
                    <div className='interact-button'>
                        <i class="gg-comment"></i>
                        <div style={{placeContent:"center",textAlign:"center"}}>Comment</div>
                    </div>
                    {/* End The Comment button in the post */}


                    <div style={{borderLeft: "1px solid rgb(220,220,220)", height:"1vh"}} ></div>

                    {/* Start The Share button in the post */}
                    <div className='interact-button'>Share</div>
                    {/* End The Share button in the post */}
                </div>
                {/*End A bar containing three buttons to interact with the post */}
            </div>
            
        )
    })}
    </div>
    {/* End of Post box */}
    </div>

    

  )
}

export default Home