import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';



const SubjectByMonth = (props) => {
    const [subjectByMonthData, setSubjectByMonthData] = useState([]);
    const [cleanData, setCleanData] = useState([])

    // fetch data that will fit this chart
    const getSubjectByMonth = async () => {
        const response = await fetch(`/analytics/SubjectByMonth/${props.startMonth}/${props.endMonth}`);
        const data = await response.json();
        setSubjectByMonthData(data);
    };

    useEffect(()=>{
        getSubjectByMonth()
    }, [props.startMonth, props.endMonth, props.conversationData])

    // convert raw data to fit the chart
    const cleanTheData = () => {
        const subjects = ["mortgages", "wire transfers", "transfers", "credit cards", "accounts", "investments", "other"]
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const newData = [];
        // loop through each subject
        for (let subject of subjects) {
            const subjectData = {}
            // if there are any conversations of the subject
            if (Object.keys(subjectByMonthData).includes(subject)) {
                // loop through each month
                const monthData = [];
                for (let month = 1; month < 13; month ++) {
                    // if there are any conversations in the month in the current subject
                    if (Object.keys(subjectByMonthData[subject]).includes(month.toString())) {
                        // subjectData[month.toString()] = parseInt(subjectByMonthData[subject][month.toString()])
                        monthData.push({
                            "x": monthNames[month-1],
                            "y": parseInt(subjectByMonthData[subject][month])
                        })
                    } else {
                        // if the month has no conversations
                        // subjectData[month.toString()] = 0
                        monthData.push({
                            "x": monthNames[month-1],
                            "y": 0
                        })
                    };
                };
                subjectData["id"] = subject;
                subjectData["data"] = monthData;
            } else {
                subjectData["id"] = subject;
                const emptyMonthData = monthNames.map((month) => {
                    return({
                        "x": month,
                        "y": 0
                    })
                })
                subjectData["data"] = emptyMonthData;
            };
            newData.push(subjectData)
        }
        setCleanData(newData)
    };

    useEffect(() => {
        cleanTheData();
    }, [subjectByMonthData])

    return(
        <div className='chartDiv'>
            <h1>Subject By Month</h1>
            <p className='description'>Shows trends of each subject's popularity over time</p>
            
             <ResponsiveLine
                data={cleanData}
                theme={props.size === "small" ? {
                    "background": "#ffffff",
                    "text": {
                        "fontSize": 11,
                        "fill": "#333333",
                        "outlineWidth": 0,
                        "outlineColor": "transparent"
                    },
                    "axis": {
                        "domain": {
                            "line": {
                                "stroke": "#777777",
                                "strokeWidth": 1
                            }
                        },
                        "legend": {
                            "text": {
                                "fontSize": 12,
                                "fill": "#333333",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        },
                        "ticks": {
                            "line": {
                                "stroke": "#777777",
                                "strokeWidth": 1
                            },
                            "text": {
                                "fontSize": 0,
                                "fill": "#333333",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        }
                    },
                    "grid": {
                        "line": {
                            "stroke": "#dddddd",
                            "strokeWidth": 1
                        }
                    },
                    "legends": {
                        "title": {
                            "text": {
                                "fontSize": 11,
                                "fill": "#333333",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        },
                        "text": {
                            "fontSize": 11,
                            "fill": "#333333",
                            "outlineWidth": 0,
                            "outlineColor": "transparent"
                        },
                        "ticks": {
                            "line": {},
                            "text": {
                                "fontSize": 111,
                                "fill": "#333333",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        }
                    },
                    "annotations": {
                        "text": {
                            "fontSize": 13,
                            "fill": "#333333",
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "link": {
                            "stroke": "#000000",
                            "strokeWidth": 1,
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "outline": {
                            "stroke": "#000000",
                            "strokeWidth": 2,
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "symbol": {
                            "fill": "#000000",
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        }
                    },
                    "tooltip": {
                        "container": {
                            "background": "#ffffff",
                            "fontSize": 12
                        },
                        "basic": {},
                        "chip": {},
                        "table": {},
                        "tableCell": {},
                        "tableCellValue": {}
                    }
                }
                :
                // big
                {
                    "background": "#ffffff",
                    "text": {
                        "fontSize": 11,
                        "fill": "#333333",
                        "outlineWidth": 0,
                        "outlineColor": "transparent"
                    },
                    "axis": {
                        "domain": {
                            "line": {
                                "stroke": "#777777",
                                "strokeWidth": 1
                            }
                        },
                        "legend": {
                            "text": {
                                "fontSize": 50,
                                "fill": "#333333",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        },
                        "ticks": {
                            "line": {
                                "stroke": "#777777",
                                "strokeWidth": 1
                            },
                            "text": {
                                "fontSize": 22,
                                "fill": "#333333",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        }
                    },
                    "grid": {
                        "line": {
                            "stroke": "#dddddd",
                            "strokeWidth": 1
                        }
                    },
                    "legends": {
                        "title": {
                            "text": {
                                "fontSize": 22,
                                "fill": "#333333",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        },
                        "text": {
                            "fontSize": 22,
                            "fill": "#333333",
                            "outlineWidth": 0,
                            "outlineColor": "transparent"
                        },
                        "ticks": {
                            "line": {},
                            "text": {
                                "fontSize": 10,
                                "fill": "#333333",
                                "outlineWidth": 0,
                                "outlineColor": "transparent"
                            }
                        }
                    },
                    "annotations": {
                        "text": {
                            "fontSize": 13,
                            "fill": "#333333",
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "link": {
                            "stroke": "#000000",
                            "strokeWidth": 1,
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "outline": {
                            "stroke": "#000000",
                            "strokeWidth": 2,
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        },
                        "symbol": {
                            "fill": "#000000",
                            "outlineWidth": 2,
                            "outlineColor": "#ffffff",
                            "outlineOpacity": 1
                        }
                    },
                    "tooltip": {
                        "container": {
                            "background": "#ffffff",
                            "fontSize": 12
                        },
                        "basic": {},
                        "chip": {},
                        "table": {},
                        "tableCell": {},
                        "tableCellValue": {}
                    }
                }}
                margin={props.size === "small" ? { top: 20, right: 20, bottom: 30, left: 30 } : { top: 50, right: 200, bottom: 100, left: 100 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={props.size === "small" ? 
                {
                    tickSize: 5,
                    tickPadding: 0,
                    tickRotation: 0,
                    legend: 'Month',
                    legendOffset: 20,
                    legendPosition: 'middle'
                }: {
                    tickSize: 5,
                    tickPadding: 0,
                    tickRotation: 0,
                    legend: 'Month',
                    legendOffset: 80,
                    legendPosition: 'middle'
                }}
                axisLeft={props.size === "small" ? 
                {
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Count',
                    legendOffset: -20,
                    legendPosition: 'middle'
                } : {
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Count',
                    legendOffset: -60,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={props.size === "small" ? [] : [
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 10,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 20,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}

export default SubjectByMonth