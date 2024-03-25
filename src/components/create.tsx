import React,{useState} from "react";
import {Button,FormControl,Grid,TextField} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import {v4 as uuidv4} from 'uuid';
import {Link,useNavigate} from "react-router-dom";
import Games from "./Games";

function Create()
{
    const [name,setname] = useState("");
    const [release,setrelease] = useState("");
    const [genre,setgenre] = useState("");
    const [size,setsize] = useState(0);

    let history = useNavigate();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) =>
    {
        e.preventDefault();

        for(let i in array)
        {
            if(array[i].getGameName() == name)
            {
                alert("Game already exists");
                return;
            }

        }

        let index = array[array.length-1].getGameId();
        let index_int = parseInt(index) + 1;  
        let uni =index_int.toString(); 

        let a = name;
        let b= release;
        let c= genre;
        let d=size;
        if(name == "")
        {
            alert("invalid input");
            return;
        }else if(release == "") {
            array.push(new Games(a,c,"",0,uni));
        }else if(genre == ""){
            array.push(new Games(a,"",b,d,uni));       
        }else{
            array.push(new Games(a,c,b,d,uni));
        }
        history("/");
    }
    const handleKeyPress = (e) =>{
        if(e.key == "Enter")
        handleSubmit(e);
    }

    return(
        <div onKeyPress={handleKeyPress}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl>
                        <TextField
                            id="nameinput"
                            label="Name"
                            value={name}
                            onChange={(e)=>setname(e.target.value)}
                            type="text"
                            placeholder="enter name"/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <TextField
                            id="releaseinput"
                            label="Release Date"
                            value={release}
                            onChange={(e)=>setrelease(e.target.value)}
                            type="text"
                            placeholder="enter release date"/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <TextField
                            id="genreinput"
                            label="Genre"
                            value={genre}
                            onChange={(e)=>setgenre(e.target.value)}
                            type="text"
                            placeholder="enter genre"/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <TextField
                            id="sizeinput"
                            label="Size"
                            value={size}
                            onChange={(e)=>setsize(Number(e.target.value))}
                            type="number"
                            placeholder="enter size"/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Create</Button>
                    </FormControl>
                    <FormControl>
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Button variant="contained" color="warning">Back</Button>
                        </Link>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
        
    );
}

export default Create;