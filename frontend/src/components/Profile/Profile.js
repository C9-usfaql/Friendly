import React, { useEffect, useState, useContext, useRef } from 'react'
import "./style.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from "../../App"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Profile() {
  const navigate = useNavigate();
  const { token, userId,checkValue } = useContext(userContext);
  const [nameUser, setNameUser] = useState(null);
  const [imageUser, setImageUser] = useState(null);
  const [bio, setBio]= useState(null);
  const [phone, setPhone] = useState(null);
  const [gender,setGender] = useState(null);
  const [country, setCountry]= useState(null);
  const [followingUsers, setFollwingUsers] = useState(null);
  const [followerUsers, setFollowerUsers] = useState(null);
  const [lengthFollower, setLengthFollower] = useState(null);
  const [lengthFollowing, setLengthFollowing] = useState(null);
  const [lengthPosts, setLengthPosts] = useState(null);
  const [dataPosts , setDataPost]= useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editAllow, setEditAllow] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [contentPostAfterEdit, setContentPostAfterEdit] = useState('');
  const [follwing, setFollwing] = useState([]);
  const [userObject, setUserObject] = useState(null);
  const [show, setShow] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseFollower = () => setShowFollowers(false);
  const handleShowFollower = () => setShowFollowers(true);
 
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
  {dataPosts && dataPosts.sort(compareDates)};

  useEffect(() => {
    const handleBackButton = () => {
      localStorage.setItem("userIdG", userId)
      window.location.reload()
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);
  useEffect(()=>{
    if(localStorage.getItem("userIdG") && localStorage.getItem("userIdG")!== userId){
      axios.get(`http://localhost:5000/users/${userId}`, config).then((result) => {
        setUserObject(result.data.user);
        setFollwing(result.data.user.following);
        }).catch((err) => {
          
        })
        axios.get(`http://localhost:5000/users/${localStorage.getItem("userIdG")}`, config).then((result) => {
          setNameUser(result.data.user.firstName + " "+ result.data.user.lastName);
          setImageUser(result.data.user.image);
          setLengthFollower(result.data.user.follower.length);
          setLengthFollowing(result.data.user.following.length);
          setPhone(result.data.user.phoneNumber);
          setCountry(result.data.user.country);
          setGender(result.data.user.gender);
          setBio(result.data.user.bio);
          setFollwingUsers(result.data.following);
          setFollowerUsers(result.data.user.follower);
          axios.get(`http://localhost:5000/posts/search_1/${localStorage.getItem("userIdG")}`,config).then((result) => {
            result.data.posts.sort(compareDates);
            setDataPost(result.data.posts);
            setLengthPosts(result.data.posts.length);
          }).catch((err) => {
            
          });

        }).catch((err) => {
          if(err.response.status === 403){
            navigate("/login");
            localStorage.clear();
      }
    });
    }else{
      axios.get(`http://localhost:5000/users/${userId}`, config).then((result) => {
        setNameUser(result.data.user.firstName + " "+ result.data.user.lastName);
        setImageUser(result.data.user.image);
        setLengthFollower(result.data.user.follower.length);
        setLengthFollowing(result.data.user.following.length);
        setPhone(result.data.user.phoneNumber);
        setCountry(result.data.user.country);
        setGender(result.data.user.gender);
        setBio(result.data.user.bio);
        setFollwingUsers(result.data.following)
        setFollowerUsers(result.data.follower);
        
        axios.get(`http://localhost:5000/posts/search_1/${userId}`,config).then((result) => {
          result.data.posts.sort(compareDates);
          setDataPost(result.data.posts);
          setLengthPosts(result.data.posts.length);
        }).catch((err) => {
          
        });

        
    }).catch((err) => {
      if(err.response.status === 403){
        navigate("/login");
        localStorage.clear();
    }
    });
    }
},[]);

const openModal = (postId) => {
  setSelectedPostId(postId);
  setModalVisible(true);
};

const closeModal = () => {
  setSelectedPostId(null);
  setModalVisible(false);
};


const [maxWidth, setMaxWidth] = useState('100%');

  function handleImageLoad(event) {
    setLoading(false);
    const { naturalWidth , naturalHeight } = event.target;
    console.log(naturalWidth, "X", naturalHeight);
    if (naturalWidth === naturalHeight) {
      setMaxWidth('30%');
    }else{
      setMaxWidth('100%')
    }
  }

  return (
    <div className='contenter-profile-page'>

      <div className='profile-info'>
      <div className={!checkValue?'nav-bar-profile': 'nav-bar-profile-night'}>
            <div className="container" >
                <img src={require(`../Image/cover.jpg`)} className='cover-image'/>
                <img src={`${imageUser}`} className='user-image'/>
            </div>
            <div className="container-userinfo">
            <div className='nameUser'>{nameUser}</div>
            </div>
            
            <div style={{marginTop:"5px", color:"#00adb5", whiteSpace:"pre-line"}}>{bio}</div>

            <div className='container-info-profile' style={{display:"flex", flexDirection:"row", margin:"20px", justifyContent:"center", textAlign:"center", gap:"15px"}}>
                <div>
                <div>{lengthPosts}</div>
                <div>Post</div>
                </div>

                <div onClick={handleShowFollower}>
                <div>{lengthFollower}</div>
                <div>Followers</div>
                </div>

                <div onClick={handleShow}>
                <div>{lengthFollowing}</div>
                <div>Following</div>
                </div>

                
            </div>

            <div className={checkValue? 'line-night': "line"}  style={{marginBottom:"10px"}}></div>
            <div>
              <div style={{display: 'flex',marginLeft:"10px", gap:"10px", marginBottom:"5px"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>
                <label>{phone}</label>
              </div>
              <div style={{display: 'flex',marginLeft:"10px", gap:"10px" , marginBottom:"5px"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-ambiguous" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"/>
              </svg>
                <label>{gender}</label>
              </div>
              <div style={{display: 'flex',marginLeft:"10px", gap:"10px", marginBottom:"5px"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
              </svg>
                <label>{country}</label>
              </div>
            </div>
            {localStorage.getItem("userIdG") === userId ?<><div className='btn-open-profile' onClick={()=>{
              navigate("edit");
            }}>Edit Profile</div> <div className='btn-logout-profile' onClick={()=>{
              localStorage.clear();
              window.location.reload();
            }}>Logout</div>
            </>  : <>{<div className='btn-open-profile' onClick={()=>{
              axios.get(`http://localhost:5000/users/${userId}/${localStorage.getItem("userIdG")}`, config)
              .then((result) => {
                if (follwing.some(idUser => idUser._id === localStorage.getItem("userIdG"))) {
                  const arrFollow = follwing.filter(idUser => idUser._id !== localStorage.getItem("userIdG"));
                  const arrFollower = followerUsers.filter(idUser => idUser._id !== userId);
                  setFollwing(arrFollow);
                  setFollowerUsers(arrFollower)
                  setLengthFollower(lengthFollower-1)

                } else {
                  setFollwing([...follwing, { _id: localStorage.getItem("userIdG") }]);
                  setFollowerUsers([...followerUsers, userObject]);
                  setLengthFollower(lengthFollower+1)

                }
              })
              .catch((err) => {
                console.error(err);
              });
               
            }}>{follwing.some(idUser => idUser._id === localStorage.getItem("userIdG")) ? "unFollow" : "follow"}</div>}</>}
        </div>
      </div>

      <div className='post-content-profile'>

      {dataPosts && dataPosts.map((post, i)=>{

               
        const searchidPost = async()=>{
          axios.get(`http://localhost:5000/posts/${post._id}/like`,config).then((result) => {
            
              if(localStorage.getItem("userIdG") && localStorage.getItem("userIdG")!== userId){
                axios.get(`http://localhost:5000/users/${userId}`, config).then((result) => {
                  setFollwing(result.data.user.following);
                  }).catch((err) => {
                    
                  });
                  axios.get(`http://localhost:5000/posts/search_1/${localStorage.getItem("userIdG")}`,config).then((result) => {
                      result.data.posts.sort(compareDates);
                      setDataPost(result.data.posts);
                    }).catch((err) => {
                      
                    });
                  
              }else{
                  axios.get(`http://localhost:5000/posts/search_1/${userId}`,config).then((result) => {
                    result.data.posts.sort(compareDates);
                    setDataPost(result.data.posts);
                  }).catch((err) => {
                  });
              }
          }).catch((err) => {
          });
        };

        return(
            <div className={!checkValue?'contenter-post' : 'contenter-post-night'}>
                {/* <h1>POSTS</h1> */}
                {/* A bar containing a photo and username */}
                <div className='containing-top-post'>
                    <div className='containing-photo-username'>
                    <img style={{width:"48px" , borderRadius:"24px"}} src={post.author.image}/>
                    <div style={{display: "flex", flexDirection:"column"}}>
                        <div className='name-user'>{post.author.firstName + " "+ post.author.lastName}</div>
                        <div>{post.datePost}</div>
                        
                    </div>
                    </div>

                    <div style={{display : 'flex', flexDirection:"column"}}>

                    {localStorage.getItem("userIdG") === userId && <>
                    <button id={`${post._id}`}  className={!checkValue? 'menu': 'menu-night'} onClick={(e)=>{
                      if(modalVisible){
                          closeModal()
                      }else{
                          openModal(post._id);
                      }
                    }}>Menu</button>
                    </>}
                    

                {modalVisible && selectedPostId === post._id && (
                    <div id="id01" className="w3-modal" style={{ display: 'block' }}>
                    <div className="w3-modal-content">
                        <div className="w3-container">
                        <button onClick={()=>{
                            setEditAllow(true);
                        }}>Edit</button>
                        <button onClick={()=>{
                            axios.delete(`http://localhost:5000/posts/${post._id}/${post.author._id}` ,config).then((result) => {
                              axios.get(`http://localhost:5000/posts/search_1/${userId}`,config).then((result) => {
                                result.data.posts.sort(compareDates);
                                setDataPost(result.data.posts);
                                setLengthPosts(result.data.posts.length);
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
                        setModalVisible(false);
                        setEditAllow(false);
                    }).catch((err) => {
                        
                    });
                }}>Save</button></>: <div className={!checkValue? 'content-post': 'content-post-night'}>{post.content}</div>}
                
                <div>
                    {
     post.image && <div style={{  width: "98%",marginLeft:"1%", height: "100%" }}>
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
          onLoad={handleImageLoad}
          style={{
            maxWidth: maxWidth,
            justifyContent: "center",
            placeItems: "center",
            maxHeight: "80%",
            borderRadius: "10px",
          }}
          
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
                        searchidPost()
                    }}>

                        {
                        post.likes.includes(userId) ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00adb5" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                        </svg>
                        :<svg xmlns={"http://www.w3.org/2000/svg"}  width="24" height="24" fill="#00adb5" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                        </svg> 
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

      <Modal show={show} onHide={handleClose} keyboard={false} >
              <Modal.Header closeButton style={{height:"10%", display:"flex", justifyContent:"space-between",alignItems:"center", borderBottom:"1px solid gray"}}>
                <Modal.Title style={{fontWeight:"bold", fontSize:"24px"}}>Following</Modal.Title>
                <Button variant="secondary" onClick={handleClose} style={{width:"fit-content", height:"fit-content",padding:"5px",fontSize:"24px", borderRadius:"4px", border:"0", backgroundColor:"transparent", color:"red"}}>
                  X
                </Button>
              </Modal.Header>
              <Modal.Body style={{height:"90%"}}>
                {followingUsers?.map((e,i)=>{

                  return <div style={{display:"flex", gap:"5px", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(140, 140, 140,0.4)", padding:"5px"}}>
                    <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                      <img src={e.image} style={{width:"48px", height:"48px", borderRadius:"32px"}}/>
                      <h3>{e.firstName} {e.lastName}</h3>
                    </div>
                    <div>
                      {localStorage.getItem("userIdG") && localStorage.getItem("userIdG")!== userId ? 
                      <button style={{padding:"5px", borderRadius:"4px", border:"0"}} onClick={()=>{
                        localStorage.setItem("userIdG", e._id);
                        navigate("/profile");
                        window.location.reload()
                      }}>Show</button>
                      : 
                      <button style={{padding:"5px", borderRadius:"4px", border:"0"}} onClick={()=>{
                        axios.get(`http://localhost:5000/users/${userId}/${e._id}`,config).then((result) => {                      
                          if(i !== -1){
                          followingUsers.splice(i, 1);
                          setFollwingUsers([...followingUsers]);
                          }
                          
                        }).catch((err) => {
                                      
                        });
                      }}>UnFollow</button>
                      }
                    </div>
                  </div>
                })}
              </Modal.Body>
              
        </Modal>


        <Modal show={showFollowers} onHide={handleCloseFollower} keyboard={false} >
              <Modal.Header closeButton style={{height:"10%", display:"flex", justifyContent:"space-between",alignItems:"center", borderBottom:"1px solid gray"}}>
                <Modal.Title style={{fontWeight:"bold", fontSize:"24px"}}>Followers</Modal.Title>
                <Button variant="secondary" onClick={handleCloseFollower} style={{width:"fit-content", height:"fit-content",padding:"5px",fontSize:"24px", borderRadius:"4px", border:"0", backgroundColor:"transparent", color:"red"}}>
                  X
                </Button>
              </Modal.Header>
              <Modal.Body style={{height:"90%"}}>
                {followerUsers?.map((e,i)=>{
                  return <div style={{display:"flex", gap:"5px", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(140, 140, 140,0.4)", padding:"5px"}}>
                    <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                      <img src={e.image} style={{width:"48px", height:"48px", borderRadius:"32px"}}/>
                      <h3>{e.firstName} {e.lastName}</h3>
                    </div>
                    <div>
                      <button style={{padding:"5px", borderRadius:"4px", border:"0"}} onClick={()=>{
                        localStorage.setItem("userIdG", e._id);
                        navigate("/profile");
                        window.location.reload()
                      }}>Show</button>
                    </div>
                  </div>
                })}
              </Modal.Body>
              
        </Modal>
    </div>
  )
}

export default Profile