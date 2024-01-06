import React from 'react'
import "./style.css"
function NavbarV() {
  return (
    <div className='contenter-nav'>
        <div className='nav-bar'>
            <div className='menu home'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#4464AD" class="bi bi-house" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.   5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
            Home
            </div>
            <div className='menu explore'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#4464AD" class="bi bi-compass" viewBox="0 0 16 16">
                    <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                    <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                </svg>
                Explore
            </div>
            <div className='menu profile'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#4464AD" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289    10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
            Profile</div>
        </div>
        <div className='nav-bar'>
            <div style={{color: "gray", marginBottom: "10px", paddingTop:"10px"}}>Recommended Pages</div>
            <div style={{borderBottom: "1px solid rgb(200,200,200)", width:"90%",marginLeft:"5%"}} ></div>
            <div style={{display: "flex", flexDirection: "row", marginTop:"5px",marginLeft:"5px" ,padding: "5px", textAlign:"center", placeItems: "center" ,gap:"10px"}}>
                
                <img src={require(`../Image/user.png`)} style={{width:"48px"}}/>
                <div>Frindly inc.</div>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)", width:"80%",marginLeft:"10%"}} ></div>
            <div style={{display: "flex", flexDirection: "row", marginTop:"5px", marginLeft:"5px" ,padding: "5px", textAlign:"center", placeItems: "center" ,gap:"10px"}}>
                
                <img src={require(`../Image/user.png`)} style={{width:"48px"}}/>
                <div>Frindly inc.</div>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)", width:"80%",marginLeft:"10%"}} ></div>
            <div style={{display: "flex", flexDirection: "row", marginTop:"5px",marginLeft:"5px" ,padding: "5px", textAlign:"center", placeItems: "center" ,gap:"10px"}}>
                
                <img src={require(`../Image/user.png`)} style={{width:"48px"}}/>
                <div>Frindly inc.</div>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)", width:"80%",marginLeft:"10%"}} ></div>
            <div style={{display: "flex", flexDirection: "row", marginTop:"5px", marginLeft:"5px" ,padding: "5px", textAlign:"center", placeItems: "center" ,gap:"10px"}}>
                
                <img src={require(`../Image/user.png`)} style={{width:"48px"}}/>
                <div>Frindly inc.</div>
            </div>
            
            </div>
    </div>

    
    
  )
}

export default NavbarV