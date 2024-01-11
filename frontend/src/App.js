import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"

import OnePost from "./components/OnePost/OnePost";
import Main from "./components/Main/Main"
import { useState , createContext} from "react";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/EditProfile/EditProfile";

export const userContext = createContext();
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postIdForComment, setPostIdForComment] = useState(null);
  const[userId,setUserId]=useState(localStorage.getItem("userId"));
  const [data, setData] = useState([]);
  return (
    <userContext.Provider value={{token, setToken, isLoggedIn , setIsLoggedIn, setUserId, userId, data,setData , postIdForComment, setPostIdForComment}}>

    <div className="App">
    <Navbar/>
    <Routes>

    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/" element={<Main/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/post/:id" element={<OnePost/>}/>
    <Route path="/profile/edit" element={<EditProfile/>}/>
    </Routes>
    </div>


    </userContext.Provider>
   
  );
}

export default App;
