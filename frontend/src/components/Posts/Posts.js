import React, { useEffect, useContext, useState, createContext } from 'react';
import "./style.css"
import axios from "axios";
import { userContext } from "../../App"
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../Home/Home';
import { ReactSVG } from 'react-svg'
export const postIdContext = createContext();
function Posts() {
    const navigate = useNavigate();
    const { token, userId , checkValue} = useContext(userContext);
    const { data, setData} = useContext(dataContext);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editAllow, setEditAllow] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [contentPostAfterEdit, setContentPostAfterEdit] = useState('');
    const openModal = (postId) => {
        setSelectedPostId(postId);
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setSelectedPostId(null);
        setModalVisible(false);
      };
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
    data.sort(compareDates);
    return(
    <div>

    {data && data.map((post, i)=>{
        console.log("Data in Post =>", data);
        const handleImageLoad = () => {
            setLoading(false); // Set loading to false once the image is loaded
        };
               
            const searchid = async()=>{
                console.log();
                    axios.get(`http://localhost:5000/posts/${post._id}/like`,config).then((result) => {
                         axios.get(`http://localhost:5000/users/follow/user/${userId}`,config).then((results) => {
                            results.data.posts.sort(compareDates);
                            setData(results.data.posts);
                        }).catch((err) => {
                        }); 
                     }).catch((err) => {
                         console.log("Error", err);
                     });
               
            };
            
        return(
            <div className={!checkValue?'contenter-post' : 'contenter-post-night'}>
                {/* <h1>POSTS</h1> */}
                {/* A bar containing a photo and username */}
                <div className='containing-top-post'>
                    <div className='containing-photo-username' onClick={(e)=>{
                       localStorage.setItem("userIdG", post.author._id);
                        navigate("/profile");
                    }}>
                    <img style={{width:"48px" , borderRadius:"24px"}} src={post.author.image}/>
                    <div style={{display: "flex", flexDirection:"column"}}>
                        <div className='name-user'>{post.author.firstName + " "+ post.author.lastName}</div>
                        <div>{post.datePost}</div>
                        
                    </div>
                    </div>

                    <div style={{display : 'flex', flexDirection:"column"}}>

                    {post._id === userId && <button id={`${post._id}`} className={!checkValue? 'menu': 'menu-night'} onClick={(e)=>{
                    
                    if(modalVisible){
                        closeModal()
                    }else{
                        openModal(post._id);
                    }


                }
                   }>
                    Menu
                    {/* <i class="gg-menu"></i> */}
                   </button>
                    }
                    

                {modalVisible && selectedPostId === post._id && (
                    <div id="id01" className="w3-modal" style={{ display: 'block' }}>
                    <div className="w3-modal-content">
                        <div className="w3-container">
                        <button onClick={()=>{
                            setEditAllow(true);
                        }}>Edit</button>
                        <button onClick={()=>{
                            axios.delete(`http://localhost:5000/posts/${post._id}`,config).then((result) => {
                                axios.get("http://localhost:5000/posts/", config).then((result) => {
                                    setData(result.data.posts);
                                }).catch((err) => {
                                    
                                });
                            }).catch((err) => {
                                
                            });
                        }}>Delete</button>
                        </div>
                    </div>
                    </div>
                )}
                </div>
                </div>
                
                {/* End Bar  */}
                {/* Start line */}
                <div className={!checkValue? 'line' : 'line-night'}></div>
                {/* End line */}
                
                {/* Start Div Content Post */}
                {editAllow &&  selectedPostId === post._id ? <> <input id={post._id} defaultValue={post.content} onChange={(e)=>{
                    setContentPostAfterEdit(e.target.value)
                }} /> <button onClick={()=>{
                    axios.put(`http://localhost:5000/posts/${post._id}`, {content: contentPostAfterEdit}, config).then((result) => {
                        console.log(result);
                        setModalVisible(false);
                        setEditAllow(false);
                    }).catch((err) => {
                        
                    });
                }}>Save</button></>: <div className={!checkValue? 'content-post': 'content-post-night'}>{post.content}</div>}
                
                <div>
                    {
     post.image && <div style={{  width: "98%",backgroundColor:"#e6e6e6",marginLeft:"1%", height: "100%" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust the background color and opacity as needed
          }}
        >
          <img src={require('../Image/loading.gif')} style={{width:"5%"}} alt="Loading..." />
        </div>
      )}
      {post.image && (
        <img
          src={post.image}
          style={{
            maxWidth: "90%",
            justifyContent: "center",
            placeItems: "center",
            maxHeight: "80%",
            padding: "10px",
            borderRadius: "20px",
          }}
          onLoad={handleImageLoad}
        />
      )}

    </div> }
                
                </div>
                {/* End Div Content Post */}

                {/* Start Show Count Like % Comments in Post */}
                <div style={{textAlign:"left" , margin:"10px", color:"rgb(150,150,150)"}}>{post.likes.length} Like  {post.comments.length} Comments</div>
                {/* End Show Count Like % Comments in Post */}

                {/* Start line */}
                <div className={!checkValue? 'line' : 'line-night'}></div>
                {/* End line */}
                
                {/*Start A bar containing three buttons to interact with the post */}
                
                <div className='bottom-bar-post'>

                    {/* Start The like button in the post */}
                    
                    <div className={!checkValue? 'interact-button': 'interact-button-night'} onClick={()=>{ 
                        searchid()
                        console.log("Like in Post =>", post.likes);
                    }}>

                        {
                         post.likes.includes(userId) ? 
                         <svg xmlns="http://www.w3.org/2000/svg" 
                         class="icon icon-tabler icon-tabler-thumb-up-filled" width="32" height="32" 
                         viewBox="0 0 24 24" stroke-width="2" stroke="#00ADB5" fill="none" 
                         stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M13 3a3 3 0 0 1 2.995 2.824l.005 .176v4h2a3 3 0 0 1 2.98 2.65l.015 .174l.005 .176l-.02 .196l-1.006 5.032c-.381 1.626 -1.502 2.796 -2.81 2.78l-.164 -.008h-8a1 1 0 0 1 -.993 -.883l-.007 -.117l.001 -9.536a1 1 0 0 1 .5 -.865a2.998 2.998 0 0 0 1.492 -2.397l.007 -.202v-1a3 3 0 0 1 3 -3z" stroke-width="0" fill="#00ADB5" /><path d="M5 10a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-1a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-7a2 2 0 0 1 1.85 -1.995l.15 -.005h1z" stroke-width="0" fill="#00ADB5" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        class="icon icon-tabler icon-tabler-thumb-up" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#00ADB5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg>
                        }
                        
                    </div>
                    {/* End The like button in the post */}
                    
                    
                        
                    
                    {/* Start The Comment button in the post */}
                    <div className='interact-button comment' onClick={(e)=>{
                        localStorage.setItem("postId", post._id);
                        navigate(`/post/${post._id}`)
                        
                    }}>
                        <i className="gg-comment"></i>
                    </div>
                    {/* End The Comment button in the post */}

                    {/* Start The Share button in the post */}
                
                    {/* End The Share button in the post */}
                </div>
                {/*End A bar containing three buttons to interact with the post */}
            </div>
            
        )
    })
    }
    </div>
    )
}

export default Posts