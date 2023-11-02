import { ResponsiveBar } from '@nivo/bar';
import { useEffect, useState } from 'react';


const TimeBySubject = (props) => {
    const [timeBySubjectData, setTimeBySubjectData] = useState([]);
    const [cleanData, setCleanData] = useState([])


    // fetch data that will fit this chart
    const getTimeBySubject = async () => {
        const response = await fetch(`/analytics/timeBySubject/${props.startMonth}/${props.endMonth}`);
        const data = await response.json();
        setTimeBySubjectData(data);
    }

    useEffect(() => {
        getTimeBySubject()
    }, [props.startMonth, props.endMonth, props.conversationData]);

    // convert raw data to fit the chart
    const cleanTheData = () => {
        const subjects = ["mortgages", "wire transfers", "transfers", "credit cards", "accounts", "investments", "other"]
        const newData = [];
        for (let hour = 0; hour < 24; hour++) {
            const hourData = {};
            const hourString = hour.toLocaleString("en-US", {minimumIntegerDigits: 2, useGrouping: false});
            // if there are any entires at hours 00-23
            if (Object.keys(timeBySubjectData).includes(hourString)) {
                // loop through each subject
                for (let subject of subjects) {
                    // if there are any of each subject in each hour
                    if (Object.keys(timeBySubjectData[hourString]).includes(subject)) {
                        hourData[subject] = parseInt(timeBySubjectData[hourString][subject])
                    } else {
                        // if an hour does not have any of a given subject
                        hourData[subject] = 0
                    };
                };
                hourData["hour"] = hourString;
                newData.push(hourData)
            } else {
            // if there are no entries at a given hour
                newData.push({
                    "hour": hourString, "mortgages": 0, "wire transfers": 0, "transfers": 0, "credit cards": 0, "accounts": 0, "investments": 0, "other": 0
                })
            };
        };
        setCleanData(newData)
    }

    useEffect(() => {
        cleanTheData();
    }, [timeBySubjectData])




    return (
        <div className='chartDiv'>
              <h1>Time By Subject</h1>
            <p className='description'>Shows conversations' most frequent time of day, per each subject</p>
            
                        <ResponsiveBar
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
                        },
                        "labels": {
                            "text": {
                                "fontSize": 0
                            }
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
                                    "fontSize": 11,
                                    "fill": "#333333",
                                    "outlineWidth": 0,
                                    "outlineColor": "transparent"
                                }
                            },
                            "text": {
                                "fontSize": 30,
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
                        },
                        "labels": {
                            "text": {
                                "fontSize": 30
                            }
                        }
                    }}
                    keys={[
                        "mortgages",
                        "wire transfers",
                        "transfers",
                        "credit cards", 
                        "accounts", 
                        "investments", 
                        "other"]}
                    indexBy="hour"
                    margin={props.size === "small" ? { top: 20, right: 20, bottom: 50, left: 30 } : { top: 50, right: 240, bottom: 110, left: 100 }}
                    padding={0.3}
                    groupMode="stacked"
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: '00'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: '03'
                            },
                            id: 'lines'
                        }
                    ]}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1.6
                            ]
                        ]
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={props.size === "small" ? {
                        tickSize: 0,
                        tickPadding: 0,
                        tickRotation: 0,
                        legend: 'Time of Day',
                        legendPosition: 'middle',
                        legendOffset: 20
                    }
                    :
                    {
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Time of Day',
                        legendPosition: 'middle',
                        legendOffset: 80
                    }}
                    axisLeft={props.size === "small" ? {
                        tickSize: 0,
                        tickPadding: 0,
                        tickRotation: 0,
                        legend: 'Conversations',
                        legendPosition: 'middle',
                        legendOffset: -20
                    }
                    :
                    {
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Conversations',
                        legendPosition: 'middle',
                        legendOffset: -80
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1.6
                            ]
                        ]
                    }}
                    legends={props.size === "small" ? [] : [
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 20,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 30,
                            symbolShape: "circle",
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
                /> 
        </div>
    
    )
}

export default TimeBySubject