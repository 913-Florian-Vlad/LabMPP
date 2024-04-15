import React, { useEffect, useState } from "react";
import { FormControl, Button, Grid, Typography } from '@mui/material';
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Data() {
    const { id } = useParams();
    const [gameData, setGameData] = useState(null);
    const history = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/data/${id}`)
            .then(res => {
                setGameData(res.data);
            })
            .catch(err => {
                console.error("Error fetching game data:", err);
            });
    }, [id]);

    const handleBack = () => {
        history("/");
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Typography variant="h6">Name:</Typography>
                        <Typography>{gameData ? gameData.name : "Loading..."}</Typography>
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
                        <Typography>{gameData ? gameData.release_date : "Loading..."}</Typography>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Typography variant="h6">Genre:</Typography>
                        <Typography>{gameData ? gameData.genre : "Loading..."}</Typography>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Typography variant="h6">Size:</Typography>
                        <Typography>{gameData ? gameData.size : "Loading..."}</Typography>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="warning" size="small" onClick={handleBack}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Data;
