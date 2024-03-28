import { Box } from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import { useNavigate } from "react-router";
import {Paper} from "@mui/material";

const Home = () => {
    const navigate = useNavigate();

    const customClick = () =>{
        navigate("/create");
    }

    const profileClick = () => {
        navigate("/profile");
    }

    return ( 
        <Box
            sx={{
                width:"80%",
                margin:"2% 10% 0 10%"
            }}
        >
            
            <Typography 
                variant="h3" 
                sx={{
                    margin:"1% auto 1% auto",
                    textAlign:"center"
                }}
            >
                Hot Plate
            </Typography>

            <Paper elevation={3} >
                <Button 
                    variant="contained" 
                    onClick={profileClick}
                    sx = {{margin:"2% 20% 2% 20%", width:"60%"}}
                >
                    Choose profile
                </Button>
                <Button 
                    variant="contained" 
                    onClick={customClick}
                    sx = {{margin:"2% 20% 2% 20%", width:"60%"}}
                >
                    Make custom profile
                </Button>
            </Paper>
        </Box>
    );
}
 
export default Home;