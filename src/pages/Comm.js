import { Box, Button } from "@mui/material";
import { useLocation } from "react-router";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LineChart from "../components/chart_component";
import LineChart2 from "../components/chart2";

const Comm = () => {
    const [connect, setConnect] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [ws, setWs] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [newChartData, setNewChartData] = useState([]);
    const [x, setX] = useState([]);
    const [y, setY] = useState([]);

    const temp_x = [];
    const temp_y = [];

    const [t,setT] = useState(0);

    let i = 0;

    const data = useSelector(state => state.data.profiles);
    const [profile, setProfile] = useState(null);
    const [sendData, setSendData] = useState(null);

    useEffect(() => {
        if (data) {
            const val = data.filter((da) => (
                da.id === id
            ));
            const val1 = val[0];
            setProfile(val1);

            for (i=0;i<=50;i++){
                temp_x.push(i);
                temp_y.push();
            }
            setX(temp_x);
            setY(temp_y);

            console.log(data);
        }
    }, [data, id]);

    useEffect(() => {
        if (profile) {
            const c = [...profile.Temp, ...profile.time];
            setSendData(c);

            setChartData({
                labels: profile.time,
                datasets: [{
                    label:(profile.title),
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "black",
                    data: profile.Temp
                }]
            });
        }
    }, [profile]);

    useEffect(() => {
        const handleWebSocketMessage = (event) => {
            console.log('Message received:', event.data);
            // setY([...y, event.data]);
            // setX([...x, t + 1]);

            const updatedY = [...y];
            updatedY[t] = event.data;
            setY(updatedY);
                
            setT(t+1);

            console.log(x);

            setNewChartData({
                labels: [...x],
                datasets: [
                    {
                        label:(profile.title),
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(0,0,255,1.0)",
                        borderColor: "black",
                        data: updatedY
                    }
                ]
            });
        };

        if (ws) {
            ws.onmessage = handleWebSocketMessage;
        }

        return () => {
            if (ws) {
                ws.onmessage = null;
            }
        };
    }, [ws, x, y]);

    const handleStart = () => {
        ws.send(sendData);
        console.log("Data sent");

        // const ti = [...profile.time, 200];
        // const te = [...profile.Temp, 200];
        // setChartData({
        //     labels: ti,
        //     datasets: [{
        //         fill: false,
        //         lineTension: 0,
        //         backgroundColor: "rgba(0,0,255,1.0)",
        //         borderColor: "black",
        //         data: te
        //     }]
        // });
    };

    const handleConnect = () => {
        const ws1 = new WebSocket('ws://192.168.250.93/ws');
        setWs(ws1);
        ws1.onopen = function () {
            setConnect(true);
            console.log('WebSocket Connected');
        };

        ws1.onerror = function (error) {
            setConnect(false);
            console.error('WebSocket error:', error);
        };
    };

    return (
        <Box>
            {profile && (
                <Box>
                    <Button onClick={handleConnect} variant="contained">
                        Connect
                    </Button>
                    {connect && (
                        <Button onClick={handleStart} variant="contained">
                            Start
                        </Button>
                    )}
                    <div style={{margin:"3% 1% 1% 1% "}}>
                        <LineChart chartData={chartData} />
                    </div>
                    
                    <div style={{margin:"3% 1% 1% 1% "}}>   
                    <LineChart2 chartData={newChartData} />
                    </div>
                    
                </Box>
            )}
        </Box>
    );
};

export default Comm;
