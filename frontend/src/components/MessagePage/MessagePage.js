import React, { useContext, useEffect, useRef, useState } from 'react'
import icon from "../Image/user.png"
import axios from 'axios';
import { userContext } from '../../App';
import socketInit from '../socket.server';
function MessagePage() {
  const [following, setFollowing] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { token, userId,checkValue } = useContext(userContext);

  const reversChat = useRef(null);

  const infoMe = JSON.parse(localStorage.getItem("InfoMe"));
  const [toId , setToId] = useState(null);
  const [from , setFrom] = useState("");
  const [image, setImage] = useState("")
  const [imageMessage , setImageMessage] = useState(null);
  const [inputMessage , setInputMessage] = useState("");
  const [allMessages, setAllMessages] = useState(null);
  const [socket, setSocket] = useState(null);
  const [nameUserMessage, setNameUserMessage] = useState("");
  const [imageUserMessage, setImageUserMessage] = useState("");
  const [bioUserMessage ,setBioUserMessage] = useState("");
  const [countryUserMessage, setCountryUserMessage] = useState("");
  const [visInput, setVisInput] = useState("none");
  const [searchTerm, setSearchTerm] = useState('');


  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(()=>{
    axios.get(`http://localhost:5000/users/${userId}`, config).then((result) => {
      setFollowing(result.data.user.following);
      setFilteredUsers(result.data.user.following);
      }).catch((err) => {
        
      });
  },[])
  
  useEffect(()=>{
    socket?.on('connect', ()=>{
        console.log(true)
    })
   
    return()=>{
        socket?.close();
        socket?.removeAllListeners();
    }
  },[socket]);
  
  
  useEffect(() => {
    const handleMessagePrivate = (data) => {
      setAllMessages(prevMessages => [...prevMessages, data]);
    };
    socket?.on("messagePrivate", handleMessagePrivate);
    return()=>{
      socket?.off("messagePrivate", handleMessagePrivate)
    }
  }, [socket]);
  
  
  const sendMessage = ()=>{
    const newMessage = {
      room: toId,
      from: userId,
      message: inputMessage,
      name: infoMe.firstName + " " + infoMe.lastName,
      image : infoMe.image,
      image_message: imageMessage,
      created_at: new Date()
    };
  
    socket?.emit("messagePrivate", newMessage);
  }

 
    useEffect(()=>{
      setAllMessages([])
      if(toId){
      axios.get(`http://localhost:5000/users/message/${userId}/${toId}`, config).then((result)=>{
        setAllMessages(result.data.messages)
      }).catch((error)=>{
        console.error(error);
      })
    }
    },[toId]);
 

  
  const disconnectServer = ()=>{
    socket?.disconnect();      
  }

  useEffect(()=>{
    if(toId){
        if(reversChat.current){
            reversChat.current.scrollTop = reversChat.current.scrollHeight;
        };
    }
},[allMessages?.length])


const handleSearch = (e) => {
  setSearchTerm(e.target.value);
  const filtered = following.filter(user =>
      user.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
      user.lastName.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setFilteredUsers(filtered);
};

  useEffect(()=>{
    if(toId){
      setVisInput("Flex")
    }else{
      setVisInput("none")
      setNameUserMessage("");
            setImageUserMessage("");
            setBioUserMessage("");
            setCountryUserMessage("");
    }
  
  },[toId])

  return (
    <div style={{width:"100vw", height:"93vh", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"8px"}}>
      <div style={{width:"20%", height:"95%", display:"flex", flexDirection:"column", borderRadius:"4px 0 0 4px",background:"white"}}>
      <div style={{height:"7%", padding:"12px", textAlign:"start", fontWeight:"bold", borderBottom:"1px solid #efefef", display:"flex", 
      justifyContent:"center", flexDirection:"column", gap:"5px"}}>
        <h4 onClick={()=>{
          setToId(null);
        }}>Message</h4>
        <input placeholder='Search' value={searchTerm} onChange={handleSearch}/>
        </div>
      <div style={{height:"100%"}}>
        {filteredUsers?.map((e,i)=>{
          return(
          <div style={{display:"flex", gap:"5px",alignItems:"center", margin:"5px", padding:"5px", borderBottom:"1px solid #efefef", cursor:"pointer"}} onClick={()=>{
            setToId(e._id);
            setNameUserMessage(e.firstName + " " + e.lastName);
            setImageUserMessage(e.image);
            setBioUserMessage(e.bio);
            setCountryUserMessage(e.country);
            setSocket(socketInit({user_id : userId, token :token , room : e._id}));
          }}>
          <img src={e.image} style={{width:"48px", borderRadius:"24px"}}/>
          <h4 style={{color:"black"}}>{e.firstName +" "+ e.lastName}</h4>
          </div>
          )

        })}
        
      </div>
      </div>
      <div style={{width:"50%", background:"red", height:"95%", borderRadius:"0 4px 4px 0",background:"white"}}>
      
      <div style={{textAlign:"start", fontWeight:"bold",height:"7%", borderBottom:"1px solid #efefef",borderLeft:"1px solid #efefef", display:visInput, alignItems:"center", padding:"12px", gap:"5px"}}>
        <img src={imageUserMessage} style={{width:"48px", borderRadius:"24px"}}/>
        <h4 style={{color:"black"}}>{nameUserMessage}</h4>
        
      </div>

      <div style={{height:"89%"}}>
        <div className='chat-message' style={{height:"90%", position:"relative",overflowY:"scroll"}} ref={reversChat}>
          {toId && 
          <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap:"12px",padding:"12px 0",background:"white",borderBottom:"1px solid #efefef", marginBottom:"5px"}}>
            <img src={imageUserMessage} style={{width:"124px" , borderRadius:"64px"}}/>
            <h3>{nameUserMessage}</h3>
            <h5>{bioUserMessage}</h5>
            <h5>{countryUserMessage}</h5>
          </div>
          }
          {toId ? allMessages?.length ? 
            
            allMessages?.map((message, index) => {
              if(message.from !== userId){
    
                const endDate = new Date(message.created_at);
                const now = new Date();
                const difference = now - endDate;
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor(difference / (1000 * 60));
                const seconds = Math.floor(difference / 1000);
                let dateNow = '';
                if(days){
                    dateNow = `${days} days ago`;
                }else if(hours){
                    dateNow = `${hours} hour ago`;
                }else if(minutes){
                    dateNow = `${minutes} minutes ago`;
                }else if(seconds){
                    dateNow = `just now`;
                }else{
                    dateNow = `just now`;
                }
    
    
                return(
                <div style={{display:"flex", justifyContent:"end",textAlign:"end", padding:"5px", gap:"5px", margin:"0"}}>
                  <div style={{maxWidth:"70%", display:"flex", flexDirection:"column", gap:"5px"}}>
                  <h6>{message.name}</h6>
                  <h4 style={{backgroundColor:"#018b92",color:"white", padding:"10px",borderRadius:"6px 0 6px 6px",maxWidth:"100%",wordWrap:"break-word"}}>{message.message}</h4>
                  <h6>{dateNow}</h6>
                  </div>
                    
                    <div style={{display:"flex", height:"100%",flexDirection:"column", justifyContent:"flex-start"}}>
                      <img src={message.image} style={{width:"48px",borderRadius:"100%"}}/>
                    </div>
                  </div>
                )
              }
              if(message.from === userId){
                const endDate = new Date(message.created_at);
                const now = new Date();
                const difference = now - endDate;
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor(difference / (1000 * 60));
                const seconds = Math.floor(difference / 1000);
                let dateNow = '';
                if(days){
                    dateNow = `${days} days ago`;
                }else if(hours){
                    dateNow = `${hours} hour ago`;
                }else if(minutes){
                    dateNow = `${minutes} minutes ago`;
                }else if(seconds){
                    dateNow = `just now`;
                }else{
                    dateNow = `just now`;
                }
                
                return (
                  <div style={{display:"flex", justifyContent:"start",textAlign:"start", padding:"5px", gap:"5px", maxWidth:"100%", margin:"0"}}>
                      <div style={{display:"flex", height:"100%",flexDirection:"column", justifyContent:"flex-start"}}>
                      <img src={message.image} style={{width:"48px",borderRadius:"100%"}}/>
                    </div>
                    <div style={{maxWidth:"70%", display:"flex", flexDirection:"column", gap:"5px"}}>
                    <h6>{message.name}</h6>
                    <h4 style={{backgroundColor:"#e0e0e0",color:"black", padding:"10px",borderRadius:"0 6px 6px 6px", maxWidth:"100%",wordWrap:"break-word"}}>{message.message}</h4>
                    
                    <h6>{dateNow}</h6>
                  </div>
                    
                  </div>
                )
              }
            })
            : 

            <>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <h4 style={{padding:"10px", fontWeight:"normal"}}>No messages have been sent yet. Be the first to start the conversation!</h4>
            </div>
            </>
            :
            <>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>
            <h4 style={{padding:"10px", fontWeight:"normal"}}>choose a user to display the chat with.</h4>
            </div>
            </>

          }
        
        


        </div>
        <div className='input-send-message' style={{height:"10%", display:visInput, alignItems:"center", gap:"5px"}}>
            <textarea placeholder='write anything' 
            style={{height:"75%", maxHeight:"75%", minHeight:"75%", minWidth:"91%",maxWidth:"91%", width:"91%", border:"1px solid #dcdcdc", padding:"5px"}} onChange={(e)=>{
              setInputMessage(e.target.value)
            }}
            value={inputMessage}/>
            <button style={{border:"0", height:"50%", padding:"10px", borderRadius:"4px", background:"orange"}} onClick={()=>{
              if(inputMessage){
                setInputMessage("");
                sendMessage();
              };
            }}>Send</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default MessagePage
