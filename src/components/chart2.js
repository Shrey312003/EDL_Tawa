// import React, { useRef, useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';

// const LineChart2 = ({chartData}) => {
//     const chartRef = useRef(null);
//     // console.log(params);

//     useEffect(() => {
//         // console.log('Chart component mounted. Ref:', chartRef.current);
    
//         if (chartRef.current) {
//             let chart;
//             chart = new Chart(chartRef.current, {
//                 type: "line",
//                 data: chartData,
                
//                 options: {
//                     legend: {
//                         display: false,
//                         hoverBorderColor:"red",
//                     },

                    
//                     plugins: {
//                         title: {
//                             display: true,
//                             text: 'Temperature(\u00B0C) vs Time(sec)' // Title of the chart
//                         },
                        
//                     },
//                     scales: {
//                         y: {
//                             title: {
//                                 display: true,
//                                 text: 'Temperature (\u00B0C)' // Y-axis label
//                             },
//                             min: 0, // Minimum value for y-axis
//                             max: 300, // Maximum value for y-axis
//                             // You can adjust min and max values according to your data range
//                         },
//                         x: {
//                             title: {
//                                 display: true,
//                                 text: 'Time (s)' // Y-axis label
//                             },
//                             min: 0, // Minimum value for y-axis
//                             max: 600, // Maximum value for y-axis
//                             // You can adjust min and max values according to your data range
//                         },
//                     },
                    
//                 }
//             });

//             // console.log(chart);

//             return () => {
//                 chart.destroy(); 
//             }
//         }
//     }, [chartData]);

//     return <canvas ref={chartRef} style={{ width: '80%', height: '100px' }}></canvas>;
// }

// export default LineChart2;


import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineChart2 = ({ chartData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = new Chart(chartRef.current, {
                type: "line",
                data: chartData,
                options: {
                    legend: {
                        display: true,
                        position: 'bottom',
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Temperature (\u00B0C) vs Time (sec)'
                        },
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Temperature (\u00B0C)'
                            },
                            min: 0,
                            max: 300,
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Time (s)'
                            },
                            min: 0,
                            max: 600,
                        },
                    },
                }
            });

            return () => {
                chart.destroy();
            };
        }
    }, [chartData]);

    return <canvas ref={chartRef} style={{ width: '80%', height: '100px' }}></canvas>;
};

export default LineChart2;
