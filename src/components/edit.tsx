import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, FormControl } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Games from "./Games";
import axios from "axios";


function Edit()
{
    const {id} = useParams();
    const [Name,setName] = useState("");
    const [Release_date,setRelease] = useState("");
    const [Genre,setGenre] = useState("");
    const [Size,setSize] = useState(0);
    const [Developer_id,setDeveloper] = useState(0);
    const history = useNavigate();

    useEffect(() => {
      axios.get(`http://localhost:5000/games/${id}`)
          .then((res) => {
              const { name , release_date , genre , size , Developer_id } = res.data;
              setName(name);
              setRelease(release_date);
              setGenre(genre);
              setSize(size);
              setDeveloper(Developer_id);
          })
          .catch((err) => {
              console.error("Error fetching game data:", err);
          });
  }, [id]);

   
  
    const handleSubmit = (e) =>
    {   
        e.preventDefault();
        if(!Name.trim() || !Release_date.trim() || !Genre.trim() || Size <= 0)
        {
            alert("The input should be Month Day, Year for the release date and the name must start with capital letter. Please fill out all fields correctly.");
            return;
        }
        //const updatedGame = new Games(Name, Genre, Release_date, Size,Developer_id, parseInt(id));
        const updatedGame = {name:Name,genre:Genre,release_date:Release_date,size:Size,developer_id:Developer_id,id:id }
        try
        {

            axios.put(`http://localhost:5000/edit/${id}`,updatedGame);
            history("/");
        }
        catch(error)
        { 
            console.error("Error updating game:",error);
            alert("An error occurred while updating the game. Please try again later.");
        }
    }; 

    const handleKeyPress = (e) =>{
      if(e.key == "Enter")
      handleSubmit(e);
    };

    return(
    <div onKeyPress={handleKeyPress}>
    <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="nameinput"
              label="Name"
              value={Name }
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
                <TextField
                    id="releaseinput"
                    label="Release Date"
                    value={Release_date}
                    onChange={(e) => setRelease(e.target.value)}
                    type="text"
                    placeholder="Enter release date"
                />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
                <TextField
                    id="genreinput"
                    label="Genre"
                    value={Genre}
                    onChange={(e) => setGenre(e.target.value)}
                    type="text"
                    placeholder="Enter genre"
                />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
                <TextField
                    id="sizeinput"
                    label="Size"
                    value={Size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    type="number"
                    placeholder="Enter size"
                />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            id="updatebutton"
            onClick={(e) => handleSubmit(e)}
            variant="contained"
            color="primary"
            size="small"
          >
            Update
          </Button>
          
          <Link to="/" style={{ marginLeft: '8px', textDecoration: 'none' }}>
            <Button id="backButton" variant="contained" color="warning" size="small">
              Back
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
    );
}
export default Edit;