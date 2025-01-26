import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, Container, Typography, TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";




const Signin = () => {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (e) => {
        const formData = new FormData();
        formData.append("email", e.name);
        formData.append("password", e.author);

        const signup = await axios.post("http://localhost:8001/signin", formData);

        if (signup.success) {
            setTimeout(() => {
                navigate("/Dashboard");
            }, 2000)
        } else {
            console.log("can't signin");
        }
    }


    return (
        <>
            <Container>
                <Box display="flex" justifyContent="center">
                    <Box sx={{ width: "500px" }}>
                        <Box sx={{ width: 1 }}>
                            <center>
                                <Typography p={1} sx={{ bgcolor: "success.main", color: "white", borderRadius: "5px", boxShadow: 1 }} variant="h5">
                                  Login
                                </Typography>
                            </center>
                        </Box>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            
                             <FormControl fullWidth margin="normal">
                                 <TextField id="outlined-1" label="Email" name="email" {...register("email")} variant="outlined" />
                             </FormControl>
 
                             <FormControl fullWidth margin="normal">
                                 <TextField id="outlined-2" label="Password" type="password" name="password" {...register("password")} variant="outlined" />
                             </FormControl>

                            <Box display="flex" justifyContent="flex-end" flexDirection="row" sx={{ marginTop: "10px" }}>
                                <Button variant="contained" color="success" type="submit"> LOGIN </Button>
                            </Box>
                        </form>

                    </Box>
                </Box>
            </Container>
        </>
    )

}

export default Signin;