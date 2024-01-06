import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";

const Login = ()=>{
    const{setUserId, setToken, setIsLoggedIn}=useContext(userContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
    <div>
       <div className="contenter-content">
            <div class="container">
                <div style={{fontSize: "24px", marginBottom : "20px", marginTop: "-10px"}}>Login</div>
                    <div class="mb-3"><input class="email-input" type="email" name="email" placeholder="Email" onChange={(e)=>{
                        setEmail(e.target.value);
                    }}/></div>
                    <div class="mb-3"><input class="password-input" type="password" name="password" placeholder="Password" onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/></div>
                    <div class="mb-3"><button class="btn btn-primary d-block w-100" type="submit" onClick={(e)=>{
                        axios.post("http://localhost:5000/users/login", {email, password}).then((result) => {
                            console.log("Login Successfully");
                            setIsLoggedIn(true);
                            setUserId(result.data.userId);
                            setToken(result.data.token);
                            localStorage.setItem("token", result.data.token);
                            localStorage.setItem("userId", result.data.userId);

                            navigate("/");
                        }).catch((err) => {
                            console.log("Error", err.response.data.message);
                        });
                    }}>Login</button></div>
                    <p class="text-muted">Forgot your password?</p>
            </div>
        </div>
    </div>
    )
}

export default Login