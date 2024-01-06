import React from 'react'
import "./style.css"
function Home() {
  return (
    <div className='home-contenter'>
        <div style={{width: "100%", backgroundColor: "white", height:"25%", borderRadius:"10px" ,display:"flex", flexDirection:"row", placeItems:"center", gap:"10px"}}>
        <img src={require(`../Image/user.png`)} style={{width:"64px", height:"64px", marginLeft:"10px",border:"0"}}/>
        <input style={{width:"80%",height:"50%",borderRadius:"4px", border:"1px solid rgb(200,200,200)"}} placeholder='what Think?' />
        <button style={{backgroundColor:"#4464AD",border:"0",color:"white", fontSize:"16px", padding:"10px", borderRadius:"5px", paddingTop:"16px",paddingBottom:"16px"}}>Post</button>
        </div>
    </div>

  )
}

export default Home