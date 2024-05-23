import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{

            const response = await axios.post("http://localhost:5000/register", {name, password});
            if(response.data.message !== "User already exists"){
                alert("User registered successfully.")
                history("/");
            }else{
                alert("The user may already exist. Please try again.");
            }
        }catch(error){
            console.error("Error registering:", error);
            alert("An error occurred while registering. Please try again later.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Username"
                value={name}
                onChange={handleUsernameChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Register
            </Button>
        </form>
    );
};

export default Register;