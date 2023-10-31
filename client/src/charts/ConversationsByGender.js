import { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie'


const ConversationsByGender = (props) => {
    const [conversationsByGenderData, setConversationsByGenderData] = useState([]);
    const [cleanData, setCleanData] = useState([])

    // fetch data that will fit this chart
    const getConversationsByGender = async () => {
        const response = await fetch(`http://localhost:5000/analytics/conversationsByGender/${props.startMonth}/${props.endMonth}`);
        const data = await response.json();
        setConversationsByGenderData(data);
        console.log(data)
    };

    useEffect(()=>{
        getConversationsByGender()
    }, [props.startMonth, props.endMonth, props.conversationData])

    // convert raw data to fit the chart
    const cleanTheData = () => {
        // get values for each gender
        let femaleValue;
        let maleValue;
        for (let i of conversationsByGenderData) {
            if (i["gender"] === "female") {
                femaleValue = i["conversation_count"]
            } else if (i["gender"] === "male") {
                maleValue = i["conversation_count"]
            }
        };
        const newData = ([
            {
                "id": "Female",
                "label": "Female",
                "value": femaleValue
            },
            {
                "id": "Male",
                "label": "Male",
                "value": maleValue
            }
        ]);
        setCleanData(newData)

    }

    useEffect(() => {
        cleanTheData();
    }, [conversationsByGenderData])

    return(
        <div className='chartDiv'>
            <ResponsivePie
        data={cleanData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[]}
    />
        </div>
    )
};

export default ConversationsByGender