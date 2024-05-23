/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router,Route,Routes, useNavigate, Navigate } from "react-router-dom";
import "./App.css"
import Create from "./components/create";
import Home from "./components/home";
import Edit from "./components/edit";
import Data from "./components/data";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Games from "./components/Games";
import Developers from "./components/developers";
import Login from "./components/Login";
import Register from "./components/Register";

export const GamesContext = createContext<Games[]>([]);
function Root()
{
    
    return(
    <div>
        <Nav />
        <Routes>
                    
                    <Route path="/" element={<Navigate to="login"/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/edit/:id" element={<Edit/>}/>
                    <Route path="/data/:id" element={<Data/>}/>
                    <Route path="/developers" element={<Developers/>}/>

        </Routes>
    </div>
    );
}

function App()
{
    const [games,setGames] = useState<Games[]>([]);
    

    const fetchData =  async () => {
        try{
            const response = await axios.get("http://localhost:5000/games");
            const gamesList = response.data.map((game: any) => new Games(game.name, game.genre, game.release_date, game.size, game.developer_id, game.id));
            setGames(gamesList);
        }catch(error){
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data. Please try again later.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <GamesContext.Provider value={games}>
        <div className="App">
            <Router>
               <Root />
            </Router>
        </div>
        </GamesContext.Provider>
    );
}
export default App;