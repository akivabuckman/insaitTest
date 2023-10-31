import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line'


const SubjectByMonth = (props) => {
    const [subjectByMonthData, setSubjectByMonthData] = useState([]);
    const [cleanData, setCleanData] = useState([])

    // fetch data that will fit this chart
    const getSubjectByMonth = async () => {
        const response = await fetch(`http://localhost:5000/analytics/SubjectByMonth/${props.startMonth}/${props.endMonth}`);
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

    const Loggy = () => {
        return (
            <button onClick={()=>{
                console.log(subjectByMonthData)
            }}>Logggg</button>
        )
    }


    return(
        <div className='chartDiv'>
             <ResponsiveLine
                data={cleanData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Month',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
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