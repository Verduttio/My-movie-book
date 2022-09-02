import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import {Container, Paper} from "@mui/material";

function createData(title, releaseYear, genre, director, posterFileName) {
    return { title, releaseYear, genre, director, posterFileName};
}

const rows = [
    createData('Stardust', 2007, 'Fantasy', 'Matthew Vaughn', 'stardust.jpg'),
];

export default function Movies() {
    const paperStyle={padding:'50px 20px', width:800, margin:'20px auto'}

    const [movies, setMovies] = useState([]);

    useEffect(()=> {
        fetch("http://localhost:8080/movies")
            .then(res=>res.json())
            .then((result)=>{
            setMovies(result);
        })
            .then(()=>{
                console.log("Movies received");
            })
    },[])

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">ReleaseYear</TableCell>
                            <TableCell align="right">Genre</TableCell>
                            <TableCell align="right">Director</TableCell>
                            <TableCell align="right">PosterFileName</TableCell>
                            <TableCell align="right">ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies.map(movie => (
                            <TableRow
                                key={movie.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {movie.title}
                                </TableCell>
                                <TableCell align="right">{movie.releaseYear}</TableCell>
                                <TableCell align="right">{movie.genre}</TableCell>
                                <TableCell align="right">{movie.director}</TableCell>
                                <TableCell align="right">{movie.posterFileName}</TableCell>
                                <TableCell align="right">{movie.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </Container>
    );
}
