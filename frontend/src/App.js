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
import Search from "./components/Search/Search";

export const userContext = createContext();
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkValue, setCheckValue] = useState(localStorage.getItem("day"));
  const [postIdForComment, setPostIdForComment] = useState(null);
  const [profileId, setProfileId] = useState(false);
  const [infoMe, setInfoMe] = useState(null);
  const[userId,setUserId]=useState(localStorage.getItem("userId"));
  const [data, setData] = useState([]);
  const [searchValue , setSearchValue] = useState(null);
  return (
    <userContext.Provider value={{token, setToken, isLoggedIn , setIsLoggedIn, setUserId, userId, data,
     setData,setInfoMe, infoMe , postIdForComment, setPostIdForComment, profileId, setProfileId, checkValue, setCheckValue,
     searchValue , setSearchValue}}>

    <div className={!checkValue? "App": "AppNight"}>
    <Navbar/>
    <Routes>

    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/" element={<Main/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/post/:id" element={<OnePost/>}/>
    <Route path="/profile/edit" element={<EditProfile/>}/>
    <Route path="/search/:id" element={<Search/>}/>
    </Routes>
    </div>


    </userContext.Provider>
   
  );
}

export default App;
