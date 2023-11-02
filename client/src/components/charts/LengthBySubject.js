import { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



const LengthBySubject = (props) => {
    const [lengthBySubjectData, setLengthBySubjectData] = useState([]);
    const [cleanData, setCleanData] = useState([]);
    const [exchangeData, setExchangeData] = useState([]);
    const [chosenParam, setChosenParam] = useState("character")

    // fetch data that will fit this chart
    const getLengthBySubject = async () => {
        const response = await fetch(`https://insait.onrender.com/analytics/lengthBySubject/${props.startMonth}/${props.endMonth}`);
        const data = await response.json();
        setLengthBySubjectData(data);
    };

    useEffect(()=>{
        getLengthBySubject()
    }, [props.startMonth, props.endMonth, props.conversationData])

    // convert raw data to fit the chart
    const cleanTheData = () => {
        // character count, below is exchange count
        const subjects = ["mortgages", "wire transfers", "transfers", "credit cards", "accounts", "investments", "other"]
        // set up empty object to calculate each subject's count and character sum
        const charCounts = subjects.reduce((acc, subject) => {
            acc[subject] = {count: 0, sum: 0};
            return acc;
        }, {});
        // populate the charCounts objects from data
        for (let i of lengthBySubjectData) {
            charCounts[i.subject].count ++;
            charCounts[i.subject].sum += i.exchanges.toString().length
        };
        // calculate average length and format for chart
        const newData = subjects.map(subject => {
            const average = charCounts[subject].count === 0 ? 0 : Math.round(charCounts[subject].sum / charCounts[subject].count);

            // capitalize first letters of each word of each subject
            const arr = subject.split(" ");
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

            }
            const upperSubject = arr.join(" ");

            return ({
                "subject": upperSubject,
                "Character Count": average
            });
        });
        setCleanData(newData);

        // exchange count
        // empty objects
        const exchangeCounts = subjects.reduce((acc, subject) => {
            acc[subject] = {count: 0, exchSum: 0};
            return acc;
        }, {});
        //populate objects
        for (let i of lengthBySubjectData) {
            exchangeCounts[i.subject].count ++;
            exchangeCounts[i.subject].exchSum += i.exchanges.length
        };
        // average exchange counts
        const newExchData = subjects.map(subject => {
            const average = Math.round(exchangeCounts[subject].exchSum / exchangeCounts[subject].count);

            // capitalize first letters of each word of each subject
            const arr = subject.split(" ");
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

            }
            const upperSubject = arr.join(" ");

            return ({
                "subject": upperSubject,
                "Exchange Count": average
            });
        });
        setExchangeData(newExchData)
    };

    useEffect(() => {
        cleanTheData();
    }, [lengthBySubjectData]);

    // toggle between displaying character count or exchange count
    const handleParamChange = (event) => {
        setChosenParam(event.target.value)
    }

   
    return(
        <div className='chartDiv'>
              <h1>Length By Subject</h1>
            <p className='description'>Shows average conversation length of each conversation subject</p>
            
            {props.size === "small" ? null :
                <ToggleButtonGroup
                    color="primary"
                    value={chosenParam}
                    exclusive
                    onChange={handleParamChange}
                    aria-label="Platform"
                    >
                    
                    <ToggleButton value="character">Count Characters</ToggleButton>
                    <ToggleButton value="exchange">Count Exchanges</ToggleButton>
                </ToggleButtonGroup>
            }
             

            <ResponsiveBar
        data={chosenParam === "character" ? cleanData : exchangeData}
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
                    "fontSize": 44
                }
            }
        }}
        keys={chosenParam === "character" ? ['Character Count'] : ['Exchange Count']}
        indexBy="subject"
        margin={props.size === "small" ? { top: 20, right: 10, bottom: 30, left: 20 } : { top: 50, right: 130, bottom: 120, left: 120 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        colorBy="indexValue"
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
            legendOffset: 15
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
            legend: `${chosenParam.charAt(0).toUpperCase() + chosenParam.slice(1)} Count`,
            legendPosition: 'middle',
            legendOffset: -15
        }
        :
        {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: `${chosenParam.charAt(0).toUpperCase() + chosenParam.slice(1)} Count`,
            legendPosition: 'middle',
            legendOffset: -100
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
        legends={[]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
       
            
        </div>
    )
}

export default LengthBySubject