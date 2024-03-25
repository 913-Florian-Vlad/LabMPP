import React, {useEffect , useState} from "react";
import {Button,Grid, TextField,FormControl, FormGroup} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import {Link, useParams} from "react-router-dom"
import {useNavigate} from "react-router-dom";
import Games from "./Games";
import axios from "axios";


function Edit()
{
    const [Name,setname] = useState("");
    const [Release_date,setrelease] = useState("");
    const [Genre,setgenre] = useState("");
    const [Size,setsize] = useState(0);
    const{id}=useParams();

    let history = useNavigate();

    let index = array.map(function (e){return e.getGameId()}).indexOf(id || "");
  
    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) =>
    {   
        e.preventDefault();
        if(Name == "")
        {
            alert("invalid input");
            return ;
        }

        
        let a = array[index];

        a.setGameName(Name);
        a.setGameReleaseDate(Release_date);
        a.setGameGenre(Genre);
        a.setGameSize(Size);
        history("/");
    }



    useEffect(() => {
      axios.get("http://localhost:3000/edit"+id).then(res => console.log(res)).catch(err => console.log(err));
      setsize(parseInt(localStorage.getItem("size") as string));
      setgenre(localStorage.getItem("genre") as string)
      setrelease(localStorage.getItem("release_date") as string);
      setname(localStorage.getItem("name") as string);
      
    },[]);

    const handleKeyPress = (e) =>{
      if(e.key == "Enter")
      handleSubmit(e);
    }

    return(
    <div onKeyPress={handleKeyPress}>
    <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="nameinput"
              label="Name"
              value={Name }
              onChange={(e) => setname(e.target.value)}
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
                    onChange={(e) => setrelease(e.target.value)}
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
                    onChange={(e) => setgenre(e.target.value)}
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
                    onChange={(e) => setsize(Number(e.target.value))}
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