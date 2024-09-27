import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const monthNames = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

class AccidentBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
    };
  }

  componentDidMount() {
    this.fetchAccidentData();
  }

  fetchAccidentData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/accidents/accidents-by-month');
      const rawData = await response.json();

      const modifiedData = rawData.map(entry => ({
        month: monthNames[entry._id - 1],
        count: entry.count,
        deathCount: entry.deathCount,
        injuryCount: entry.injuryCount,
      }));

      this.setState({ chartData: modifiedData });
    } catch (error) {
      console.error('Error fetching accident data:', error);
    }
  };

  render() {
    const { chartData } = this.state;

    return (
      <div>
        <h1 style={{ color: 'white', textAlign:'center',borderBottom: '2px solid white',marginTop: '20px' }}>Aylara Göre Kaza ,Ölü Ve Yaralı Sayıları</h1>
        <div style={{ height: '400px' }}>
          <ResponsiveBar
            data={chartData}
            keys={['count', 'deathCount', 'injuryCount']}
            indexBy="month"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: 'red_grey' }}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            groupMode="grouped"
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
              modifiers: [['darker', 1.6]]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legendPosition: 'middle',
              legendOffset: 45,
              tickValues: chartData.map(entry => entry.month),
              legendTextColor: 'white', // Eksen değerlerinin rengi
              renderTick: tick => (
                <g transform={`translate(${tick.x},${tick.y + 22})`}> {/* Yatay kaydırma eklendi */}
                  <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    style={{ fill: 'white' }} // X eksenindeki değerlerin rengi
                  >
                    {tick.value}
                  </text>
                </g>
              ),
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: 'middle',
              legendOffset: -40,
              renderTick: tick => (
                <g transform={`translate(${tick.x},${tick.y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    style={{ fill: 'white' }} // Y eksenindeki değerlerin rengi
                  >
                    {tick.value}
                  </text>
                </g>
              ),
            }}
            tooltip={({ id, value, color }) => (
              <strong style={{ color: 'white' }}>
                {id === 'count' && 'Kaza Sayısı'}
                {id === 'deathCount' && 'Ölü Sayısı'}
                {id === 'injuryCount' && 'Yaralı Sayısı'}
                : {value}
              </strong>
            )}
            // legends={[
            //   {
            //     anchor: 'bottom-right',
            //     direction: 'column',
            //     justify: false,
            //     translateX: 120,
            //     translateY: 0,
            //     itemsSpacing: 2,
            //     itemWidth: 100,
            //     itemHeight: 20,
            //     itemDirection: 'left-to-right',
            //     itemOpacity: 0.85,
            //     symbolSize: 20,
            //     itemTextColor: 'white', // Legend metin rengi
            //     effects: [
            //       {
            //         on: 'hover',
            //         style: {
            //           itemTextColor: '#ff0000',
            //         },
            //       },
            //     ],
            //     items: [
            //       {
            //         id: 'count',
            //         value: 'Custom Kaza Sayısı',
            //       },
            //       {
            //         id: 'deathCount',
            //         value: 'Custom Ölü Sayısı',
            //       },
            //       {
            //         id: 'injuryCount',
            //         value: 'Custom Yaralı Sayısı',
            //       },
            //     ],
            //   },
            // ]}
          />
        </div>
      </div>
    );
  }
}

export default AccidentBarChart;
