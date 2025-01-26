
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Container, Typography, Box, Divider } from "@mui/material";
import Home from "./pages/Home";
import Addemployee from "./pages/AddEmployee";
import AddAttendance from "./pages/AddAttendance";
import EditAttendance from "./pages/EditAttendance";
import Update from "./pages/Update";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {

  return (
    <>
      <BrowserRouter>
        <Container>
          {/* <Box display="flex" justifyContent="flex-end">
            <Box display="flex" flexDirection="row">
              <Link to="/signup" mx={1} sx={{ cursor: "pointer" }}>Register</Link> <Divider orientation="vertical" flexItem /> <Link to="/signin" mx={1} sx={{ cursor: "pointer" }}>Login</Link>
            </Box>
          </Box> */}
          <Box display="flex" flexDirection="column" marginBottom={5}>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "100px", bgcolor: "text.primary", color: "white", boxShadow: 3 }} >
              <Typography variant="h4">
                Welcome to KPI Ngali Challenge
              </Typography>
            </Box>
          </Box>
        </Container>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add_employee" element={<Addemployee />} />
          {/* <Route path="/add_attendance" element={<AddAttendance />} /> */}
          <Route path="/view_employee/:id" element={<AddAttendance />} />
          <Route path="/add_attendance/:id" element={<EditAttendance />} />
          <Route path="/update" element={<Update />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
