import React, { useEffect, useContext, useState } from 'react'
import "./style.css"
import axios from "axios";
import { userContext } from "../../App"
function Home() {
    const { token, userId } = useContext(userContext);
    const [data,setData] = useState([]);
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
        <div style={{width: "100%", backgroundColor: "white", height:"25%", borderRadius:"10px" ,display:"flex", flexDirection:"row", placeItems:"center", gap:"10px"}}>
        <img src={require(`../Image/user.png`)} style={{width:"64px", height:"64px", marginLeft:"10px",border:"0"}}/>
        <input style={{width:"80%",height:"50%",borderRadius:"4px", border:"1px solid rgb(200,200,200)"}} placeholder='what Think?' />
        <button style={{backgroundColor:"#4464AD",border:"0",color:"white", fontSize:"16px", padding:"10px", borderRadius:"5px", paddingTop:"16px",paddingBottom:"16px"}}>Post</button>
        </div>
        <div>
        {data.map((post, i)=>{
        return(
            <div style={{height:"fit-content", maxHeight:"fit-content", backgroundColor:"white", marginTop:"10px", display:"flex", flexDirection:"column", borderRadius:"10px"}}>
                <div style={{display:"flex", justifyContent:"space-between", textAlign:"center", marginLeft:"10px", marginRight:"10px",marginTop:"10px"}}>
                    <div style={{display:"flex", flexDirection:"row", placeItems:"center", gap:"10px"}}>
                    <img style={{width:"48px" , borderRadius:"24px"}} src={post.author.image}/>
                    <div>{post.author.firstName + " "+ post.author.lastName}</div>
                    </div>
                    
                    <div>***</div>
                </div>
                <div style={{borderBottom: "1px solid rgb(220,220,220)", width:"96%",marginLeft:"2%", marginTop:"5px"}} ></div>

                <div style={{textAlign:"left", margin:"10px",color:"rgb(100,100,100)"}}>{post.content}</div>

                <div style={{textAlign:"left" , margin:"10px", color:"rgb(150,150,150)"}}>{post.likes.length} Like  {post.comments.length} Comments</div>
                <div style={{borderBottom: "1px solid rgb(220,220,220)", width:"96%",marginLeft:"2%", marginTop:"5px"}} ></div>

                <div style={{display:"flex", justifyContent:"space-between",textAlign:"center", placeItems:"center", padding:"10px"}}>

                    <div style={{width:"33%",padding:"5px",borderRadius:"10px", display:"flex", flexDirection:"row", justifyContent:"center",placeItems:"center", gap:"10px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4464AD" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                        </svg>
                        <div style={{placeContent:"center",textAlign:"center"}}>Like</div>
                    </div>
                    
                    <div style={{borderLeft: "1px solid rgb(220,220,220)", height:"1vh"}} ></div>

                    <div style={{width:"33%",padding:"5px",borderRadius:"10px", display:"flex", flexDirection:"row", justifyContent:"center",placeItems:"center", gap:"10px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4464AD" class="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                        </svg>
                        <div style={{placeContent:"center",textAlign:"center"}}>Comment</div>
                    </div>
                    <div style={{borderLeft: "1px solid rgb(220,220,220)", height:"1vh"}} ></div>
                    <div style={{width:"33%"}}>Share</div>
                </div>
            </div>
            
        )
    })}
    </div>
    </div>

    

  )
}

export default Home