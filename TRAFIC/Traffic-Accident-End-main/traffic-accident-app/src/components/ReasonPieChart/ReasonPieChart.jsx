import React, { Component } from 'react';
import axios from 'axios'; // axios'u ekledim
import styles from '../../style';
import { ResponsivePie } from '@nivo/pie';

class ReasonPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
    };
  }

  // Component monte edildiğinde backend'den veriyi alma
  componentDidMount() {
    this.fetchDataFromBackend();
  }

  // Backend'den veriyi alacak fonksiyon
  fetchDataFromBackend = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/accidentReasons/counts-by-reason"
      );
      const rawData = response.data;

      // Verileri uygun formata dönüştür
      const formattedData = rawData.map((item, index) => ({
        ...item,
        label: item.reasonDetail,
        value: item.count,
        id: item.reasonDetail, // Her bir veri öğesi için benzersiz bir id oluştur
      }));

      // Dönüştürülmüş veriyi state'e set et
      this.setState({ chartData: formattedData });
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  render() {
    const { chartData } = this.state;

    return (
      <div style={{ height: '400px' }}>
        {/* Veri geldiğinde Pie Chart'i oluştur */}
        <h1 style={{ color: 'white', textAlign:'center',borderBottom: '2px solid white',marginTop: '20px' }}>Kaza Nedenleri Pasta Grafiği</h1>
        {chartData.length > 0 && ( 
      
          <ResponsivePie
            data={chartData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            colors={{ scheme: 'red_grey' }}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="white"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]],
            }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
       
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: 'white',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#999',
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </div>
    );
  }
}

export default ReasonPieChart;
