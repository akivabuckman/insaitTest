import { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';


const Wordiness = (props) => {
    const [wordinessData, setWordinessData] = useState([]);
    const [cleanData, setCleanData] = useState([]);

    // fetch data that will fit this chart
    const getWordiness = async () => {
        const response = await fetch(`http://localhost:5000/analytics/wordiness/${props.startMonth}/${props.endMonth}`);
        const data = await response.json();
        setWordinessData(data);
    };

    useEffect(()=>{
        getWordiness()
    }, [props.startMonth, props.endMonth, props.conversationData])

    // convert raw data to fit the chart
    const cleanTheData = () => {
        const subjects = ["mortgages", "wire transfers", "transfers", "credit cards", "accounts", "investments", "other"]
        const wordinesses = {}
        // loop through operation for both male and female
        for (let gender of ["male", "female"]) {
            // filter data to gender
            const genderedData = wordinessData
                .filter(item => item.gender === gender)
            // empty object for char and exch counts
            const counts = subjects.reduce((acc, subject) => {
                acc[subject] = {characters: 0, exchanges: 0};
                return acc;
            }, {});
            for (let i of genderedData) {
                counts[i.subject].characters += i.exchanges.toString().length;
                counts[i.subject].exchanges += i.exchanges.length;
            };
            // calculate wordiness and format for chart
            wordinesses[gender] = subjects.map(subject => {
                const wordiness = Math.round(counts[subject].characters / counts[subject].exchanges);
                // capitalize first letters of each word of each subject
                const arr = subject.split(" ");
                for (let j = 0; j < arr.length; j++) {
                    arr[j] = arr[j].charAt(0).toUpperCase() + arr[j].slice(1);
                };
                const upperSubject = arr.join(" ");
                return ({})
            })}
        for (let subject of subjects) {
            for (let gender of ["male", "female"]) {
                const genderedData = wordinessData
                    .filter(item => item.gender === gender);
                const counts = subjects.reduce((acc, subject) => {
                    acc[subject] = {characters: 0, exchanges: 0};
                    return acc;
                }, {});
                for (let i of genderedData) {
                    counts[i.subject].characters += i.exchanges.toString().length;
                    counts[i.subject].exchanges += i.exchanges.length;
                }
                console.log(counts)
            }
        }
    }



        
    

    useEffect(() => {
        cleanTheData();
    }, [wordinessData]);

    const dataaa = [
        {
            "Male": 6,
            "Female": 0,
            "subject": "Transfers"
        },
        {
            "Male": 0,
            "Female": 1,
            "subject": "Accounts"
        },
        {
            "Male": 2,
            "Female": 1,
            "subject": "Wires"
        }
    ]

    return (
        <div className='chartDiv'>
        <ResponsiveBar
        data={dataaa}
        keys={['Female', 'Male']}
        indexBy="subject"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Subject',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Wordiness",
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
    </div>
    )
};

export default Wordiness