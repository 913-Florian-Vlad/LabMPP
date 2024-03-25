import React, { useEffect, useState } from "react";
import { MenuItem, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, FormControl, InputLabel, Select } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Games from "./Games";

ChartJS.register( ArcElement, Tooltip, Legend);

function Home() {
  let history = useNavigate();
  const list = []

  for (let i = 1; i <= array.length; i++) {
    list.push(i);
  }
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const indexOfLastItem: number = itemsPerPage;
  const indexOfFirstItem: number = 0;
  const currentItems: Games[] = array.slice(indexOfFirstItem, indexOfLastItem);

  // Handler for changing items per page
  const handleClick = (num: number): void => {
    setItemsPerPage(num);
  };

  

  function SetID(id: string, name: string, release_date: string, genre: string, size: number) {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("release_date", release_date);
    localStorage.setItem("genre", genre);
    localStorage.setItem("size", size.toString());
  }

  function Delete(id: string) {
    let index = array.map(function (e) { return e.getGameId() }).indexOf(id || "");
    array.splice(index, 1);
    history("/");
  }

  
  const genreCounts: { [key: string]: number } = {};
  array.forEach(game => {
    const genre = game.getGameGenre();
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });

  
  const chartData = {
    labels: Object.keys(genreCounts),
    datasets: [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(153, 102, 255, 0.6)', // Purple
          'rgba(255, 159, 64, 0.6)', // Orange
          'rgba(255, 99, 132, 0.6)', // Red 
          'rgba(54, 162, 235, 0.6)'  // Blue 
          
        ],
        borderColor: 'rgba(54, 162, 235, 1)', // Border color
        borderWidth: 1,
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.8)', // Red (hover)
          'rgba(54, 162, 235, 0.8)', // Blue (hover)
          'rgba(255, 206, 86, 0.8)', // Yellow (hover)
          'rgba(75, 192, 192, 0.8)', // Green (hover)
          'rgba(153, 102, 255, 0.8)', // Purple (hover)
          'rgba(255, 159, 64, 0.8)', // Orange (hover)
          'rgba(255, 99, 132, 0.8)', // Red (hover)
          'rgba(54, 162, 235, 0.8)'  // Blue (hover)
          // Add more colors as needed
        ],
        label: 'Frequency',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: Object.values(genreCounts)
      }
    ]
  };

  return (
    <div style={{ margin: "15rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Game Something
      </Typography>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '45vh' }}>
        <Grid item xs={12}>
          <Paper elevation={5} style={{ padding: "2rem" }}>
            <TableContainer>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Release Date</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.sort(function (a, b) {
                    var x = a.getGameGenre().toLowerCase();
                    var y = b.getGameGenre().toLowerCase();
                    return x < y ? -1 : x > y ? 1 : 0;
                  }).map((item) => (
                    <TableRow key={item.getGameId()}>
                      <TableCell>
                        <Link to={`/data/${item.getGameId()}`}>
                          {item.getGameName()}
                        </Link>
                      </TableCell>
                      <TableCell>{item.getGameReleaseDate()}</TableCell>
                      <TableCell>{item.getGameGenre()}</TableCell>
                      <TableCell>{item.getGameSize()}</TableCell>
                      <TableCell>
                        <Link to={`/edit/${item.getGameId()}`}>
                          <Button
                            onClick={() => SetID(item.getGameId(), item.getGameName(), item.getGameReleaseDate(), item.getGameGenre(), item.getGameSize())}
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            Edit
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => Delete(item.getGameId())}
                          variant="contained"
                          color="secondary"
                          size="small"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Link to="/create" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="warning" size="large">
                  Add
                </Button>
              </Link>
            </TableContainer>
          </Paper>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        
        {list.map((num) => (
          <Button key={num} variant="contained" color="primary" size="small" onClick={() => handleClick(num)}>{num}</Button>
        ))}
        
      </div>
      
      </Grid>
      </Grid>
      <div>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '45vh' }}>
        <Grid item xs={6}>
          <Paper elevation={5} style={{ padding: "2rem" }}>
            <Doughnut data={chartData} />
          </Paper>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default Home;
