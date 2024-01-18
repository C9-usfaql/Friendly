import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Login/login.css";



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
    const [rePassword, setRePassword] = useState("");
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [anError, setAnError] = useState(false)
    const [codeCountry, setCodeCounrty] = useState("");
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear()-18 - i);

    const [selectedValue, setSelectedValue] = useState('option1');

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return(
<<<<<<< HEAD
        <div style={{display:"flex" , width:"100vw", height:"100vh",margin:"0",padding:"0" , justifyContent:"center", alignItems:"center"}}>
            <div style={{width:"50%", height:"70%" ,alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <div>
                <img style={{width:"35%"}} src={require("../Image/logo.png")}/>
                </div>
                <p style={{fontSize:"20px"}}>Create an account in an easy and inexpensive way</p>
            </div>

            <div style={{width:"50%", display:"flex", alignItems:"center", justifyContent:"center" ,height:"70%"}}>
                
                <div style={{width:"60%", backgroundColor:"white", height:"100%", justifyContent:"center", display:"flex",borderRadius:"8px", flexDirection:"column"}}>
                    <div style={{height:"25%", display:"flex", justifyContent:"center", alignItems:"center", color:"#018b92", fontWeight:"bold", fontSize:"23px"}}>Register</div>
                    <div style={{width:"100%", backgroundColor:"white", height:"fit-content", justifyContent:"center", display:"flex", flexDirection:"column"}}>
                        
                        <div className={anError? "errorhint" : "errorhintdis"}>One or more data is missing</div>
                        <div style={{display:"flex", width:"100%", justifyContent:"center"}}>
                            <div style={{display:"flex", width:"90%", justifyContent:"center"}}>
                            <input style={{width:"50%"}} placeholder="First Name" onChange={(e)=>{
                                setFirstName(e.target.value);
                            }}/>
                            <input style={{width:"50%"}} placeholder="Last Name" onChange={(e)=>{
                                setLastName(e.target.value);
                            }}/>
                            </div>
                        </div>
                        <div style={{width:"100%",display:"flex", justifyContent:"center"}}>
                            <div style={{width:"90%",display:"flex", justifyContent:"center"}}>
                                <input style={{width:"100%"}} placeholder="Email" onChange={(e)=>{
                                setEmail(e.target.value);
                                }}/>
                            </div>

                        </div>
                        <div class="container" style={{display:"flex" , justifyContent:"center"}}>
                            <div className="radio-div">
                                <input type="radio" id="male" value="Male" checked={selectedValue === 'Male'} onChange={handleRadioChange}/>
                                <span onClick={()=>{
                                    setSelectedValue("Male");
                                    setGender("male");
                                }}>Male</span>
                            </div>
                            <div className="radio-div">
                                <input type="radio" id="female" value="Female"  checked={selectedValue === 'Female'} onChange={handleRadioChange}/>
                                <span onClick={()=>{
                                    setSelectedValue("Female");
                                    setGender("female")
                                }}>Female</span>
                            </div>
                            

                        </div>

                        <div className="select-div">
                            <div style={{width:"90%", display:"flex", alignItems:"center"}}>
                                <div style={{width:"25%"}}>Country</div>
                                <div className="select">
                                    <select onChange={(e)=>{
                                        setCountry(e.target.value);
                                        if(e.target.value === "Jordan"){
                                            setCodeCounrty("+962")
                                        }else if(e.target.value === "Saudi Arabia"){
                                            setCodeCounrty("+966")
                                        }else if(e.target.value === "Egypt"){
                                            setCodeCounrty("+20")
                                        }else if(e.target.value === "UAE"){
                                            setCodeCounrty("+971")
                                        }else{
                                            setCodeCounrty("");
                                        }
                                        console.log(e.target.value);
                                    }} >
                                        <option value="">Select</option>
                                        <option>Jordan</option>
                                        <option>Saudi Arabia</option>
                                        <option>Egypt</option>
                                        <option>UAE</option>
                                    </select>
                            </div>
                            </div>
                            

                        </div>
                        <div style={{display:"flex" ,width:"100%", justifyContent:"center"}}>
                            <div style={{display:"flex" ,width:"90%", alignItems:"center"}}>
                            <label style={{width:"25%"}}>
                                    {codeCountry}
                            </label>
                            <input style={{width:"75%"}} type="tel" maxLength={9} placeholder="Phone" onChange={(e)=>{
                                setPhone(codeCountry + e.target.value);
                            }}/>
                            </div>
                        </div>

                        <div style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"center"}}>
                            <div style={{width:"22.5%", fontSize:"14px"}}>date of birth :</div>
                            <select style={{width:"22.5%", }} value={day} onChange={(e) => setDay(e.target.value)}>
                                <option value="">Day</option>
                                    {daysInMonth.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                            </select>
                            <select style={{width:"22.5%"}} value={month} onChange={(e) => setMonth(e.target.value)}>
                                <option value="">Month</option>
                                    {months.map((m, index) => (
                                        <option key={index} value={index + 1}>{m}</option>
                                    ))}
                            </select>
                            <select style={{width:"22.5%"}} value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">Year</option>
                                    {years.map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                            </select>
                        </div>

                        <div style={{display:"flex", width:"100%" ,justifyContent:"center"}}>
                            <div style={{display:"flex", width:"90%" ,justifyContent:"center"}}>
                                <input style={{width:"100%"}} placeholder="Password" onChange={(e)=>{
                                    setPassword(e.target.value);
                                }}/>
                                <input style={{width:"100%"}} placeholder="Re Password" onChange={(e)=>{
                                    setRePassword(e.target.value);
                                }}/>
                            </div>
                        </div>
                        <div style={{width:"100%"}}>
                            <button className="btn-login" onClick={()=>{
                                if(!firstName || !lastName || !email || !gender || !country || !phoneNumber || !day || !month || !year || !password || !rePassword){
                                    setAnError(true);
                                }else{
                                    setAnError(false);
                                    axios.post("http://localhost:5000/users/register",
                                    {firstName,lastName,email,gender,country,phoneNumber , dateBrith : day +"/" + month + "/" + year, password}).then((result)=>{
                                        navigate("/login");
                                        console.log("Create Account Successfuly");            
                                    }).catch((err)=>{
                                        console.log("an Error", err)
                                    })
                                    
                                    
                                }
                            }}>Register</button>
                        </div>
                    </div>
                    <div style={{height:"25%",display:"flex", justifyContent:"center", alignItems:"center", gap:"5px"}}> <label>Alredy have account?</label> <Link to={"/login"}> Login</Link></div>
                </div>
=======
        <div className="contenter-content-login-register">
            

>>>>>>> e844b7118e2f137e36fff1e5c6fd9ff1c620dda9
                
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