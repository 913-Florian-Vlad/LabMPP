import React from "react";
import { BrowserRouter as Router,Route,Routes, useNavigate } from "react-router-dom";
import "./App.css"
import Create from "./components/create";
import Home from "./components/home";
import Edit from "./components/edit";
import Data from "./components/data";
import Nav from "react-bootstrap/Nav";
function Root()
{
    const navigate=useNavigate();
    return(
    <div>
        <Nav />
        <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/edit/:id" element={<Edit/>}/>
                    <Route path="/data/:id" element={<Data/>}/>

        </Routes>
    </div>
    );
}
function App()
{
    return(
        <div className="App">
            <Router>
               <Root />
            </Router>
        </div>
    );
}
export default App;