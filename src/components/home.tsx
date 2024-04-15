import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {  Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, FormControl, InputLabel, Select, TableFooter, TablePagination, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckConnection from "./NetworkStatusIndicator";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import Games from "./Games";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {io} from "socket.io-client";
ChartJS.register( ArcElement, Tooltip, Legend);

function Home() {
  const history = useNavigate();

  // State for holding game data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socket = new WebSocket("ws://localhost:5000");
  
  // Fetch data from the backend API
  useEffect(() => {

    socket.onerror = (error) => {
      setError(error);
      console.error("WebSocket error:", error);
    }

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "initialData") {
        setData(message.data);
        setLoading(false);
      } else if (message.type === "updateData") {
        data.push(message.data);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };


  }, []);

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

  // Delete game function
  const handleDelete = async (id) => {
    try {
      const message = { type: 'delete', gameId: id };
      socket.send(JSON.stringify(message));
      setData(data.filter((game) => game.game_id !== id));
    } catch (error) {
      console.error("Error deleting game:", error);
    }
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
                        ? data.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                        : data
                      ).map((item) => (
                        <TableRow key={item.game_id}>
                          <TableCell>
                            <Link to={`/data/${item.game_id}`}>
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell>{item.release_date}</TableCell>
                          <TableCell>{item.genre}</TableCell>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>
                            <Link to={`/edit/${item.game_id}`}>
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
                              onClick={() => handleDelete(item.game_id)}
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


function setErrorMessage(arg0: string) {
  throw new Error("Function not implemented.");
}

