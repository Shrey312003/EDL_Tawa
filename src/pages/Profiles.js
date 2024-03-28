import { Box, Button} from "@mui/material";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import useFetch from "../hooks/useFetch";
import { CircularProgress } from "@mui/material";
import LineChart from "../components/chart_component";
import { useEffect, useState } from "react";
import {Card,CardActions} from "@mui/material";
import {CardContent,CardMedia} from "@mui/material";
import {Typography} from "@mui/material";
import {Grid} from "@mui/material";
import { useNavigate } from "react-router";
import {Table,TableCell,TableBody,TableHead,TableRow,TableContainer,Paper} from "@mui/material";
import { deleteDoc,doc } from "firebase/firestore";

const Profiles = () => {
    const { data, loading, error } = useFetch('profiles');
    const navigate = useNavigate();

    console.log(data);

    const [chartData, setChartData] = useState(new Map());

    useEffect(() => {
        if (data) {
            const newChartData = new Map();

            data.forEach((profile) => {
                newChartData.set(
                    profile.id,
                    {
                        labels: (profile.time),
                        datasets: [{
                            label:(profile.title),
                            fill: false,
                            backgroundColor: "rgba(0,0,255,1.0)",
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                            data: (profile.Temp)
                        }]
                    }
                )
            });
            setChartData(newChartData);
            console.log(newChartData);
        }
    }, [data]);

    const profileChoose = (id) => {
        navigate(`/comm?id=${id}`)
    }

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const db = getFirestore();
            const docRef = doc(db, 'profiles', id);
            
            await deleteDoc(docRef);
            
            console.log("Profile deleted successfully!");

            window.location.reload();
        } catch (error) {
            console.error("Error deleting profile: ", error);
        }
        
    }

    return (
        <Box>
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </div>
            )}
            {error && <div>Error: {error.message}</div>}
            {!loading && data && (
                <>
                <Typography variant="h3" sx={{textAlign:"center"}}>Profiles</Typography>
                <Grid container spacing={4}>
                    {data.map((profile) => (
                            <Grid key={profile.id} sx={{margin:"2% auto 2% auto"}} item md={8} sm = {12} xs={12}>
                                <Card >
                                    <div style={{width:"90%", margin:"1% 5% 1% 5%"}}>
                                    <LineChart 
                                        chartData={chartData.get(profile.id)} 
                                        key={profile.id} />
                                    </div>
                                    
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {profile.title}
                                        </Typography>

                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell></TableCell>
                                                        <TableCell>Initial</TableCell>
                                                        <TableCell>Preheat</TableCell>
                                                        <TableCell>Soak</TableCell>
                                                        <TableCell>Peak</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell sx={{fontWeight:"bold"}}component="th" scope="row">
                                                            Temperature
                                                        </TableCell>
                                                        <TableCell>{profile.Temp[0]}</TableCell>
                                                        <TableCell>{profile.Temp[1]}</TableCell>
                                                        <TableCell>{profile.Temp[2]}</TableCell>
                                                        <TableCell>{profile.Temp[3]}</TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell sx={{fontWeight:"bold"}}component="th" scope="row">
                                                            Time
                                                        </TableCell>
                                                        <TableCell>{profile.time[0]}</TableCell>
                                                        <TableCell>{profile.time[1]}</TableCell>
                                                        <TableCell>{profile.time[2]}</TableCell>
                                                        <TableCell>{profile.time[3]}</TableCell>
                                                    </TableRow>
                                                
                                                </TableBody>
                                            </Table>
                                            </TableContainer>                                       
                                        
                                    </CardContent>
                                    <CardActions>
                                        
                                        <Button 
                                            variant={"contained"} 
                                            size="small" 
                                            onClick={()=>(profileChoose(profile.id))}
                                            sx={{marginLeft:"1%"}}
                                        >
                                            Choose
                                        </Button>
                                        <Button 
                                            variant={"contained"} 
                                            size="small" 
                                            onClick={()=>(handleDelete(profile.id))}
                                            sx={{marginLeft:"1%"}}
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                                
                            </Grid>
                    ))}
                </Grid>
                </>
            )}
            
        </Box>
    );
}

export default Profiles;
