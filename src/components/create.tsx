/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GamesContext } from "../App";
import Games from "./Games";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Developer from "./Developer";

function Create() 
{
  // State for holding game data
  const games = React.useContext(GamesContext);
  const [game,setGame]=useState({
    name:"",
    release_date:"",
    genre:"",
    size:0,
    developer_id:0,
  });
  const [developer_name,setDeveloperName]=useState("");
  const [developers,setDeveloper] = useState<Developer[]>([]);
  const devName = localStorage.getItem("name");
  const history = useNavigate();

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!game.name.trim() || !game.release_date.trim() || !game.genre.trim() || game.size <= 0) {
      alert("Please fill out all fields correctly.");
      return;
    }

      try{
      const developer = await axios.get(`http://localhost:5000/developers/${devName}`);
      const developerData = developer.data.developer_id;
      game.developer_id = developerData;
      const response = await axios.post("http://localhost:5000/games", game);
      history("/");
      }
      catch(error){
        console.error("Error creating game:", error);
        alert("An error occurred while creating the game. Please try again later.");
      }
    
      
  };
  
  

useEffect(() => {
  const fetchDevelopers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/developers/20");
      setDeveloper(response.data);
    } catch (error) {
      console.error("Error fetching developers:", error);
      alert("An error occurred while fetching developers. Please try again later.");
    }
  };

  fetchDevelopers();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl>
            <TextField
              id="nameinput"
              label="Name"
              value={game.name}
              onChange={(e) => setGame({...game,name:e.target.value})}
              type="text"
              placeholder="Enter name"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <TextField
              id="releaseinput"
              label="Release Date"
              value={game.release_date}
              onChange={(e) => setGame({...game,release_date:e.target.value})}
              type="text"
              placeholder="Enter release date"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <TextField
              id="genreinput"
              label="Genre"
              value={game.genre}
              onChange={(e) => setGame({...game,genre:e.target.value})}
              type="text"
              placeholder="Enter genre"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <TextField
              id="sizeinput"
              label="Size"
              value={game.size}
              onChange={(e) => setGame({...game, size:parseInt(e.target.value)})}
              type="number"
              placeholder="Enter size"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create
            </Button>
          </FormControl>
          <FormControl>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="warning">
                Back
              </Button>
            </Link>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default Create;
