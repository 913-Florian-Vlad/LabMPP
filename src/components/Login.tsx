/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const history = useNavigate();
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    const checkTokenValidity = async () => {
        const token = localStorage.getItem("token");
        const expirationTime = localStorage.getItem("expirationTime");
        if(token && expirationTime){
            const currentTime = Date.now();
            console.log('Current time:', currentTime);
            const remainingTime = parseInt(expirationTime, 10) - currentTime;
            console.log('Remaining time:', remainingTime);

            if (remainingTime > 0) {
                // Token is still valid, reset the timer
                console.log('Token is still valid. Session will expire in', remainingTime / 1000, 'seconds.');
            } else {
                // Token has expired, logout the user
                logout();
                console.log('Token has expired. User logged out.');
            }
        }
    }

    
    const logout = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        setIsLogged(false);
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/login", {name, password});
            const { token } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("name", name);

            const expirationTime = Date.now() + 15 * 60 * 1000; // Current time + 15 minutes
            localStorage.setItem('expirationTime', expirationTime.toString());

            setTimeout(logout, expirationTime - Date.now());
            setIsLogged(true);
            if(response.data.message !== "Login failed"){
                alert("User logged in successfully.")
                history("/home");
            }
        }
        catch(error){
            console.error("Error logging in:", error);
            alert("An error occurred while logging in. Please try again later.");
        }
    };

    const getRemainingTime = () => {
        const expirationTime = parseInt(localStorage.getItem('expirationTime') ?? '0');
        const currentTime = Date.now();
        const timeDifference = expirationTime - currentTime;
        const remainingSeconds = Math.max(0, Math.floor(timeDifference / 1000)); // Calculate remaining seconds
        return remainingSeconds;
      };

    useEffect(() => {
        // Check token validity on page load
        checkTokenValidity();
        const token = localStorage.getItem('token');
        setIsLogged(!!token);
      }, []);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" align="center">
                Login
            </Typography>
            { isLogged ? (
                <div>
                <Typography variant="body1" gutterBottom>
                  You are logged in as: {localStorage.getItem('name')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Your session will expire in: {getRemainingTime()} seconds
                </Typography>
                <Button variant="contained" onClick={logout} className='buttons'>Logout</Button>
                <Link to='/home'>
                <Button variant="contained" color="primary" className='buttons'>Home</Button>
                </Link>
              </div>
            ):(
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={handleUsernameChange}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
                <Link to='/register'>
                <Button variant="contained" color="secondary" fullWidth>
                    Register
                </Button>
                </Link>
            </form>)}
        </Container>
    );
};

export default Login;