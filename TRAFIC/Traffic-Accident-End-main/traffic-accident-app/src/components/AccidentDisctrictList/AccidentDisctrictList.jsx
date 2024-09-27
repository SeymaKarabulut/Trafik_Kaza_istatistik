import React, { useEffect, useState } from 'react';

const AccidentDistrictList = () => {
  const [districtStatistics, setDistrictStatistics] = useState([]);

  useEffect(() => {
    const fetchDistrictStatistics = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/accidents/grouped-by-district');
        const data = await response.json(); // Convert response to JSON
        setDistrictStatistics(data);
      } catch (error) {
        console.error('Error fetching district statistics:', error);
      }
    };

    fetchDistrictStatistics();
  }, []);

  return (
    <div>
          
      <table style={{ color: 'white', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>İlçe</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Toplam Kaza</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Ölü Sayısı</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Yaralı Sayısı</th>
          </tr>
        </thead>
        <tbody>
          {districtStatistics.map((district) => (
            <tr key={district.districtName} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px', textAlign: 'left' }}>{district.districtName}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>{district.totalAccidents}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>{district.totalDeathCount}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>{district.totalInjuryCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccidentDistrictList;
