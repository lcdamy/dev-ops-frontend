import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, Container, Typography, TextField, Button, Box, InputLabel, Select, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Description } from "@mui/icons-material";



const AddAttendance = () => {
    const { id } = useParams();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (e) => {

        const payload = { feed_back_type: e.feed_back_type, employee_id: id, comment: e.comment }

        const feedbacksSaved = await axios.post("http://localhost:8001/feedbacks", payload);

        setTimeout(() => {
            navigate("/");
        }, 1000)

    }

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
                                <Typography p={1} sx={{ bgcolor: "success.main", color: "white", borderRadius: "5px", boxShadow: 1 }} variant="h5">
                                    Give feedback
                                </Typography>
                            </center>
                        </Box>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>How can you rate this Employee</InputLabel>
                                    <Select
                                        id="demo-simple-select"
                                        name="feed_back_type"
                                        {...register("feed_back_type")}
                                        label="How can you rate this Employee"
                                    >
                                        <MenuItem value="Excelent">Excelent</MenuItem>
                                        <MenuItem value="Good">Good</MenuItem>
                                        <MenuItem value="Bad">Bad</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <FormControl fullWidth margin="normal">
                                <TextField id="outlined-1" label="Comment" name="comment" {...register("comment")} variant="outlined" />
                            </FormControl>


                            <Box display="flex" justifyContent="flex-end" flexDirection="row" sx={{ marginTop: "10px" }}>
                                <Button variant="outlined" onClick={goHome} sx={{ marginRight: "10px" }}> Back Home</Button>
                                <Button variant="contained" color="success" type="submit"> SAVE </Button>
                            </Box>
                        </form>

                    </Box>
                </Box>
            </Container>
        </>
    )

}

export default AddAttendance;