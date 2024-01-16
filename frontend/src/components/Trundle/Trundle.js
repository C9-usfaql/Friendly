import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios";
import "./trundle.css"
import { userContext } from '../../App';
function Trundle() {
    const { token, userId, checkValue} = useContext(userContext);
    const [dataTrundle, setDataTrundle] = useState(null);
    const [controlVideo, setControlVideo] = useState("play");
    const [isMuted, setIsMuted] = useState(false);
    const [intData, setIntData] = useState(0);
    const videoRef = useRef(null);
  
    const playAndStop = () => {
      if (controlVideo === "play") {
        videoRef.current.play();
        setControlVideo("pause");
      } else {
        videoRef.current.pause();
        setControlVideo("play");
      }
    };

    const next = ()=>{
        console.log("IntData", dataTrundle[intData]);
        
        if(intData < dataTrundle.length-1){
            setIntData(intData + 1);
        }
    }
    const back = () =>{
        if(intData > 0){
            setIntData(intData - 1);
        }
    }
    const toggleMute = () => {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
      };
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(()=>{
        axios.get("http://localhost:5000/trundle/", config).then((result) => {
            console.log("Trundle =>", result);
            setDataTrundle(result.data.trundle);
        }).catch((err) => {
            
        });
    },[]);

  return (
    <div >
        <div style={{color:"#018b92", fontWeight:"bold", fontSize:"5vh" , height:"10vh" , justifyContent:"center", fontFamily:"cursive",alignItems:"center", display:"flex"}}>Trundle</div>
        <div style={{display :"flex" , height: "80vh",gap:"5%" ,justifyContent:"center", alignItems:"center"}}>

        
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#ffffff" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" onClick={back}>
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
        </svg>
        <div style={{position:"relative" , width:"500", height:"720"}}>
        <div style={{position:"absolute", left:"10px",top:"10px", display:"flex", gap:"5px"}}>
        <img style={{ borderRadius:"26px", width:"52px" , border:"2px solid #018b92"}} src={dataTrundle && dataTrundle[intData].author.image}/>
        <div style={{marginTop :"9px"}}>
            <div>
                <label style={{color:'white', marginTop:"10px", fontWeight:"bold"}}>{dataTrundle && dataTrundle[intData].author.firstName} </label>
                <label style={{color:'white', marginTop:"10px", fontWeight:"bold"}}>{dataTrundle && dataTrundle[intData].author.lastName} </label>
            </div>
        <label style={{color:'gray', marginTop:"10px", fontSize:"13px"}}>{dataTrundle && dataTrundle[intData].dateTrundle} </label>
        </div>
        
        </div>
        
        <div style={{position:"absolute", right:"4%" ,top :"72%", zIndex:5}}>
            
            <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" style={{ backgroundColor:"rgb(0,0,0,0.5)" ,              padding:"10px", borderRadius:"32px"}} fill="#018b92" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 19 16">
                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                </svg>
                <label style={{color:"white", textShadow:"0 0px 5px black"}}>{dataTrundle && dataTrundle[intData].likes} Like</label>
            </div>
        </div>
        
        
        <div style={{position:"absolute", right:"4%" ,top :"85%", zIndex:5}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" style={{ backgroundColor:"rgb(0,0,0,0.5)" , padding:"10px", borderRadius:"32px"}} fill="white" class="bi bi-share" viewBox="0 0 19 16">
        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
        </svg>
        </div>

        <div style={{position : "absolute", bottom: 10 , right:10 , zIndex: 4,borderRadius:"4px" ,backgroundColor:"black",width:"fit-content", height:"fit-content"}} onClick={toggleMute}>
          {isMuted ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-volume-mute-fill"  viewBox="0 0 16 16">
  <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
  <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
  <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"/>
</svg>}
        </div>
        <video style={{borderRadius:"15px"}} ref={videoRef} src={dataTrundle && dataTrundle[intData].video} width="400" height="700" controls ={false} onClick={playAndStop}>
        </video>
        
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#ffffff" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16" onClick={next}>
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
        </svg>
        </div>
    </div>
  )
}

export default Trundle