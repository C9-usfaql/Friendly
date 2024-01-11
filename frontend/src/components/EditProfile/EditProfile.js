import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { userContext } from "../../App"
import "./style.css"
function EditProfile() {
    const { token, userId } = useContext(userContext);
    const [dataUser , setDataUser] = useState([]);

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(`http://localhost:5000/users/${userId}`, config).then((result) => {
      console.log(result);
    }).catch((err) => {
        
    });
  return (
    <div style={{display:"flex",height:"85vh", flexDirection:"row", justifyContent:"center", placeContent:"center"}}>
      
      <div className='contener-edit-profile'>
        <div>Image User</div>
        <div>
        <input defaultValue={"firstName"}/>
          <input defaultValue={"lastName"}/>
        </div>

        <div><input defaultValue={"Email"}/></div>
        <div><input defaultValue={"Phone Number"}/></div>

      </div>
    </div>
  )
}

export default EditProfile