import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';

const monthNames = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const AccidentLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAccidentData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/accidents/accidents-by-month');
        const rawData = await response.json();
        
        const modifiedData = rawData.map(entry => ({
          x: monthNames[entry._id - 1],
          count: entry.count,
          deathCount: entry.deathCount,
          injuryCount: entry.injuryCount,
        }));
        
        setData([
          { id: 'Kaza Sayısı', data: modifiedData.map(d => ({ x: d.x, y: d.count })) },
          { id: 'Ölü Sayısı', data: modifiedData.map(d => ({ x: d.x, y: d.deathCount })) },
          { id: 'Yaralı Sayısı', data: modifiedData.map(d => ({ x: d.x, y: d.injuryCount })) }
        ]);
      } catch (error) {
        console.error('Error fetching accident data:', error);
      }
    };

    fetchAccidentData();
  }, []);

  return (
    <div style={{ height: '400px' }}>
      <h1 style={{ color: 'white', textAlign: 'center', borderBottom: '2px solid white' }}>Aylara Göre Kaza, Ölü ve Yaralı Sayıları</h1>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 130, bottom: 80, left: 60 }}  // bottom değeri artırıldı
        colors={{ scheme: 'nivo' }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"

        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legendPosition: 'middle',
          legendOffset: 80,
          renderTick: tick => (
            <g transform={`translate(${tick.x},${tick.y + 16})`}>
              <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                style={{ fill: 'white' }}
              >
                {tick.value}
              </text>
            </g>
          ),
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legendOffset: -80,
          legendPosition: 'middle',
          renderTick: tick => (
            <g transform={`translate(${tick.x-16},${tick.y})`}>
              <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                style={{ fill: 'white' }}
              >
                {tick.value}
              </text>
            </g>
          ),
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
            itemTextColor: '#999',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo line chart demo"
      />
    </div>
  );
};

export default AccidentLineChart;
