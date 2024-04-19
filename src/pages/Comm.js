import { Box, Button,Typography } from "@mui/material";
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

    const [new_x,setNew_x]= useState([]);
    const [new_y,setNew_y]= useState([]);
    const [new_y2,setNew_y2] = useState([]);

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

            // console.log(data);
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

    let prev_time = 0;
    let new_time = 0;

    const [send_data,setSend_data] = useState(null);

    useEffect(() => {
        const handleWebSocketMessage = (event) => {
            console.log('Message received:', event.data);

            const data = event.data;

            const temp_send_data = data.split(',');

            setSend_data(data.split(','));

            const cur_temp = temp_send_data[0];
            const req_temp = temp_send_data[1];
            const time = temp_send_data[2];

            new_time = time;

            console.log(cur_temp, req_temp, time);

            const temp_x = new_x;

            if (new_time != prev_time) {
                // Add the new data to the state
                setNew_x(prevX => [...prevX, time]);
                setNew_y(prevY => [...prevY, cur_temp]);
                setNew_y2(prevY2 => [...prevY2, req_temp]);
            }

            // setNew_x(prevX => [...prevX, time]);
            // setNew_y(prevY => [...prevY, cur_temp]);

            console.log(new_x);

            // if (!new_x.includes(time)) {
            //     setNew_x(prevX => [...prevX, time]);
            //     setNew_y(prevY => [...prevY, cur_temp]);
        
            //     setNewChartData({
            //         labels: [...new_x, time],
            //         datasets: [
            //             {
            //                 label: profile.title,
            //                 fill: false,
            //                 lineTension: 0,
            //                 backgroundColor: "rgba(0,0,255,1.0)",
            //                 borderColor: "black",
            //                 data: [...new_y, cur_temp]
            //             }
            //         ]
            //     });
            // }

            prev_time = new_time;
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

    useEffect(() => {
        if (profile) { // Check if profile is not null
            setNewChartData({
                labels: new_x,
                datasets: [
                    {
                        label: "actual",
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(0,0,255,1.0)",
                        borderColor: "black",
                        data: new_y,
                        pointRadius: 0, 
                    },
                    {
                        label: "required",
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(0,0,255,1.0)",
                        borderColor: "red",
                        data: new_y2,
                        pointRadius: 0, 
                    }
                ]
            });
        }
    }, [new_x, new_y, profile]);

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
        // const ws1 = new WebSocket('ws://192.168.203.93/ws');
        const ws1 = new WebSocket('ws://192.168.145.93/ws');
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
                    {send_data && (
                        <>
                            <Typography>
                                Current Temperature:
                                {send_data[0]}
                            </Typography>

                            <Typography>
                                Required Temperature:
                                {send_data[1]}
                            </Typography>
                        </>
                    )}
                    
                    
                    <Button onClick={handleConnect} variant="contained">
                        Connect
                    </Button>
                    {connect && (
                        <Button onClick={handleStart} variant="contained">
                            Start
                        </Button>
                    )}
                    {/* <div style={{margin:"3% 1% 1% 1% "}}> */}
                        {/* <LineChart chartData={chartData} /> */}
                    {/* </div> */}
                    
                    {/* <div style={{margin:"3% 1% 1% 1% "}}>    */}
                    <LineChart2 chartData={newChartData} />
                    <LineChart chartData={chartData} />
                    {/* </div> */}
                    
                </Box>
            )}
        </Box>
    );
};

export default Comm;
