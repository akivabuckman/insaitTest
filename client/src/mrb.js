import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const dataaa = [
    {
      "country": "AD",
      "hot dog": 98,
      "hot dogColor": "hsl(227, 70%, 50%)",
      "burger": 133,
      "burgerColor": "hsl(91, 70%, 50%)",
      "sandwich": 43,
      "sandwichColor": "hsl(261, 70%, 50%)",
      "kebab": 66,
      "kebabColor": "hsl(214, 70%, 50%)",
      "fries": 174,
      "friesColor": "hsl(356, 70%, 50%)",
      "donut": 155,
      "donutColor": "hsl(271, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 103,
      "hot dogColor": "hsl(262, 70%, 50%)",
      "burger": 0,
      "burgerColor": "hsl(61, 70%, 50%)",
      "sandwich": 144,
      "sandwichColor": "hsl(271, 70%, 50%)",
      "kebab": 193,
      "kebabColor": "hsl(104, 70%, 50%)",
      "fries": 14,
      "friesColor": "hsl(94, 70%, 50%)",
      "donut": 35,
      "donutColor": "hsl(138, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 21,
      "hot dogColor": "hsl(172, 70%, 50%)",
      "burger": 166,
      "burgerColor": "hsl(251, 70%, 50%)",
      "sandwich": 126,
      "sandwichColor": "hsl(12, 70%, 50%)",
      "kebab": 171,
      "kebabColor": "hsl(40, 70%, 50%)",
      "fries": 66,
      "friesColor": "hsl(133, 70%, 50%)",
      "donut": 16,
      "donutColor": "hsl(75, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 31,
      "hot dogColor": "hsl(205, 70%, 50%)",
      "burger": 67,
      "burgerColor": "hsl(294, 70%, 50%)",
      "sandwich": 120,
      "sandwichColor": "hsl(86, 70%, 50%)",
      "kebab": 40,
      "kebabColor": "hsl(229, 70%, 50%)",
      "fries": 173,
      "friesColor": "hsl(269, 70%, 50%)",
      "donut": 198,
      "donutColor": "hsl(41, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 118,
      "hot dogColor": "hsl(166, 70%, 50%)",
      "burger": 154,
      "burgerColor": "hsl(103, 70%, 50%)",
      "sandwich": 196,
      "sandwichColor": "hsl(40, 70%, 50%)",
      "kebab": 90,
      "kebabColor": "hsl(161, 70%, 50%)",
      "fries": 110,
      "friesColor": "hsl(147, 70%, 50%)",
      "donut": 14,
      "donutColor": "hsl(22, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 151,
      "hot dogColor": "hsl(273, 70%, 50%)",
      "burger": 191,
      "burgerColor": "hsl(288, 70%, 50%)",
      "sandwich": 86,
      "sandwichColor": "hsl(224, 70%, 50%)",
      "kebab": 2,
      "kebabColor": "hsl(31, 70%, 50%)",
      "fries": 32,
      "friesColor": "hsl(200, 70%, 50%)",
      "donut": 94,
      "donutColor": "hsl(5, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 102,
      "hot dogColor": "hsl(242, 70%, 50%)",
      "burger": 107,
      "burgerColor": "hsl(242, 70%, 50%)",
      "sandwich": 119,
      "sandwichColor": "hsl(327, 70%, 50%)",
      "kebab": 195,
      "kebabColor": "hsl(70, 70%, 50%)",
      "fries": 173,
      "friesColor": "hsl(67, 70%, 50%)",
      "donut": 46,
      "donutColor": "hsl(355, 70%, 50%)"
    }
  ];

  const MyResponsiveBar = ({ data /* see data tab */ }) => (
    <ResponsiveBar
        data={dataaa}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
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
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
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
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
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
)

export default MyResponsiveBar