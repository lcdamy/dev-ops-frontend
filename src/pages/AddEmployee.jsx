import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FormControl, MenuItem, Container, Typography, InputLabel, TextField, Button, Select, Box } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Radio, RadioGroup, Checkbox } from '@mui/joy';
import dayjs from 'dayjs';
import axios from "axios";

const Addemployee = () => {
    const [names, setNames] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [salary, setSalary] = useState("");
    const [dob, setDob] = useState(dayjs());
    const [gender, setGender] = useState("");
    const [departement, setDepartment] = useState("");

    const handleNamesChange = (e) => {
        setNames(e.target.value)
    }
    function handleEmailChange(e) {
        setEmail(e.target.value)
    }
    const handleAgeChange = (e) => {
        setAge(e.target.value)
    }
    const handleSalaryChange = (e) => {
        setSalary(e.target.value)
    }
    const handleGenderChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setGender(value);
        }
    }
    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value)
    }

    const onSubmit = async (data) => {
        const payload = { names, email, age, dob, gender, departement, salary };
        const saveStudent = await axios.post("http://localhost:8001/employee", payload);
        console.log(saveStudent);
        setTimeout(() => {
            navigate("/");
        }, 1000)
    };
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    }

    return (
        <>
            <Container>
                <Box display="flex" justifyContent="center">
                    <Box sx={{ width: "500px" }}>
                        <Box sx={{ width: 1 }}>
                            <center>
                                <Typography p={1} sx={{ bgcolor: "info.main", color: "white", borderRadius: "5px", boxShadow: 1 }} variant="h5">
                                    Fill employee Info
                                </Typography>
                            </center>
                        </Box>

                        <Box display="flex" flexDirection="column">

                            <FormControl fullWidth margin="normal">
                                <TextField id="outlined-basic" label="Names" variant="outlined" required value={names} onChange={handleNamesChange} />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField id="outlined-basic" label="Email" type="email" required variant="outlined" value={email} onChange={handleEmailChange} />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField id="outlined-basic" label="Age" type="number" required variant="outlined" value={age} onChange={handleAgeChange} />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField id="outlined-basic" label="Salary" type="number" required variant="outlined" value={salary} onChange={handleSalaryChange} />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Date onboarded" value={dob} onChange={(newValue) => setDob(newValue)} />
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <RadioGroup defaultValue="outlined" name="radio-buttons-group">
                                    <Radio value="M" label="Male" variant="outlined" checked={gender === "M"} onChange={handleGenderChange} />
                                    <Radio value="F" label="Female" variant="outlined" checked={gender === "F"} onChange={handleGenderChange} />
                                </RadioGroup>
                            </FormControl>

                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Select a department</InputLabel>
                                    <Select
                                        id="demo-simple-select"
                                        value={departement}
                                        label="Select a Departement"
                                        onChange={handleDepartmentChange}
                                    >
                                        <MenuItem value="IT">IT</MenuItem>
                                        <MenuItem value="HR">HR</MenuItem>
                                        <MenuItem value="OPERATION">OPERATION</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box display="flex" justifyContent="flex-end" flexDirection="row" sx={{ marginTop: "10px" }}>
                                <Button variant="outlined" onClick={goHome} sx={{ marginRight: "10px" }}> Back Home</Button>
                                <Button variant="contained" color="success" onClick={onSubmit}> SAVE</Button>
                            </Box>

                        </Box>

                    </Box>
                </Box>
            </Container>
        </>
    )

}

export default Addemployee;