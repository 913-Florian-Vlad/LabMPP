import React, { useState } from "react";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Games from "./Games";

function Create() {
  const [name, setName] = useState("");
  const [release, setRelease] = useState("");
  const [genre, setGenre] = useState("");
  const [size, setSize] = useState(0);

  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !release.trim() || !genre.trim() || size <= 0) {
      alert("Please fill out all fields correctly.");
      return;
    }

    // Create a new game object
    const newGame = new Games(name, genre, release, size, "");

    try {
      // Send the game data to the backend
      const response = await axios.post("http://localhost:5000/add", newGame);

      // Redirect to the home page after successful creation
      history("/");
    } catch (error) {
      console.error("Error creating game:", error);
      alert("An error occurred while creating the game. Please try again later.");
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl>
            <TextField
              id="nameinput"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={release}
              onChange={(e) => setRelease(e.target.value)}
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
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
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
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
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
