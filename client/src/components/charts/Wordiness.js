import { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';



const Wordiness = (props) => {
    const [wordinessData, setWordinessData] = useState([]);
    const [cleanData, setCleanData] = useState([]);

    // fetch data that will fit this chart
    const getWordiness = async () => {
        const response = await fetch(`${process.env.REACT_APP_ADDRESS}/analytics/wordiness/${props.startMonth}/${props.endMonth}`);
        const data = await response.json();
        setWordinessData(data);
    };

    useEffect(()=>{
        getWordiness()
    }, [props.startMonth, props.endMonth, props.conversationData])

    // convert raw data to fit the chart
    const cleanTheData = () => {
        const subjects = ["mortgages", "wire transfers", "transfers", "credit cards", "accounts", "investments", "other"]
        const genderedData={};
        const counts = {};
        const wordiness = {};
        // loop through each gender
        for (let gender of ["male", "female"]) {
            genderedData[gender] = wordinessData
                .filter(item => item.gender === gender);
            counts[gender] = subjects.reduce((acc, subject) => {
                acc[subject] = {textLength: 0, exchanges: 0};
                return acc;
            }, {});

            for (let i of genderedData[gender]) {
                counts[gender][i.subject].textLength += i.exchanges.toString().length;
                counts[gender][i.subject].exchanges += i.exchanges.length;
            };
            wordiness[gender] = {};
            for (let subject of subjects) {
                wordiness[gender][subject] = counts[gender][subject].exchanges === 0 ? 0 : Math.round(counts[gender][subject].textLength / counts[gender][subject].exchanges)
            };
        };

        const newData = subjects.map(subject => {
            // capitalize first letters of each word of each subject
            const arr = subject.split(" ");
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

            }
            const upperSubject = arr.join(" ");

            return ({
                "Male": wordiness["male"][subject],
                "Female": wordiness["female"][subject],
                "subject": upperSubject
            });
        });
        setCleanData(newData)
    }

    useEffect(() => {
        cleanTheData();
    }, [wordinessData]);

    return (
        <div className='chartDiv'>
            <h1>Wordiness</h1>
            <p className='description'>Shows how many words per exchange, by subject and by gender</p>
            
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
                        "fontSize": 20,
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
                        "fontSize": 20,
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
        keys={['Female', 'Male']}
        indexBy="subject"
        margin={props.size === "small" ? { top: 20, right: 20, bottom: 25, left: 30 } : { top: 50, right: 180, bottom: 120, left: 120 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        colorBy="id"
        groupMode='grouped'
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
            legend: 'Subject',
            legendPosition: 'middle',
            legendOffset: 20
        }
        :
        {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Subject',
            legendPosition: 'middle',
            legendOffset: 90
        }}
        axisLeft={props.size === "small" ? {
            tickSize: 0,
            tickPadding: 0,
            tickRotation: 0,
            legend: "Words Per Message",
            legendPosition: 'middle',
            legendOffset: -20
        }
        :
        {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Words Per Message",
            legendPosition: 'middle',
            legendOffset: -90
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
                itemHeight: 100,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 30,
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
};

export default Wordiness