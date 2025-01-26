import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, Container, Typography, TextField, Button, Box, InputLabel, Select, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Description } from "@mui/icons-material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const EditAttendance = () => {
    const { id } = useParams();

    const { register, handleSubmit } = useForm();
    const [dob, setDob] = useState(dayjs());
    const [attendance_details, setattendance_details] = useState([]);

    const onSubmit = async (e) => {
        const payload = { employee_id: id, date: dob }
        const attendance = await axios.post("http://localhost:8001/attendance", payload);

        setTimeout(() => {
            navigate("/");
        }, 1000)
    }

    useEffect(() => {
        fetchAttendanceDetails()

    }, []);

    const fetchAttendanceDetails = async () => {
        const my_attendances = await axios.get("http://localhost:8001/attendances/" + id);
        setattendance_details(my_attendances.data);
    }

    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    }

    return (
        <>
            <Container>
                <Box display="flex" justifyContent="space-between">
                    <Box sx={{ width: "500px" }} marginRight={4}>
                        <Box sx={{ width: 1 }}>
                            <center>
                                <Typography p={1} sx={{ bgcolor: "secondary.main", color: "white", borderRadius: "5px", boxShadow: 1 }} variant="h5">
                                    Do attendance
                                </Typography>
                            </center>
                        </Box>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth margin="normal">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Date onboarded" value={dob} onChange={(newValue) => setDob(newValue)} />
                                    </LocalizationProvider>
                                </FormControl>
                            </Box>

                            <Box display="flex" justifyContent="flex-end" flexDirection="row" sx={{ marginTop: "10px" }}>
                                <Button variant="outlined" onClick={goHome} sx={{ marginRight: "10px" }}> Back Home</Button>
                                <Button variant="contained" color="secondary" type="submit"> SAVE </Button>
                            </Box>
                        </form>


                    </Box>

                    <Box>

                        <Box sx={{ width: 1 }}>
                            <center>
                                <Typography p={1} sx={{ bgcolor: "warning.main", color: "white", borderRadius: "5px", boxShadow: 1 }} variant="h5">
                                    Attendance Details
                                </Typography>
                            </center>
                        </Box>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Dates</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {attendance_details?.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.date}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Container>
        </>
    )

}

export default EditAttendance;