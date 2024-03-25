import React, {useEffect , useState} from "react";
import { FormControl, Button, Grid, Typography } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import {Link, useParams} from "react-router-dom"
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function Data()
{
    

    const{id}=useParams();

   

    let history = useNavigate();
    let index= array.map(function(e){return e.getGameId()}).indexOf(id || "");
   
    let name= array[index].getGameName();

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) =>
    {
        e.preventDefault();

        history("/");
    }

    useEffect(() => {
        axios.get("http://localhost:3000/data"+id).then(res => console.log(res)).catch(err => console.log(err));
    },[]);

    return(
        <div>
            <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography variant="h6">Name:</Typography>
          <Typography>{name}</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography variant="h6">ID:</Typography>
          <Typography>{id}</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography variant="h6">Release Date:</Typography>
          <Typography>{array[index].getGameReleaseDate()}</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography variant="h6">Genre:</Typography>
          <Typography>{array[index].getGameGenre()}</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography variant="h6">Size:</Typography>
          <Typography>{array[index].getGameSize()}</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="warning" size="small">
            Back
          </Button>
        </Link>
      </Grid>
    </Grid>
        </div>
    );
}

export default Data;