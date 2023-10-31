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
                wordiness[gender][subject] = Math.round(counts[gender][subject].textLength / counts[gender][subject].exchanges)
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
        <ResponsiveBar
        data={cleanData}
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
            legend: "Characters Per Message",
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