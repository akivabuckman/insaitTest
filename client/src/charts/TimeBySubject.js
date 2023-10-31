import { ResponsiveBar } from '@nivo/bar';
import { useEffect, useState } from 'react';

const TimeBySubject = (props) => {
    const [timeBySubjectData, setTimeBySubjectData] = useState([]);
    const [cleanData, setCleanData] = useState([])


    // fetch data that will fit this chart
    const getTimeBySubject = async () => {
        const response = await fetch(`http://localhost:5000/analytics/timeBySubject/${props.startMonth}/${props.endMonth}`);
        const data = await response.json();
        setTimeBySubjectData(data);
    }

    useEffect(() => {
        getTimeBySubject()
    }, [props.startMonth, props.endMonth, props.conversationData]);

    const Loggy = () => {
        console.log(cleanData)
    }


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
        console.log(newData)
        setCleanData(newData)
    }

    useEffect(() => {
        cleanTheData();
    }, [timeBySubjectData])




    return (
        <div className='chartDiv'>
                        <ResponsiveBar
                    data={cleanData}
                    keys={[
                        "mortgages",
                        "wire transfers",
                        "transfers",
                        "credit cards", 
                        "accounts", 
                        "investments", 
                        "other"]}
                    indexBy="hour"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Time of Day',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Conversations',
                        legendPosition: 'middle',
                        legendOffset: -40
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
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
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
                <button onClick={Loggy}>loggy</button>   
        </div>
    
    )
}

export default TimeBySubject