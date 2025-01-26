import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCommentIcon from '@mui/icons-material/AddComment';

const Home = () => {
    const [books, setbooks] = useState([]);
    const [employees, setemployees] = useState([]);

    useEffect(() => {
        // fetchBooks();

    }, []);

    useEffect(() => {
        fetchemployees();
    }, []);

    const fetchBooks = async () => {
        const my_books = await axios.get("http://localhost:8001/books");
        setbooks(my_books.data);
    }

    const fetchemployees = async () => {
        const my_employees = await axios.get("http://localhost:8001/employees");
        setemployees(my_employees.data);
    }

    const navigate = useNavigate();
    const goToEmployee = () => {
        navigate("/add_employee");
    }

    const goToAttendance = (id) => {
        navigate("/add_attendance/" + id);
    }
    const viewEmployee = (id) => {
        navigate("/view_employee/" + id);
    }

    const deleteEmployee = async (id) => {
        await axios.delete("http://localhost:8001/employees/" + id);
        window.location.reload();
    }


    return (
        <>
            <Container>

                <Box p={2}>
                    <Typography variant="h5" >
                        EMPLOYEE
                    </Typography>
                    <br />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell >Name</TableCell>
                                    <TableCell >Email</TableCell>
                                    <TableCell >Gender</TableCell>
                                    <TableCell >Salary</TableCell>
                                    <TableCell >Department</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees?.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.names}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell >{row.gender}</TableCell>
                                        <TableCell >{row.salary}</TableCell>
                                        <TableCell >{row.departement}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" color="error" onClick={() => deleteEmployee(row.id)}> delete </Button>&nbsp;
                                            <Button variant="outlined" onClick={() => viewEmployee(row.id)}> Give feedbacks </Button>&nbsp;
                                            <Button variant="outlined" color="secondary" onClick={() => goToAttendance(row.id)}> Attendance / Availability </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box display="flex" justifyContent="end" p={2}>
                    <Button variant="contained" onClick={goToEmployee} > Add New Employee</Button>
                </Box>




            </Container>


        </>
    )
}

export default Home;