import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {  Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, FormControl, InputLabel, Select, TableFooter, TablePagination, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckConnection from "./NetworkStatusIndicator";
import { Link } from "react-router-dom";
import "./home.css";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import axios from "axios";
import { GamesContext } from "../App";
ChartJS.register( ArcElement, Tooltip, Legend);

function Home() {

  // State for holding game data
  const games = React.useContext(GamesContext);
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch data from the backend API
  useEffect(() => {
      const fetchData = async () => {
        const name = localStorage.getItem("name");
        try {
          const response = await axios.get(`http://localhost:5000/developers/${name}/games`);
          setData(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      fetchData();
  }, []);

  // Delete game function
  const handleDelete = async (id) => {
    try{
    await axios.delete(`http://localhost:5000/games/${id}`);
    setData(data.filter((game) => game.id !== id));

    }catch(error){
      console.error("Error deleting game:", error);
      alert("An error occurred while deleting the game. Please try again later.");
    }
  };
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Pagination change handlers
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(0); // Reset current page when changing rows per page
  };

  
  const genreCounts: { [key: string]: number } = {};
  data.forEach(game => {
    const genre = game.genre;
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });



  const chartData = {
    labels: Object.keys(genreCounts),
    datasets: [
      {
        data: Object.values(genreCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <div style={{ margin: "15rem", height: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Game Something
      </Typography>
      <CheckConnection />
      <Grid container justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
        <Grid item xs={8}>
          <Paper elevation={5} style={{ padding: "2rem" }}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <>
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
                      {(rowsPerPage > 0
                        ? games.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                        : data
                      ).map((item) => (
                        <TableRow key={item.getGameId()
                        }>
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
                              <Button variant="contained" color="primary" size="small">
                                Edit
                              </Button>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={() => handleDelete(item.getGameId())}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                          colSpan={6}
                          count={data.length}
                          rowsPerPage={rowsPerPage}
                          page={currentPage}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleRowsPerPageChange}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
                <Link to="/create" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="warning" size="large">
                    Add
                  </Button>
                </Link>
                <Link to="/developers" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="warning" size="large">
                    Developers
                  </Button>
                </Link>
              </>
            )}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={5} style={{ padding: "2rem", height: "45vh" }}>
            <Typography variant="h6" align="center" gutterBottom>
              Genre Distribution
            </Typography>
            <Doughnut data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  
  );
}

export default Home;





