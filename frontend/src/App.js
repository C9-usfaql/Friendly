import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Main from "./components/Main/Main"
import { useState , createContext} from "react";
import Profile from "./components/Profile/Profile";
export const userContext = createContext();
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[userId,setUserId]=useState(localStorage.getItem("userId"));
  const [data, setData] = useState([]);
  return (
    <userContext.Provider value={{token, setToken, isLoggedIn , setIsLoggedIn, setUserId, userId, data,setData}}>

    <div className="App">
    <Navbar/>
    <Routes>

    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/" element={<Main/>}/>
    <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </div>


    </userContext.Provider>
   
  );
}

export default App;
