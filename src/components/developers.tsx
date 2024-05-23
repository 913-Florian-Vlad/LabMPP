import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TablePagination } from "@mui/material";
import axios from "axios";

interface DeveloperWithGameCount {
    id: string;
    name: string;
    gameCount: number;
}

function Developers() {
    const [developers, setDevelopers] = useState([]);
    const [gameCounts, setGameCounts] = useState([]);
    const [developer_game_count_array, setDeveloperGameCountArray] = useState<DeveloperWithGameCount[]>([]); 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // You can adjust the number of rows per page


    // Fetch data from the backend API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const developersResponse = await axios.get("http://localhost:5000/developers");
                const gameCountsResponse = await axios.get("http://localhost:5000/developers/games");

                setDevelopers(developersResponse.data);
                setGameCounts(gameCountsResponse.data);

                //populate the developer_game_count_array
                for(let i = 0; i < gameCountsResponse.data.length; i++) {
                   if(gameCountsResponse.data[i].count == null)
                    {
                    const data = {id: developersResponse.data[i].id, name: developersResponse.data[i].name, gameCount: 0};
                    developer_game_count_array.push(data);
                    }else {
                   const data={id: developersResponse.data[i].id, name: developersResponse.data[i].name, gameCount: gameCountsResponse.data[i].count};
                   developer_game_count_array.push(data);
                    }
                   
                }
                

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

   

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1>Developers</h1>
            <Grid container spacing={2}>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table size="small" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Games Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? developer_game_count_array.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : developer_game_count_array
                                ).map((developer) => (
                                    <TableRow key={developer.id}>
                                        <TableCell>{developer.name}</TableCell>
                                        <TableCell>{developer.gameCount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]} 
                        component="div"
                        count={developers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
        </div>
    );
}

export default Developers;
