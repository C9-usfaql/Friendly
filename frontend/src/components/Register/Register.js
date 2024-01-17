import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";



const Register = ()=>{
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dataBirth, setDateBrith] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return(
        <div className="contenter-content-login-register">
            

                
                <div class="container-register">
                    <div style={{fontSize: "28px", marginBottom : "20px", marginTop: "10px"}}>Register</div>

                    <table>
                        <tr>
                            <th>Full Name</th>
                            <th>
                                <div class="mb-3"><input class="email-input" type="text" name="firstname" placeholder="First Name" onChange={(e)=>{
                                setFirstName(e.target.value);
                                }}/></div> 
                            </th>
                            <th>
                                <div class="mb-3"><input class="email-input" type="text" name="lastname" placeholder="Last Name" onChange={(e)=>{
                                setLastName(e.target.value);
                                }}/></div>
                            </th>
                        </tr>

                        <tr>
                            <th>
                                Date
                            </th>
                            <th  colspan="2">
                                <div class="mb-3"><input class="email-input" type="text" name="datebirth" placeholder="date Birth" onChange={(e)=>{
                            setDateBrith(e.target.value);
                            }}/></div>
                            </th>
                            
                        </tr>



                        <tr>
                            <th>
                                Phone
                            </th>

                            <th  colspan="2">
                                <div class="mb-3"><input class="email-input" type="text" name="phone" placeholder="PhoneNumber" onChange={(e)=>{
                                setPhone(e.target.value);
                                }}/></div>
                            </th>
                        </tr>
                        <tr>
                            <th>
                            </th>
                            <th  colspan="1">
                                <div class="mb-3">
                                <select class="email-input" type="text" name="county" placeholder="Country" onChange={(e)=>{
                                setCountry(e.target.value);
                                }}> 
                                <option>Country</option>
                                <option>Jordan</option>
                                <option>Saudi Arabia</option>
                                <option>Egypt</option>
                                <option>USA</option>
                                </select></div>
                            </th>
                            <th  colspan="1">
                                <div class="mb-3"><select class="email-input" type="text" name="gender" placeholder="Gender" onChange={(e)=>{
                                setGender(e.target.value);
                                }}><option>Gender</option></select></div>
                            </th>
                        </tr>

                        <tr>
                            <th>
                                Email
                            </th>
                            <td  colspan="2">
                                <div class="mb-3"><input class="email-input" type="email" name="email" placeholder="Email" onChange={(e)=>{
                                    setEmail(e.target.value);
                                    }}/>
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <th>
                                Passowrd
                            </th>
                            <th colspan="2">
                                <div class="mb-3"><input class="password-input" type="password" name="password" placeholder="Password" onChange={(e)=>{
                                    setPassword(e.target.value);
                                }}/></div>
                            </th>
                        </ tr>

                        <tr>
                            <th>

                            </th>
                            <th colSpan={2}>
                                <div class="mb-3"><button class="btn btn-primary d-block w-100" type="submit" onClick={(e)=>{
                                axios.post("http://localhost:5000/users/register", {firstName,lastName,dataBirth,phoneNumber,country, gender, email,password}).then((result) => {
                                console.log("Create Account Successfully");
                                navigate("/");
                                }).catch((err) => {
                                console.log("Error", err);
                                });
                                }}>SginUp</button></div>
                            </th>
                        </tr>
                    </table>
                    
                   
                    <div style={{display:"flex",flexDirection:"column"  , width:"38%"}}>
                    
                   
                    </div>
                   
                    <p class="text-muted">Do you have Account? <a onClick={()=>{
                        navigate(-1);
                    }}>Login</a></p>
                
                </div>
          
               
        </div>
    )
}

export default Register