import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { userContext } from "../../App"
import "./style.css"
import { useNavigate } from 'react-router-dom';
function EditProfile() {
  const navigate = useNavigate();
    const { token, userId } = useContext(userContext);
    const [dataUser , setDataUser] = useState([]);

    const [firstName, setFirstName]= useState(dataUser.firstName);
    const [lastName, setLastName]= useState(dataUser.lastName);
    const [email, setEmail]= useState(dataUser.email);
    const [phoneNumber, setPhone]= useState(dataUser.phoneNumber);

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    useEffect(()=>{
      axios.get(`http://localhost:5000/users/${userId}`, config).then((result) => {
        setDataUser(result.data.user);
      }).catch((err) => {
        if(err.response.status === 403){
          navigate("/login");
          localStorage.clear();
      }
      });
    },[]);
   
  return (
    <div className='main-edit'>
      
      <div className='contener-edit-profile'>
        <div className='contener-info-edit-main'>
          <div className='contener-info-edit'>

          
          <div className='img-name-info'>          
            <img className='image-profile' src={`${dataUser.image}`}/>
            <div>{dataUser.firstName +" "+ dataUser.lastName}</div>
          </div>
          <div>
            <button className='btn-open-profile' onClick={()=>{
              axios.put(`http://localhost:5000/users/${userId}`, {firstName, lastName,email, phoneNumber},config).then((result) => {
                console.log("Update Data User Successfully");
                navigate(-1)
              }).catch((err) => {
                console.log("Error =>", err);
              });
            }}>Save Change</button>
          </div>
          </div>
        </div>
        <div style={{display:"flex", flexDirection:"column",placeItems:"center"}}>
          <div style={{textAlign:"start", marginLeft:"20px", color:"rgb(160,160,160)",fontSize:"18px", width:"50%"}}>Personal details</div>
          <div className='line' style={{maxWidth:"50%"}}></div>
        </div>
        
        <div className='contenter-input'>
          <div className='label-and-input'>
          <div>
            <div className='label'>First Name:</div>
            <input id='first-name' className='input-edit' defaultValue={dataUser.firstName} onChange={(e)=>{
              setFirstName(e.target.value);
            }}/>
          </div>
          <div>
            <div className='label'>Last Name:</div>
            <input id='last-name' className='input-edit' defaultValue={dataUser.lastName} onChange={(e)=>{
              setLastName(e.target.value);
            }}/>
          </div>
          
        </div>

        <div className='label-and-input'>
        <div>
          <div className='label'>Email:</div>
          <input id='email' className='input-edit' defaultValue={dataUser.email} onChange={(e)=>{
            setEmail(e.target.value);
          }}/>
        </div>
        <div>
          <div className='label'>Phone:</div>
          <input id='phone' className='input-edit' defaultValue={dataUser.phoneNumber} onChange={(e)=>{
            setPhone(e.target.value);
          }}/>
          </div>
        </div>
        </div>

      </div>
    </div>
  )
}

export default EditProfile