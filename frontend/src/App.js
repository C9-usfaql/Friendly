import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Main from "./components/Main/Main"
function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>

    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/" element={<Main/>}/>
    </Routes>
    </div>
  );
}

export default App;
