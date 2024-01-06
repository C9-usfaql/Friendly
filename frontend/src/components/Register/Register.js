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
        <div className="contenter-content">
            <div class="container">
                <div style={{fontSize: "24px", marginBottom : "20px", marginTop: "10px"}}>Register</div>
               
                    <div class="mb-3"><input class="email-input" type="text" name="firstname" placeholder="First Name" onChange={(e)=>{
                        setFirstName(e.target.value);
                    }}/></div>
                    <div class="mb-3"><input class="email-input" type="text" name="lastname" placeholder="Last Name" onChange={(e)=>{
                        setLastName(e.target.value);
                    }}/></div>
                    <div class="mb-3"><input class="email-input" type="text" name="datebirth" placeholder="date Birth" onChange={(e)=>{
                        setDateBrith(e.target.value);
                    }}/></div>
                    <div class="mb-3"><input class="email-input" type="text" name="gender" placeholder="Gender" onChange={(e)=>{
                        setGender(e.target.value);
                    }}/></div>
                    <div class="mb-3"><input class="email-input" type="text" name="phone" placeholder="PhoneNumber" onChange={(e)=>{
                        setPhone(e.target.value);
                    }}/></div>
                    <div class="mb-3"><input class="email-input" type="text" name="county" placeholder="Country" onChange={(e)=>{
                        setCountry(e.target.value);
                    }}/></div>
                    <div class="mb-3"><input class="email-input" type="email" name="email" placeholder="Email" onChange={(e)=>{
                        setEmail(e.target.value);
                    }}/></div>
                    <div class="mb-3"><input class="password-input" type="password" name="password" placeholder="Password" onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/></div>
                    <div class="mb-3"><button class="btn btn-primary d-block w-100" type="submit" onClick={(e)=>{
                        axios.post("http://localhost:5000/users/register", {firstName,lastName,dataBirth,phoneNumber,country, gender, email,password}).then((result) => {
                            console.log("Create Account Successfully");
                            navigate("/");
                        }).catch((err) => {
                            console.log("Error", err);
                        });
                    }}>SginUp</button></div>
                    <p class="text-muted">Do you have Account? Login</p>
                
            </div>
        </div>
    )
}

export default Register